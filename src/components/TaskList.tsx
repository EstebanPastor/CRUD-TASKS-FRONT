import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import type { TaskInterface } from "../interfaces/TaskInterface";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    async function LoadTasks() {
      const res = await getAllTasks();
      setTasks(res.data);
    }
    LoadTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
       <TaskCard key={task.id} task={task}/>
      ))}
    </div>
  );
};

export default TaskList;
