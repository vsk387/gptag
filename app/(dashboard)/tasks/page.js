import TasksPage from "@/components/TasksPage";
import { getAllTasks, getAllTasks2 } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function AllTasksPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks2(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksPage />
    </HydrationBoundary>
  );
}
