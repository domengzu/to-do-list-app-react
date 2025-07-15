import { Button, Input, Dialog } from "@chakra-ui/react";
import { Toaster, toaster } from "./ui/toaster";
import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import img from "../assets/bg.jpg";

function InputForm() {
   const [tasks, setTasks] = useState([]);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [taskToDelete, setTaskToDelete] = useState(null);

   // const key = event.key;

   // if (key === "Enter") {
   //    e.preventDefault();
   //    saveTasks();
   // };

   // function handleKeyDown(event) {
   //    if (event.key === "Enter") {
   //       event.preventDefault();
   //       handleAddButton();
   //    }
   // };

   // function emptyTask() { 
   //    if(tasks.length === 0) {
   //       return (
   //          <div className="text-center mt-4">
   //             <p>No tasks available. Please add a task.</p>
   //          </div>
   //       );
   //    }
   // };

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

   function handleDeleteClick(taskId){
      setTaskToDelete(taskId);
      setIsDialogOpen(true);
   }

   function confirmDelete() {
      if (taskToDelete) {
         const tasks = loadTasks();
         const taskIndex = tasks.findIndex(task => task.id === taskToDelete);

         if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            saveTasks(tasks);
            
            toaster.create({
               description: "Task deleted successfully!",
               type: "success",
               duration: 1000,
               position: "top-center",
            });
         }
      };
      setIsDialogOpen(false);
      setTaskToDelete(null);
   };

   function cancelDelete() {
      setIsDialogOpen(false);
      setTaskToDelete(null);
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
            duration: 1000,
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
               duration: 1000,
               position: "top-center",
            })
         }else{
            toaster.create({
               description: "Please enter a task.",
               type: "error",
               duration: 1000,
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
               
               <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                     <Dialog.Content>
                        <Dialog.Header>
                           <Dialog.Title>Confirm Delete</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                           <p>Are you sure you want to delete this task? This action cannot be undone.</p>
                        </Dialog.Body>
                        <Dialog.Footer>
                           <Button variant="outline" onClick={cancelDelete}>
                              Cancel
                           </Button>
                           <Button colorPalette="red" onClick={confirmDelete}>
                              Delete
                           </Button>
                        </Dialog.Footer>
                     </Dialog.Content>
                  </Dialog.Positioner>
               </Dialog.Root>

            <div style={{ fontFamily: "Poppins" }}>
               <form className="mb-4 flex items-center justify-center">
                  <Input width="20%" marginRight="12px" marginTop="5em" type="text" placeholder="Enter your task" />
                  <Button size={"md"} marginTop="5em" colorPalette="blue" variant="surface" onClick={handleAddButton}>
                     <Plus />
                     Add
                  </Button>
               </form>
               <div className="text-start" style={{ margin: "0 auto",maxHeight: "300px", padding: "1em", marginTop: "1em", width: "25%", overflowY: "auto" }}>
                  {tasks.length === 0 ? (
                     <div className="text-center mt-4">
                        <p>No tasks available. Please add a task.</p>
                     </div>
                  ) : (
                     tasks.map((taskObj) => (
                        <div key={taskObj.id} style={{ marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                           <input
                              type="checkbox"
                              id={`task-${taskObj.id}`}
                              checked={taskObj.completed}
                              onChange={() => toggleTask(taskObj.id)}
                              style={{ marginRight: "8px",
                                       borderRadius: "50%",
                                       width: "24px",
                                       height: "24px",
                                       appearance: "none",
                                       WebkitAppearance: "none",
                                       border: "2px solid #ccc",
                                       backgroundColor: taskObj.completed ? "#3182ce" : "transparent",
                                       position: "relative",
                                       cursor: "pointer",
                                       outline: "none",
                                       cursor: "pointer",
                                       transition: ["background-color 0.3s, border-color 0.3s"]
                                    }}
                           />
                           <label
                              htmlFor={`task-${taskObj.id}`}
                              style={{ 
                                 textDecoration: taskObj.completed ? "line-through" : "none",
                                 flexGrow: 1,
                                 marginRight: "16px",
                                 cursor: "pointer",
                                 color: taskObj.completed ? "gray" : "inherit",
                              }}
                           >
                              {taskObj.task}
                           </label>
                           <Button
                              size="xs"
                              colorPalette="red"
                              variant="outline"
                              onClick={() => handleDeleteClick(taskObj.id)}
                           >
                              <Trash2 />
                           </Button>
                        </div>
                     ))
                  )}
               </div>
            </div>
            <div>
               <img src={img} alt="Background" style={{ 
                  width: "100%", 
                  height: "100%", 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  zIndex: -1, 
                  opacity: 0.1 }} 
               />
            </div>
         </div>
      </>
      
   );
}

export default InputForm;
