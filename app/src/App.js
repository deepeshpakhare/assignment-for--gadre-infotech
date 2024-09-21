import './App.css';
import { useState, useEffect, useRef } from "react";
import Server from './API/server';
import ProductForm from './components/ProductForm';
import { v4 as uuidv4 } from 'uuid';
import { sendData } from './utils/fetchFunctions';


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


  const getProducts = async()=> {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "GET",
  });
  const products = await response.json();
  console.log(products);
  }

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

  const emptyForms = () => {
    setForms([{ id: uuidv4(), name: `form${uuidv4()}`}]);
  }

  const handleSubmit = () => {
    const formData = formRefs.current.map((ref) => ref?.getValues());
    const newFormData = formData.filter((obj) => obj!==undefined);
    let formsDataWithIds = newFormData.filter((obj) => obj.id);
    //console.log(formsDataWithIds);
    //console.log(result);
    let result = [];
    let lastId = formsDataWithIds[0]?.id;
   for (let i=0; i<formsDataWithIds.length; i++) {
      if(formsDataWithIds[i].id !== lastId) {
        result.push(formsDataWithIds[i-1]);
        lastId = formsDataWithIds[i].id;
      }
   }
   result.push(formsDataWithIds[formsDataWithIds.length-1]);
   console.log(result);
   formRefs.current.map((ref) => ref?.emptyFormData());
   sendData(result);
   setSubmit((prev) => !prev);
   setTimeout(()=> emptyForms(), 1000);
  };

  const removeForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
    formRefs.current = formRefs.current.filter(ref => ref?.id !== id);
    console.log(formRefs.current.length);
    //formRefs.current.map((ref) => ref?.emptyFormData());
  }

  return (
    <div style={appStyle}>
      <button onClick={handleAddForm}> Add</button>
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
              setForms={setForms}/>
          </span>
        )
        }
      </div>
      <button onClick={handleSubmit}>Submit All</button>
    </div>
  );
}

export default App;
