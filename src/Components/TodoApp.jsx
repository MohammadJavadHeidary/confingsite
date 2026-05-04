import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import {
  fetchTodos,
  insertTodo,
  deleteTodoApi,
  updateTodoApi,
} from "../api";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inpVal, setInpVal] = useState("");
  const [filter, setFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // 🔥 load from supabase
  useEffect(() => {
    const load = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };

    load();
  }, []);

  // ✅ filter fix (خیلی مهم)
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.sold;
    if (filter === "sold") return todo.sold;
    if (filter === "favorite") return todo.favorite;
    return true;
  });

  // ➕ ADD TODO (Supabase)
  const addTodo = async (description) => {
    if (!inpVal.trim()) return;

    const newTodo = {
      text: inpVal,
      description: description,
      sold: false,
      favorite: false,
    };

    const inserted = await insertTodo(newTodo);

    setTodos((prev) => [inserted[0], ...prev]);
    setInpVal("");
  };

  // 🗑 DELETE
  const deleteTodo = async (id) => {
    await deleteTodoApi(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // 💰 SELL
  const openSellModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmSell = async () => {
    await updateTodoApi(selectedId, { sold: true });

    setTodos((prev) =>
      prev.map((t) =>
        t.id === selectedId ? { ...t, sold: true } : t
      )
    );

    setShowModal(false);
    setSelectedId(null);
  };

  // ⭐ FAVORITE
  const favoriteTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);

    await updateTodoApi(id, { favorite: !todo.favorite });

    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, favorite: !t.favorite } : t
      )
    );
  };

  return (
    <div className="flex flex-col items-center mt-8 gap-6">

      <TodoForm
        inpVal={inpVal}
        setInpVal={setInpVal}
        addTodo={addTodo}
      />

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mt-4">
        {["all", "active", "sold", "favorite"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              filter === type
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <TodoList
        listOfTodos={filteredTodos}
        deleteTodo={deleteTodo}
        openSellModal={openSellModal}
        favoriteTodo={favoriteTodo}
      />

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[320px]">
            <p className="text-lg font-semibold">
              Are you sure?
            </p>

            <div className="flex gap-3 mt-5 justify-center">
              <button
                onClick={confirmSell}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}