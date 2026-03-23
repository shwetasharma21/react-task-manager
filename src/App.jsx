import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
function App() {
  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-3">To-Do App</h2>
            <TaskInput addTask={addTask} />
            <ul className="list-group">
              {tasks.map((task) => (
                <li
                  className="list-group-item d-flex flex-wrap align-items-center justify-content-between gap-2"
                  key={task.id}
                >
                  {editId === task.id ? (
                    <div className="d-flex gap-2 w-100">
                      <input
                        autoFocus
                        className="form-control flex-grow-1"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleSave(task.id)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="d-flex align-items-center gap-2 flex-grow-1">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                        />
                        <span
                          style={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                            wordBreak: "break-word",
                          }}
                        >
                          {task.text}
                        </span>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => startEditingTask(task)}
                        >
                          Edit Task
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete Task
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
