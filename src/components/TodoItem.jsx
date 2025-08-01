import { useState } from "react";
import useItems from "../context/context";

function TodoItem({ todo }) {
  const { updateItem, deleteItem, toggleCompleted } = useItems();
  // value={{ items, updateItem, addItem, deleteItem, toggleCompleted }}
  const [todoMsg, setTodoMsg] = useState(todo.itemName);
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  const editTodo = () => {
    updateItem(todo.itemId, todoMsg);
    setIsTodoEditable(false);
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-xl px-4 py-3 transition-all duration-300 shadow-md ${
        todo.itemCompleted
          ? "bg-green-100 text-green-900"
          : "bg-white/80 text-gray-900"
      }`}
    >
      <input
        type="checkbox"
        className="accent-green-600 scale-125"
        checked={todo.itemCompleted}
        onChange={() => toggleCompleted(todo.itemId)}
      />
      <input
        type="text"
        className={`flex-1 bg-transparent px-2 py-1 rounded-md outline-none ${
          isTodoEditable
            ? "border border-gray-300 focus:ring-2 focus:ring-blue-500"
            : "border border-transparent"
        } ${todo.itemCompleted ? "line-through opacity-60" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <div className="flex gap-2">
        <button
          className="w-9 h-9 rounded-full text-sm flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 duration-150 disabled:opacity-50"
          onClick={() => {
            if (todo.itemCompleted) return;
            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.itemCompleted}
        >
          {isTodoEditable ? "💾" : "✏️"}
        </button>
        <button
          className="w-9 h-9 rounded-full text-sm flex items-center justify-center bg-white border border-gray-300 hover:bg-red-100 text-red-600 duration-150"
          onClick={() => deleteItem(todo.itemId)}
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
