import { useNavigate } from "react-router-dom";
import type { TaskInterface } from "../interfaces/TaskInterface";

interface Props {
  task: TaskInterface;
}

const TaskCard = ({ task }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className="bg-zinc-800 p-5 rounded-lg hover:bg-zinc-700 hover:cursor-pointer transition-all border border-zinc-700 hover:border-zinc-500 shadow-md flex flex-col justify-between"
    >
      <div>
        <h1 className="font-bold text-xl uppercase text-zinc-100 mb-2 truncate">
          {task.title}
        </h1>
        <p className="text-zinc-400 text-sm line-clamp-3 font-normal">
          {task.description}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;