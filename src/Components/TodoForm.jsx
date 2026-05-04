import React, { useState } from "react";

export default function TodoForm({ inpVal, setInpVal, addTodo }) {
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(desc);
    setDesc("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-1.5">
        <input
          className="shadow-lg rounded-2xl py-3 px-4 w-lg shadow-amber-300"
          type="text"
          placeholder="Enter Task..."
          value={inpVal}
          onChange={(e) => setInpVal(e.target.value)}
        />

        <button
          className="border-2 text-xl p-3 bg-emerald-500 rounded-3xl text-white hover:bg-emerald-600"
          type="submit"
        >
          add to task
        </button>
      </div>

      <input
        type="text"
        placeholder="description..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border-2 p-3 w-[620px] rounded-lg"
      />
    </form>
  );
}
