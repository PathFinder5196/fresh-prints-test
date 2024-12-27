// utils/localStorage.js
export const getHistory = () => {
  return JSON.parse(localStorage.getItem("searchHistory") || "[]");
};

export const addToHistory = (term, data) => {
  const history = getHistory();
  history.push({ term, data });
  localStorage.setItem("searchHistory", JSON.stringify(history));
};

export const clearHistory = () => {
  localStorage.removeItem("searchHistory");
};
