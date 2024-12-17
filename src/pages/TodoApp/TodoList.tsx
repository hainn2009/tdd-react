import { Todo } from "../../api/todo";

type TodoListProp = {
    items: Todo[];
};

const TodoList = (props: TodoListProp) => {
    return (
        <ul>
            {props.items.map((item, index) => (
                <li key={index}>
                    {item.id}: {item.name}
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
