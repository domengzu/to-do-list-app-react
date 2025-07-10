import { Button, Input } from "@chakra-ui/react";
import { Toaster, toaster } from "./ui/toaster";
import { useState, useEffect } from "react";

function InputForm() {
   const [tasks, setTasks] = useState([]);

   function loadTasks(){
      const savedTasks = localStorage.getItem("task");

      if(!savedTasks) return [];
      try {
         const parsed = JSON.parse(savedTasks);
         return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
         console.error("Error parsing tasks from localStorage:", error);
         localStorage.removeItem("task");
         return [];
      }
   };
   
   function saveTasks(tasksArray){
      localStorage.setItem("task", JSON.stringify(tasksArray));
      setTasks(tasksArray);
   };

   window.deleteTasks = function(taskId) {
      const tasks = loadTasks();
      const taskIndex = tasks.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
         tasks.splice(taskIndex, 1);
         saveTasks(tasks);
         
         toaster.create({
            description: "Task deleted successfully!",
            type: "success",
            duration: 3000,
            position: "top-center",
         });
      } else {
         return toaster.create({
            description: "Task not found!",
            type: "error",
            duration: 3000,
            position: "top-center",
         });
      }
   };
   
   window.toggleTask = function(taskId) {
      const tasks = loadTasks();
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
         tasks[taskIndex].completed = !tasks[taskIndex].completed;
         saveTasks(tasks);
         
         toaster.create({
            description: `Task ${tasks[taskIndex].completed ? 'completed' : 'uncompleted'} successfully!`,
            type: "success",
            duration: 3000,
            position: "top-center",
         });
      }
   };

   function generateId() {
      return Math.random().toString(36).substring(2, 9);
   }

   function handleAddButton() {
      const addTaskInput = document.querySelector("input[type='text']");
      const taskText = addTaskInput.value.trim();
      
      if (taskText) {
            const newTask = {
               id: generateId(),
               task: taskText,
               completed: false,
            };
            const tasks = loadTasks();
            tasks.push(newTask);
            saveTasks(tasks);

            addTaskInput.value = "";
            
            toaster.create({
               description: "Task added successfully!",
               type: "success",
               duration: 3000,
               position: "top-center",
            })
         }else{
            toaster.create({
               description: "Task cannot be empty!",
               type: "error",
               duration: 3000,
               position: "top-center",
            })
         }
      };


   useEffect(() => {
      setTasks(loadTasks());
   }, []);
   return (
      <>
         <div>
            <Toaster />
            <form className="mb-4 flex items-center justify-center">
               <Input width="15%" marginRight="12px" type="text" placeholder="Enter your task" />
               <Button size={"md"} fontWeight="bold" colorPalette="blue" variant="surface" onClick={handleAddButton}>Add</Button>
            </form>
            <div className="flex items-center justify-center border-amber-500 border-2 rounded-lg p-4 mb-4">
               {/* <p id="tasks" className="text-start"></p> */}

               <div className="text-start">
                  {tasks.map((taskObj) => (
                     <div key={taskObj.id} style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                        <input
                           type="checkbox"
                           id={`task-${taskObj.id}`}
                           checked={taskObj.completed}
                           onChange={() => toggleTask(taskObj.id)}
                           style={{ marginRight: "8px" }}
                        />
                        <label
                           htmlFor={`task-${taskObj.id}`}
                           style={{ 
                              textDecoration: taskObj.completed ? "line-through" : "none",
                              flexGrow: 1,
                              marginRight: "16px",
                           }}
                        >
                           {taskObj.task}
                        </label>
                        <Button
                           size="xs"
                           colorPalette="red"
                           variant="outline"
                           onClick={() => deleteTasks(taskObj.id)}
                        >
                           Delete
                        </Button>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </>
      
   );
}

export default InputForm;
