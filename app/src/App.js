import './App.css';
import { useState, useEffect, useRef } from "react";
import Server from './API/server';
import ProductForm from './components/ProductForm';
import { v4 as uuidv4 } from 'uuid';

const appStyle = {
  backgroundColor: "#F8F8F8",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}

const listStyle = {
  marginLeft: '10px',
  listStyle: "none",
  display:'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems:'center',
  rowGap: "1px"
}

Server();

function App() {
  const [forms, setForms] = useState([{ id: uuidv4(), name: `form${uuidv4()}` }]);
  const formRefs = useRef([]);


  const sendData = (data)  => {
    fetch("http://localhost:3000/api/products",{
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  const addRefs = (el) => {
    formRefs.current.push(el);
  }
  const handleAddForm = () => {
    setForms([...forms, { id: uuidv4(), name: `form${uuidv4()}` }]);
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
      <ul style={listStyle}>
        {forms.map((form, index) =>
          <li key={form.id}>
            <ProductForm
              name={form.name}
              id={form.id}
              removeSelf={removeForm}
              index={index}
              ref={addRefs}/>
          </li>
        )
        }
      </ul>
      <button onClick={handleSubmit}>Submit All</button>
    </div>
  );
}

export default App;
