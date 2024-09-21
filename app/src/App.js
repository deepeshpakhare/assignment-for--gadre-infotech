import './App.css';
import { useState, useEffect, useRef } from "react";
import Server from './API/server';
import ProductForm from './components/ProductForm';
import { v4 as uuidv4 } from 'uuid';


//Server();
function App() {
  const [forms, setForms] = useState([]);
  const formRefs = useRef([]);

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
    let lastId = formsDataWithIds[0].id;
   for (let i=0; i<formsDataWithIds.length; i++) {
      if(formsDataWithIds[i].id !== lastId) {
        result.push(formsDataWithIds[i-1]);
        lastId = formsDataWithIds[i].id;
      }
   }
   result.push(formsDataWithIds[formsDataWithIds.length-1]);
   console.log(result);
   formRefs.current.map((ref) => ref?.emptyFormData());
  };

  const removeForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
    formRefs.current = formRefs.current.filter(ref => ref?.id !== id);
  }

  return (
    <div>
      <button onClick={handleAddForm}> Add</button>
      <ul style={{ listStyle: "none" }}>
        {forms.map((form, index) =>
          <li key={form.id}>
            <ProductForm
              name={form.name}
              id={form.id}
              removeSelf={removeForm}
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
