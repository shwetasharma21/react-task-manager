const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Get all tasks
export const fetchTasks = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.slice(0, 3).map((task) => ({
      id: task.id,
      text: task.title,
      completed: task.completed,
    }));
  } catch (error) {
    console.error("Error fetching tasks: ", error);
  }
};

// Add a new task
export const createTask = async (text) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: text, completed: false }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating task: ", error);
  }
};

// Remove a task
export const removeTask = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error("Error deleting task: ", error);
    return false;
  }
};

// Update a task
export const updateTask = async (id, updatedData) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    return await res.json();
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};
