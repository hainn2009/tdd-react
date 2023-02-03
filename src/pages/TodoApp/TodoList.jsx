const TodoList = (props) => {
  return props.items.map((item) => `${item.id}: ${item.name}`);
};
export default TodoList;
