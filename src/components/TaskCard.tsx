import type { TaskInterface } from "../interfaces/TaskInterface";

interface TaskCardProps {
  task: TaskInterface;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
