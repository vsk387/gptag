
import React from "react";
import { getSingleTask } from "@/utils/actions";
import TaskInfo from "@/components/TaskInfo";
import Link from "next/link";
import { redirect } from 'next/navigation';
import DeleteTask from "@/components/DeleteTask";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const SingleTaskPage = async ({ params }) => {
  const task = await getSingleTask(params.id);

  if (!task) {
    redirect('/tasks');
  }

  return (
    <div>
      <Link href="/tasks" className="btn btn-accent mb-4">
        Back To Tasks
      </Link>
      <TaskInfo task={task} />
      <DeleteTask id={task.id}/>
    </div>
  );
};

export default SingleTaskPage;
