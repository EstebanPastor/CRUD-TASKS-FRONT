import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { toast } from "react-hot-toast";

interface TaskFormInputs {
  title: string;
  description: string;
}

const TaskFormPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskFormInputs>();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        try {
          const res = await getTask(params.id);
          setValue("title", res.data.title);
          setValue("description", res.data.description);
        } catch (error) {
          console.error("Error loading task:", error);
        }
      }
    }
    loadTask();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updateTask(params.id, data);
        toast.success("Task updated successfully", {
          position: "bottom-right",
          style: { background: "#10B981", color: "#fff" },
        });
      } else {
        await createTask(data);
        toast.success("Task created successfully", {
          position: "bottom-right",
          style: { background: "#10B981", color: "#fff" },
        });
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  });

  const handleDelete = async () => {
    if (!params.id) return;

    const accepted = window.confirm("Are you sure to delete this task?");
    if (accepted) {
      try {
        await deleteTask(params.id);
        toast.success("Task deleted successfully", {
          position: "bottom-right",
          style: { background: "#EF4444", color: "#fff" },
        });
        navigate("/tasks");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-zinc-800 rounded-lg shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-zinc-100">
        {params.id ? "Edit Task" : "Create Task"}
      </h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="w-full bg-zinc-700 p-3 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          {errors.title && (
            <span className="text-red-400 text-sm mt-1 block">
              Title is required
            </span>
          )}
        </div>

        <div>
          <textarea
            rows={4}
            placeholder="Description"
            {...register("description", { required: true })}
            className="w-full bg-zinc-700 p-3 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
          ></textarea>
          {errors.description && (
            <span className="text-red-400 text-sm mt-1 block">
              Description is required
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
        >
          {params.id ? "Update" : "Save"}
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFormPage;