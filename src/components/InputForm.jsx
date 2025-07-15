import { Button, Input, Dialog } from "@chakra-ui/react";
import { Toaster, toaster } from "./ui/toaster";
import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import img from "../assets/bg.jpg";

function InputForm() {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  function loadTasks() {
    const savedTasks = localStorage.getItem("task");

    if (!savedTasks) return [];
    try {
      const parsed = JSON.parse(savedTasks);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      localStorage.removeItem("task");
      return [];
    }
  }

  function saveTasks(tasksArray) {
    localStorage.setItem("task", JSON.stringify(tasksArray));
    setTasks(tasksArray);
  }

  function handleDeleteClick(taskId) {
    setTaskToDelete(taskId);
    setIsDialogOpen(true);
  }

  function confirmDelete() {
    if (taskToDelete) {
      const tasks = loadTasks();
      const taskIndex = tasks.findIndex((task) => task.id === taskToDelete);

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
    }
    setIsDialogOpen(false);
    setTaskToDelete(null);
  }

  function cancelDelete() {
    setIsDialogOpen(false);
    setTaskToDelete(null);
  }

  window.toggleTask = function (taskId) {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      saveTasks(tasks);

      toaster.create({
        description: `Task ${
          tasks[taskIndex].completed ? "completed" : "uncompleted"
        } successfully!`,
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
      });
    } else {
      toaster.create({
        description: "Please enter a task.",
        type: "error",
        duration: 1000,
        position: "top-center",
      });
    }
  }

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
            <Dialog.Content className="mx-4 max-w-md">
              <Dialog.Header>
                <Dialog.Title>Confirm Delete</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  Are you sure you want to delete this task? This action cannot
                  be undone.
                </p>
              </Dialog.Body>
              <Dialog.Footer className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 gap-2">
                <Button
                  variant="outline"
                  onClick={cancelDelete}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  colorPalette="red"
                  onClick={confirmDelete}
                  className="w-full sm:w-auto"
                >
                  Delete
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>

        <div style={{ fontFamily: "Poppins" }}>
          <div
            className="flex justify-center items-center mt-4"
            style={{ marginTop: "2.5em" }}
          >
            <form className="mb-4 flex w-xl flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
              <Input
               className="w-full sm:w-80 md:w-96 lg:w-[400px]"
               size={"lg"}
               type="text"
               placeholder="Enter your task"
              />
              <Button
               size={"lg"}
               colorPalette="blue"
               variant="surface"
               onClick={handleAddButton}
               className="w-full sm:w-auto px-8"
              >
                <Plus className="mr-2" />
                Add
              </Button>
            </form>
          </div>
          <div className="flex justify-center px-4 w-full">
            <div
              className="text-start w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5"
              style={{
                margin: "0 auto",
                maxHeight: "300px",
                padding: "1em",
                marginTop: "1em",
                overflowY: "auto",
                maxWidth: "600px",
              }}
            >
              {tasks.length === 0 ? (
                <div className="text-center mt-4">
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    No tasks available. Please add a task.
                  </p>
                </div>
              ) : (
                tasks.map((taskObj) => (
                  <div
                    key={taskObj.id}
                    className="flex items-center justify-between p-2 rounded-md transition-colors duration-200"
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <input
                        type="checkbox"
                        id={`task-${taskObj.id}`}
                        checked={taskObj.completed}
                        onChange={() => toggleTask(taskObj.id)}
                        className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 mr-3 rounded-full border-2 border-gray-300 dark:border-gray-500 cursor-pointer transition-all duration-200"
                        style={{
                          marginRight: "8px",
                          width: "20px",
                          height: "20px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          border: "2px solid #ccc",
                          backgroundColor: taskObj.completed
                            ? "#3182ce"
                            : "transparent",
                          outline: "none",
                          cursor: "pointer",
                          transition: [
                            "background-color 0.3s, border-color 0.3s",
                          ],
                        }}
                      />
                      <label
                        htmlFor={`task-${taskObj.id}`}
                        className={`flex-1 cursor-pointer text-sm sm:text-base ${
                          taskObj.completed
                            ? "line-through text-gray-500"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                        style={{
                          color: taskObj.completed ? "gray" : "inherit",
                          wordBreak: "break-word",
                          marginRight: "12px",
                        }}
                      >
                        {taskObj.task}
                      </label>
                    </div>
                    <Button
                      size="xs"
                      colorPalette="red"
                      variant="outline"
                      onClick={() => handleDeleteClick(taskObj.id)}
                      className="ml-3 flex-shrink-0 min-w-0"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div>
          <img
            src={img}
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
              opacity: 0.1,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default InputForm;
