import './App.css';
import { useState, useEffect, useId } from "react";
import Server from './API/server';
import ProductForm from './components/ProductForm';
import { v4 as uuidv4 } from 'uuid';


//Server();
function App() {
  const [forms, setForms] = useState([]);

  const handleAddForm = () => {
    setForms([...forms, { id: uuidv4(), name: `form${uuidv4()}` }])
  }
  
  const removeForm = (id) => {
    setForms(forms.filter((form) => form.id != id))
  }
  return (
    <div>
      <button onClick={handleAddForm}> Add</button>
      <ul style={{listStyle: "none"}}>
        {forms.map((form) =>
          <li key={form.id}>
            <ProductForm name={form.name} id={form.id} removeSelf={removeForm}/>
          </li>
        )
        }
      </ul>
    </div>
  );
}

export default App;
