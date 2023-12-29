let todos:Array<string> = [];
const delay = () => new Promise((res:Function) => setTimeout(() => res(), 800));

export async function getTodos() {
  await delay();
  return todos;
}
export async function addTodo(todo:string) {
  await delay();
  if (Math.random() < 0.5) throw new Error("Failed to add new item!");
  todos = [...todos, todo];
  return todos;
}
