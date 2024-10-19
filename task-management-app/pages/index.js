

'use client';
import { useState } from "react";


export default function Home() {
  const [tasks , setTasks] = useState([]);
  const [taskInput , setTaskInput] = useState({title : '' , description : '' , priority: 'low'});
  const [editIndex , setEditIndex] =useState(null);
  const [searchTerm , setSearchTerm ] =useState('');

  const handleAddOrEditTask =()=>{
    if(!taskInput.title || !taskInput.description){
      alert("please fill in all fields");
      return;
    }
    if(editIndex !==null){
      const updatedTasks = tasks.map((task , index)=>{
        index === editIndex ? {...taskInput , completed : task.completed} : task
      });
      setTasks(updatedTasks);
      setEditIndex(null);
    }else{
      setTasks([...tasks , {...taskInput , completed : false}])
    }
    setTaskInput({title : '' , description : '' , priority: 'low'})

    

    

   
  }
  const handleEditTask =(index)=>{
    setTaskInput(tasks[index]);
    setEditIndex(index)
  }
  const handleDeleteTask =(index) => {
    setTasks(tasks.filter((_, i) => i !==index));
  }
  const toggleTaskCompletion =(index)=>{
    setTasks(tasks.map((task , i)=>
    i===index ? {...task , completed : !task.completed} : task))
  }
  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a,b )=>{
    const priorityOrder ={high :1 , medium :2 , low :3}
    return priorityOrder[a.priority]-[b.priority]
  })
  return (
    <>
     <div className="wrapper">
     
        <h1>TASK MANAGEMENT APP</h1>
        
        <input
          type="text"
          placeholder="Search Tasks By Title"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
         />
        <h3>Your Tasks</h3>
         <input
         type="text"
         placeholder="Task Title"
         value={taskInput.title}
         onChange={(e)=>setTaskInput({
          ...taskInput , title : e.target.value
         })}
         />

        <input
         type="text"
         placeholder="Task Description"
         value={taskInput.description}
         onChange={(e)=>setTaskInput({
          ...taskInput , description : e.target.value
         })}
         />

        <h4>Select Task Priority</h4>

        <select
         value={taskInput.priority}
         onChange={(e)=>setTaskInput({
          ...taskInput , priority : e.target.value
         })}
        >
         <option value="low">low</option>
         <option value="medium">medium</option>
         <option value="high">high</option>
        </select>

       <button
       onClick={handleAddOrEditTask}>
        {editIndex !==null ? "Edit Task": "Add Task"}
       </button>

       <ul>
        {filteredTasks.map((task , index)=>(
          <li key={index}
          className={`${task.completed ? 'completed' :''} ${task.priority}-priority`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority:{task.priority}</p>
          <p>status:{task.completed? "Completed" : "pending"}</p>
          <div>
            <button onClick={()=>{toggleTaskCompletion(index)}}>Toggle status</button>
            <button onClick={()=>{handleEditTask(index)}}>Edit</button>
            <button onClick={()=>{handleDeleteTask(index)}}>Delete</button>
          </div>
          </li>
          
        ))}
       </ul>
         
        
      
      
      
      
      
    </div>
     
     
    </>
  );
}
