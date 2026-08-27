import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";

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
      } else {
        await createTask(data);
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
        navigate("/tasks");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>Title is required</span>}

        <textarea
          rows={3}
          placeholder="Description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>Description is required</span>}

        <button type="submit">{params.id ? "Update" : "Save"}</button>
      </form>

      {params.id && (
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default TaskFormPage;