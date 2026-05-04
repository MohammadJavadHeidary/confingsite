import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

export default function TodoList({
  listOfTodos,
  deleteTodo,
  openSellModal,
  favoriteTodo,
}) {
  const [isDescModalOpen, setIsDescModalOpen] = useState(false);
  const [descTodo, setDescTodo] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");

  const openDescModal = (todo) => {
    setDescTodo(todo);
    setIsDescModalOpen(true);
    setCopyStatus("");
  };

  const closeDescModal = () => {
    setIsDescModalOpen(false);
    setDescTodo(null);
    setCopyStatus("");
  };

  const handleCopy = async () => {
    if (!descTodo) return;
    const textToCopy =
      `✅ خرید شما با موفقیت انجام شد\n` +
      `🙏 ممنون از اعتماد شما\n\n` +
      `📦 اطلاعات اشتراک شما:\n` +
      `🔗 ساب: ${descTodo.text}\n` +
      `📁 کانفیگ: ${descTodo.description || "No description provided."}\n\n` +
      `⚠️ در صورت بروز مشکل یا سوال، حتماً پیام بده\n` +
      `💬 پشتیبانی در خدمتته`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyStatus("Copied successfully!");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      try {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopyStatus("Copied successfully!");
        setTimeout(() => setCopyStatus(""), 2000);
      } catch {
        setCopyStatus("Failed to copy.");
        setTimeout(() => setCopyStatus(""), 3000);
      }
    }
  };

  const items = listOfTodos?.map((item) => (
    <li
      key={item.id}
      className="shadow-md w-[620px] bg-white rounded-lg p-3 mb-3 flex flex-col"
    >
      <div className="flex justify-between items-center">
        <p className="font-medium">
          {item.text}
          {item.sold && (
            <span className="ml-2 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
              Sold
            </span>
          )}
        </p>

        <div className="flex gap-2 items-center">
          <button
            className="bg-red-600 rounded-lg py-2 px-4 text-white hover:bg-red-700"
            onClick={() => deleteTodo(item.id)}
          >
            Delete
          </button>

          <button
            disabled={item.sold}
            onClick={() => openSellModal(item.id)}
            className={`px-4 py-2 rounded text-white transition ${
              item.sold
                ? "bg-green-600 cursor-not-allowed opacity-70"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {item.sold ? "Sold" : "Sell"}
          </button>

          {item.sold && (
            <button
              className="bg-yellow-400 px-3 py-2 rounded hover:bg-yellow-500"
              onClick={() => openDescModal(item)}
            >
              Show
            </button>
          )}

          <button onClick={() => favoriteTodo(item.id)} aria-label="favorite">
            {item.favorite ? (
              <IoHeart className="w-7 h-7 text-red-600" />
            ) : (
              <IoHeartOutline className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <div className="mt-6 w-[650px] h-[500px] overflow-y-scroll border rounded-lg p-3 bg-slate-50">
        {listOfTodos.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No items found in this filter.
          </p>
        ) : (
          <ul>{items}</ul>
        )}
      </div>

      {isDescModalOpen && descTodo && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="desc-modal-title"
        >
          <div className="bg-white w-[360px] rounded-xl shadow-lg p-5 space-y-3">
            <h2
              id="desc-modal-title"
              className="text-lg font-semibold text-gray-800"
            >
              ✅ خرید شما با موفقیت انجام شد
            </h2>

            <p>🙏 ممنون از اعتماد شما</p>

            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium">📦 اطلاعات اشتراک شما:</p>

              <p className="mt-1">
                🔗 ساب:
                <span className="font-semibold ml-1">{descTodo.text}</span>
              </p>

              <p className="mt-1 break-words">
                📁 کانفیگ:
                <span className="text-sm ml-1">
                  {descTodo.description || "No description provided."}
                </span>
              </p>
            </div>

            <p className="text-sm text-gray-600">
              ⚠️ در صورت بروز مشکل یا سوال، حتماً پیام بده
              <br />
              💬 پشتیبانی در خدمتته
            </p>

            <button
              onClick={handleCopy}
              className={`w-full py-2 rounded transition duration-150 ${
                copyStatus === "Copied successfully!"
                  ? "bg-green-500 text-white"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              {copyStatus || "Copy Config"}
            </button>

            <button
              onClick={closeDescModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
