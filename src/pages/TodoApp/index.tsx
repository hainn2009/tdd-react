import { getTodos } from "../../api/todo";
import TodoList from "./TodoList";
import TodoChart from "./TodoChart";
import { useEffect, useState } from "react";
import type { Todo } from "../../api/todo";

const TodoApp = () => {
    const [todos, setTodods] = useState<Todo[]>([]);
    useEffect(() => {
        setTodods(getTodos());
    }, []);
    return (
        <>
            <TodoList items={todos} />
            <TodoChart />
        </>
    );
};

export default TodoApp;
