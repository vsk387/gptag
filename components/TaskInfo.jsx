import React from "react";

const TaskInfo = ({ task }) => {
  console.log(task);
  const { title, category, generatedtasks } = task;

  return (
    <div className="max-w-2l">
      <h1 className="text-4xl font-semibold mb-4">{title}</h1>
      <p className="leading-loose mb-6">{category}</p>
      <ul>
        {generatedtasks.map((generatedtask) => {
          return (
            <li key={generatedtask} className="mb-4 bg-base-100 p-4 rounded-xl">
              <p className="text">{generatedtask}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskInfo;
