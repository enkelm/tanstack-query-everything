import { suspenseQuery } from "../lib/query";
import "./App.css";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const Todos = suspenseQuery<Todo>(
  ({ data }) => (
    <ul>
      <li>{data?.title}</li>
    </ul>
  ),
  () => <p>Loading...</p>,
);

function App() {
  return (
    <>
      <h1>User Todos</h1>
      <Todos
        queryKey={["todo"]}
        queryFn={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return await fetch(
            "https://jsonplaceholder.typicode.com/todos/1",
          ).then((response) => response.json() as unknown as Todo);
        }}
      />
    </>
  );
}

export default App;
