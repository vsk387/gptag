//tasks/page.js
//page to create new tasks

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

const CreatePage = () => {
  return (
    <div className="max-w-lg">
      <TaskForm />
      <TaskList />
    </div>
  );
};
export default CreatePage;

export const createTaskCustom = async (formData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const content = formData.get("content");
  // some validation here

  await prisma.task.create({
    data: {
      content,
    },
  });
  // revalidate path
  revalidatePath("/tasks");
};
