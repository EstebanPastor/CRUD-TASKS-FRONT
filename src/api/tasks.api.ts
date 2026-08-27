import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://127.0.0.1:8000/tasks/api/v1/tasks/",
});

export const getAllTasks = () => {
  return taskApi.get("/");
};

export const getTask = (id: string) => {
  return taskApi.get(`/${id}/`);
};

export const createTask = (task: any) => {
  return taskApi.post("/", task);
};

export const deleteTask = (id: string) => {
  return taskApi.delete(`/${id}/`);
};

export const updateTask = (id: string, task: any) => {
  return taskApi.put(`/${id}/`, task);
};
