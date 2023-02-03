import { getTodos } from "../../api/todo";
import { useLoaderData } from "react-router-dom";
import TodoList from "./TodoList";

export function loader() {
  return getTodos();
  // return [
  //   { id: 1, name: "Tập thể dục" },
  //   { id: 2, name: "Học lập trình" },
  // ];
}

const TodoApp = () => {
  const todos = useLoaderData();
  return (
    <>
      <TodoList items={todos} />
    </>
  );
};

export default TodoApp;
