import { useState } from "react";
import TaskInput from "./components/TaskInput";
function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    if (!text.trim()) return; // Prevent adding empty tasks
    //setTasks([...tasks, {id: Date.now(), text}]);
    setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text }]);
    console.log("Task added: ", text);
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log("Task deleted with id: ", id);
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <TaskInput addTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <li
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
            key={task.id}
          >
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
