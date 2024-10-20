


import { useState } from "react";


export default function Home() {
  const [tasks , setTasks] = useState([]);
  const [taskInput , setTaskInput] = useState({title : '' , description : '' , priority: 'low'});
  const [editId , setEditId] =useState(null);
  const [searchTerm , setSearchTerm ] =useState('');

  const handleAddOrEditTask =()=>{
    if(!taskInput.title || !taskInput.description){
      alert("please fill in all fields");
      return;
    }
    if(editId !==null){
      const updatedTasks = tasks.map((task) =>
        task.id === editId ? { ...taskInput, id: task.id, completed: task.completed } : task
      );
      setTasks(updatedTasks);
      setEditId(null);
    }else{
      setTasks([...tasks , {...taskInput ,id: Date.now(), completed : false}])
    }
    setTaskInput({title : '' , description : '' , priority: 'low'})

    

    

   
  }
  const handleEditTask =(id)=>{
    const taskToEdit = tasks.find(task => task.id === id);
    setTaskInput({ title: taskToEdit.title, description: taskToEdit.description, priority: taskToEdit.priority });
    setEditId(id);
  }
  const handleDeleteTask =(id) => {
    setTasks(tasks.filter(task =>task.id !==id));
  }
  const toggleTaskCompletion =(id)=>{
    setTasks(tasks.map((task)=>
    task.id ===id?{...task , completed : !task.completed}:task))
  }
  const filteredTasks = tasks
  .filter(task =>   task.title.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority]; 
  });


  return (
    <>
    <div className="header">
      <h1 className="name">TASK MANAGEMENT APP</h1>
      <input
          type="search"
          placeholder="Search Tasks By Title.."
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          className="search"
         />
               
        <h3 className="t-name">Create Your Tasks</h3>
        <div className="t-title">
          <h4>Task Title :</h4>
        <input
         type="text"
         placeholder="Task Title"
         className="title"
         value={taskInput.title}
         onChange={(e)=>setTaskInput({
          ...taskInput , title : e.target.value
         })}
         />
         
        <h4> Task Priority :</h4>

       <select
        className="priority"
        value={taskInput.priority}
        onChange={(e)=>setTaskInput({
        ...taskInput , priority : e.target.value
        })}
      >
       <option value="low">low</option>
       <option value="medium">medium</option>
       <option value="high">high</option>
      </select>
     </div>
 
       <h4 className="t-description">Task</h4>
        <input
         type="text"
         placeholder="Task Description..."
         className="description"
         value={taskInput.description}
         onChange={(e)=>setTaskInput({
          ...taskInput , description : e.target.value
         })}
         />

       <button
       className="edit-button"
       onClick={handleAddOrEditTask}>
        {editId !==null ? "Edit Task": "Add Task"}
       </button>
      </div>
        
     
    <ol type="number" className="t-list">
        {filteredTasks.map((task)=>(
          
            <li key={task.id}
          className={`${task.completed ? 'completed' :''} ${task.priority}-priority`}>
          <h3 className="pris">Title: {task.title}</h3>
          <p className="pris">Description: {task.description}</p>
        <div className="pris"> 
            <p><span style={{color:"blue"}}>Priority:</span>{task.priority}</p>
            <p><span style={{color:"green"}}>Status:</span>{task.completed? "Completed" : "pending"}</p>
        </div>
          <div className="buttons">
            <button  className="toggle-button" onClick={()=>{toggleTaskCompletion(task.id)}}>Toggle status</button>
            <button  className="edit-button" onClick={()=>{handleEditTask(task.id)}}>Edit</button>
          </div>
          <button  className="delete-button" onClick={()=>{handleDeleteTask(task.id)}}>Delete</button>
          </li>
          
          
          
        ))}
       </ol>
     
    </>
  );
}
