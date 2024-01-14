import React from "react";
import { getSingleTask } from "@/utils/actions";
import { redirect } from "next/dist/server/api-utils";
import TaskInfo from "@/components/TaskInfo";
import Link from "next/link";

const SingleTaskPage = async ({ params }) => {
  const task = await getSingleTask(params.id);

  if (!task) {
    redirect("/tasks");
  }

  return (
    <div>
      <Link href="/tasks" classname="btn btn-accent">
        Back To Tasks
      </Link>
      <TaskInfo task={task} />
    </div>
  );
};

export default SingleTaskPage;
