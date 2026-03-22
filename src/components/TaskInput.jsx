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
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}
export default TaskInput;
