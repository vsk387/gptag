
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTask, generateTaskResponse } from "@/utils/actions";

import toast from "react-hot-toast";
import TaskInfo from "@/components/TaskInfo";

const NewTask = () => {
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    data: task,
  } = useMutation({
    mutationFn: async (tasks) => {
      const newTask = await generateTaskResponse(tasks);
      if (newTask) {
        await createNewTask(newTask);
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        return newTask;
      }
      toast.error("An error occured :/");
      return null;
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const tasks = Object.fromEntries(formData.entries());
    mutate(tasks);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className=" mb-4">Enter Task in Mind</h2>
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="Type Here!"
            name="tasks"
            required
          />
          <button className="btn btn-primary join-item" type="submit">
            Generate Tasks
          </button>
        </div>
      </form>

      <div className="mt-16">{task ? <TaskInfo task={task} /> : null}</div>
    </>
  );
};
export default NewTask;
