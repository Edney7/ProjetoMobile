import axios from "axios";

const api = axios.create({
  baseURL:"https://www.themealdb.com/api/json/v1/1/search.php?s=",
  // baseURL: "https://api.github.com",
});
export default api;
