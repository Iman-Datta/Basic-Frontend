import axios from "axios";

export const getTasks = () => axios.get("/tasks");
export const createTask = (data) => axios.post("/tasks", data);