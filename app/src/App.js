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
    for (let i=1; i<=forms.length; i++) {
        console.log(formData[formData.length-i]);
    }
  };

  const removeForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
    formRefs.current = formRefs.current.filter(ref => ref.id !== id);
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
