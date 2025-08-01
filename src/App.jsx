import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { ItemProvider } from "./context/context";

function App() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("todos"));
    if (storedItems && Array.isArray(storedItems)) {
      setItems(storedItems);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("todos", JSON.stringify(items));
    }
  }, [items, loaded]);

  const addItem = (itemName) => {
    setItems((prev) => [
      {
        itemName,
        itemId: Date.now(),
        itemCompleted: false,
      },
      ...prev,
    ]);
  };

  const updateItem = (id, updates) => {
    setItems((prev) =>
      prev.map((it) => (it.itemId === id ? { ...it, ...updates } : it))
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((it) => it.itemId !== id));
  };

  const toggleCompleted = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it.itemId === id ? { ...it, itemCompleted: !it.itemCompleted } : it
      )
    );
  };

  return (
    <ItemProvider
      value={{ items, updateItem, addItem, deleteItem, toggleCompleted }}
    >
      <div className="h-screen w-full bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#334155] text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-0"></div>

        <div className="relative z-10 w-full max-w-2xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl px-6 py-6">
          <h1 className="text-3xl font-bold text-center mb-10 tracking-wide">
            Your Todo Manager
          </h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          <div className="flex flex-col gap-3">
            {items.map((itm) => (
              <TodoItem key={itm.itemId} todo={itm} />
            ))}
          </div>
        </div>
      </div>
    </ItemProvider>
  );
}

export default App;
