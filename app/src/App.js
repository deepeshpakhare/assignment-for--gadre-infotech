import './App.css';
import { useState, useEffect } from "react";
import Server from './API/server';

Server();
function App() {
  const [reminders, setReminders] = useState([])

  useEffect(() => {
    fetch("/api/reminders")
      .then((response) => response.json())
      .then((json) => setReminders(json.reminders))
  }, [])
  return (
    <div className="App">
     <ul>
        {reminders.map((reminder) =>
        <li key={reminder.id}>
          {reminder.text}
        </li>)}
    </ul>
    </div>
  );
}

export default App;
