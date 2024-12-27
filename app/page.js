"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!query) {
      setError("Please enter a search term.");
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}`
      );
      const data = await response.json();

      setUsers(data.items || []);

      // Save to history
      const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      const searchEntry = {
        id: Date.now(),
        query,
        timestamp: new Date().toISOString(),
        result: data.items || null,
      };
      localStorage.setItem(
        "searchHistory",
        JSON.stringify([searchEntry, ...history])
      );
    } catch (err) {
      console.error(err);
      setError("Error fetching data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center w-full flex-col items-center my-8 gap-5">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Search GitHub User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={searchUsers} className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ethan Linker"
                className="w-full pl-10 pr-4 py-2 border rounded-md mb-4"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-400 text-white py-2 rounded-md hover:bg-emerald-500"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </CardContent>
      </Card>
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {users?.length ? (
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle className="font-normal text-lg">
              Search Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              {users.map((user) => (
                <div key={user.login} className="flex items-center">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-12 h-12 rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="text-gray-600">GitHub User Name</h3>
                    <p>
                      <a
                        href={user.html_url}
                        target="_blank"
                        className="hover:text-emerald-400"
                      >
                        {user.login}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}
