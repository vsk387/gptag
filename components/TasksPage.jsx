"use client";
import { getAllTasks2 } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import TasksList from "./TasksList";

const ToursPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks2(),
  });

  return (
    <>
      {isPending ? (
        <span className="loading"></span>
      ) : (
        <TasksList data={data} />
      )}
    </>
  );
};
export default ToursPage;
