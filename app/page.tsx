import { Board } from "@/components/board";
import { CreateTaskButton } from "@/components/create-task-button";

export default function IndexPage() {
  return (
    <section className="container pt-6 md:py-10 space-y-5">
      <CreateTaskButton />
      <Board />
    </section>
  );
}
