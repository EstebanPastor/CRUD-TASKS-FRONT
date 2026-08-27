import type { TaskInterface } from "../interfaces/TaskInterface";
import {useNavigate} from "react-router-dom";

interface TaskCardProps {
  task: TaskInterface;
}


const TaskCard = ({ task }: TaskCardProps) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => {
        navigate(`/tasks/${task.id}`)
    }}>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
