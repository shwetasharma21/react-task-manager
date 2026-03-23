import { useState } from "react";
import TaskInput from "./components/TaskInput";
function App() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = (text) => {
    if (!text.trim()) return; // Prevent adding empty tasks
    //setTasks([...tasks, {id: Date.now(), text}]);
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text, completed: false },
    ]);
    console.log("Task added: ", text);
  };

  const deleteTask = (id) => {
    //setTasks(tasks.filter((task) => task.id !== id));
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    console.log("Task deleted with id: ", id);
  };
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  const editTask = (id, newText) => {
    if (!newText.trim()) return; // Prevent setting empty text

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task,
      ),
    );
  };

  const startEditingTask = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const handleSave = (id) => {
    editTask(id, editText);
    setEditId(null);
    setEditText("");
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <TaskInput addTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <li
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
            key={task.id}
          >
            {editId === task.id ? (
              <>
                <input
                  autoFocus
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSave(task.id)}>Save</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                <button onClick={() => startEditingTask(task)}>
                  Edit Task
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete Task</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
