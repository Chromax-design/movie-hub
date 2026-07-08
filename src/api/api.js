import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_APP_IMDB_READ_ACCESS_TOKEN}`,
    accept: "application/json",
  },
});