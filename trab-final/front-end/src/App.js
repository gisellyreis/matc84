import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Task from './Task';

axios.defaults.baseURL = 'http://localhost:3333';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    getTasks();    
    }, [])
  
  const getTasks = async () => {
    await axios.get('/todos')
    .then(response => {
      console.log(response.data)
      setTasks(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const newTask = async () => {
    let maxId = parseInt(Math.max(...tasks.map(o => o.id))) + 1;
    let task = {id: maxId, tarefa: '', check: false};
    console.log(task);
     setTasks(arr => [...arr, task]);
     var data = task;
     console.log(data);
     var config = {
         method: 'post',
         url: `/todo`,
         headers: {
             'Content-Type': 'application/json'
         },
         data: data
     };

     await axios(config)
         .then(response => {
             console.log(response.data)
         })
         .catch((err) => {
             console.log(err);
         })
  }

  return (
    <div className="App">
      <div className="tasks" > 
        {tasks.length > 0 ? tasks.map((e, i) => <Task data={e} key={e.id} />) : ''}
      </div>
      <button onClick={newTask}>Incluir Tarefa</button>
    </div>
  );
}

export default App;
