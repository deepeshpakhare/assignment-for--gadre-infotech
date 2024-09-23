import './App.css';
import { useState, useEffect, useRef } from "react";
import Server from './API/server';
import ProductForm from './components/ProductForm';
import { v4 as uuidv4 } from 'uuid';
import { sendData } from './utils/fetchFunctions';
import { getProducts } from './utils/fetchFunctions';
import { Button, message } from 'antd';



const appStyle = {
  width: "100vw",
  backgroundColor: "#F8F8F8",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: 'wrap',
}

const listStyle = {
  width: "100vw",
  marginLeft: '10px',
  listStyle: "none",
  display:'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems:'center',
  rowGap: "5px",
  flexWrap: 'wrap',
}

Server();

function App() {
  const [forms, setForms] = useState([{ id: uuidv4(), name: `form${uuidv4()}`}]);
  const formRefs = useRef([]);
  const [submit, setSubmit] = useState(false);
  //const [formData, setFormData] = useState([]);

  const getImage =  async()=> {
    const response = await fetch(`http://localhost:3000/api/image/`, {
      method: "GET",
  })
  const images = await response.json();
  console.log(images);
  }
  useEffect(() => {
    getProducts();
    getImage();
}, [submit])

  const addRefs = (el) => {
    formRefs.current.push(el);
  }
  const handleAddForm = () => {
    setForms([...forms, { id: uuidv4(), name: `form${uuidv4()}` }]);
  }

  const handleSubmit = () => {
    //formRefs.current.map((ref) => ref?.formClick());
   const formData = formRefs.current.map((ref) => ref?.getValues());
    console.log("new form data is ",formData)
    const newFormData = formData.filter((obj) => obj?.length>0)
    console.log("NEW fORM DATA", newFormData);
    const map = new Map(newFormData.map(item => [item[0].id, item]));
    const filteredMap = new Map(
      Array.from(map.entries()).filter(([key, value]) => {
          return value.some(item => item.productName && item.category && item.quantity);
      })
  );
    const mapArray = Array.from(filteredMap).flat(Infinity);
    console.log("MAP ARRAY",mapArray," FORMREF LENGTH ",forms.length);
    let result= [];
    for (let i=0; i<mapArray.length; i++) {
      if(i%2 !== 0) {
        result.push(mapArray[i]);
      }
    }
    console.log(result, result.length)
    if(result.length == 0 || result.length < forms.length) {
      message.error("Please fill all the fields in every form");
      return;
    }
  console.log("result",result);
   formRefs.current.map((ref) => ref?.emptyFormData());
   sendData(result);
   message.success("Done!");
   setSubmit((prev) => !prev);
   setTimeout(()=>setForms(forms.map((form) =>({ id: uuidv4(), name: `form${uuidv4()}` })),1000));
  };

  const removeForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
    formRefs.current = formRefs.current.filter(ref => ref?.id !== id);
    console.log(formRefs.current.length);
  }

  return (
    <div style={appStyle}>
      <Button type='primary' style={{marginTop:10}} onClick={handleAddForm}> Add Form</Button>
      <div style={listStyle}>
        {forms.map((form, index, arr) =>
          <span key={form.id}>
            <ProductForm
              name={form.name}
              id={form.id}
              removeSelf={removeForm}
              index={index}
              ref={addRefs}
              forms={forms}
              setForms={setForms}
              onSubmit={setSubmit}/>
          </span>
        )
        }
      </div>
      <Button style={{marginTop: 10}} type="primary" onClick={handleSubmit}>Submit All</Button>
    </div>
  );
}

export default App;
