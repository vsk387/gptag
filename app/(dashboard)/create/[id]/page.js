"use client";
import EditForm from "@/components/EditForm";
import { getTask } from "@/utils/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

const TaskPage = async ({ params }) => {
  const task = await getTask(params.id);

  return (
    <>
      <div className="mb-16">
        <Link href="/create" className="btn btn-accent">
          Back to Tasks
        </Link>
        <EditForm task={task} />
      </div>
    </>
  );
};

export default TaskPage;
