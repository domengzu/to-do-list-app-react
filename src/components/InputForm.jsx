import { Button, Input } from "@chakra-ui/react";

function InputForm() {

   function loadTasks(){
      const savedTasks = localStorage.getItem("task");
      // return savedTasks ? JSON.parse(savedTasks) : [];
      
      if(!savedTasks) return [];
      try {
         const parsed = JSON.parse(savedTasks);
         return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
         console.error("Error parsing tasks from localStorage:", error);
         localStorage.removeItem("task");
         return [];
      }
   }
   
   function saveTasks(tasksArray){
      localStorage.setItem("task", JSON.stringify(tasksArray));
      displayTasks();
   }

   function displayTasks() {
      const tasksElement = document.querySelector("#tasks");
      const tasks = loadTasks();
      if (tasksElement) {
         tasksElement.innerHTML = tasks.map(task => `${task}` + "<br>").join("");
      }
   }

   function handleAddButton() {
      const addTaskInput = document.querySelector("input[type='text']");
      const taskText = addTaskInput.value.trim();
      
      if (taskText) {
            const tasks = loadTasks();
            tasks.push(taskText);
            saveTasks(tasks);
            displayTasks();

            addTaskInput.value = "";
         }else{
            alert("Please enter a task before adding.");
         }
   }
   setTimeout(() => {
      displayTasks();
   }, 0)

   return (
      <form className="mb-4 flex items-center justify-center">
         <Input
         width="25%"
         marginRight="12px"
         type="text"
         placeholder="Enter your task"
         />

         <Button
         size={"md"}
         colorPalette="blue"
         variant="surface"
         onClick={handleAddButton}
         >
         Add
         </Button>
         <p id="tasks"></p>
      </form>
   );
}

export default InputForm;
