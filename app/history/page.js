"use client";

import { clearHistory, getHistory } from "@/utils/localStorage";
import { useState, useEffect } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const removeHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-center text-xl text-gray-600 mb-6">
        Your Search History
      </h1>
      {history.length ? (
        <div className="mb-4">
          <div className="grid grid-cols-2 text-gray-600 mb-2">
            <div>Search Term</div>
            <div>Search Results</div>
          </div>

          {history.map((item) => (
            <div key={item.id} className="grid grid-cols-2 border-t py-4">
              <div className="text-gray-600">{item.query}</div>
              <div className="flex flex-col gap-5">
                {item?.result?.length ? (
                  item.result.map((user) => (
                    <div key={user.login} className="flex items-center">
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-12 h-12 rounded-md"
                      />
                      <div className="ml-4">
                        <h3 className="text-gray-600">GitHub User Name</h3>
                        <p>{user.login}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">Search result not found</span>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={removeHistory}
            className="w-full bg-emerald-400 text-white py-2 rounded-md hover:bg-emerald-500"
          >
            Clear Search History
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No search history found</p>
      )}
    </div>
  );
}
