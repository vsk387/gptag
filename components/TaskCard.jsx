import Link from "next/link";
const TaskCard = ({ task }) => {
  const { title, category, id, generatedtasks } = task;

  return (
    <Link
      href={`/tasks/${id}`}
      className="card card-compact rounded-xl bg-base-100"
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title text-center">{title}</h2>
      </div>
    </Link>
  );
};

export default TaskCard;
