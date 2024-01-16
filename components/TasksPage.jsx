"use client";
import { getAllTasks2 } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TasksList from "./TasksList";

const TasksPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["tasks", searchValue],
    queryFn: () => getAllTasks2(searchValue),
  });

  return (
    <>
      <div className="w-96 mb-3">Filter by Task or Category:</div>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="enter Task or Category here..."
            className="input input-bordered join-item w-full"
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button
            className="btn btn-primary join-item"
            type="button"
            disabled={isPending}
            onClick={() => setSearchValue("")}
          >
            {isPending ? "please wait" : "reset"}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className=" loading"></span>
      ) : (
        <TasksList data={data} />
      )}

    </>
  );
};
export default TasksPage;
