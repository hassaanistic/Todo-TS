import "./style.css"


interface Todo {
  title: string,
  isCompleted: boolean,
  readonly id: string,
}
//we made this interfce just for the array only store the tyoe of interface 
const todos: Todo[] = [];


const todoContainer = document.querySelector(".todocontainer") as HTMLDivElement

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement

const myForm = document.getElementById("myForm") as HTMLFormElement

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000)

  }

  todos.push(todo);
  todoInput.value = "";

  renderTodo(todos);

}

const deleteTodo = (id: string) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodo(todos);
  }
};
const generateToDoItem = (title: string, isCompleted: boolean, id: string) => {
  const todoDiv: HTMLDivElement = document.createElement("div");
  todoDiv.className = "todo";

  //creating checkBox
  const checkbox: HTMLInputElement = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "isCompleted";
  checkbox.checked = isCompleted;

  checkbox.onchange = ()=>{
    paragraph.className = checkbox.checked ? "textCut" : " " 
  }

  //creating p for title 
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;

  //creating delete for title 
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X"
  btn.className = "deleteBtn"
  btn.onclick = () => deleteTodo(id);
  
  //Appending all  
  todoDiv.append(checkbox ,paragraph ,btn);
  todoContainer.append(todoDiv);


}

const renderTodo = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach((item) => {
    generateToDoItem(item.title, item.isCompleted, item.id);
  });
}