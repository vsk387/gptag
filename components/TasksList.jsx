import TaskCard from "./TaskCard";

const TasksList = ({ data }) => {
  if (data.length === 0)
    return <h4 className="text-lg ">No tasks</h4>;

  return (
    <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-8">
      {data.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
    </div>
  );
};
export default TasksList;
