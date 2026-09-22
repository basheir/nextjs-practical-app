import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>Keep track of what you need to get done.</CardDescription>
        </CardHeader>
        <CardContent>
          <TodoList />
        </CardContent>
      </Card>
    </div>
  );
}
