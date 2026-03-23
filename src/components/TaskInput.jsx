import { useState } from "react";

function TaskInput({ addTask }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return; // Prevent adding empty tasks
    console.log(input);
    addTask(input);
    setInput("");
  };
  return (
    <div className="d-flex gap-2 mb-2">
      <input
        autoFocus
        type="text"
        className="form-control"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task..."
      />
      <button
        className="btn btn-primary btn-sm"
        onClick={handleAdd}
        disabled={!input.trim()}
      >
        Add Task
      </button>
    </div>
  );
}
export default TaskInput;
