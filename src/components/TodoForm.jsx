import { useState } from "react";
import useItems from "../context/context";

function TodoForm() {
  const { addItem } = useItems();
  const [item, setItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.trim()) return;
    addItem(item);
    setItem("");
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a new todo..."
        className="flex-1 rounded-lg px-4 py-2 bg-white/80 text-black placeholder-gray-600 shadow-inner outline-none focus:ring-2 focus:ring-green-500 duration-200"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md duration-200"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
