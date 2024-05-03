const taskForm = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector(".form-input")! as HTMLInputElement;
const taskListElement = document.querySelector<HTMLUListElement>(".list");
const iconToggle = document.querySelector<HTMLElement>(
  ".theme-icons .fa-solid"
);
const root = document.querySelector<HTMLElement>(":root");
type Task = {
  description: string;
  isCompleted: boolean;
};

function loadTasks(): Task[] {
  const storedItems = localStorage.getItem("tasks");
  return storedItems ? JSON.parse(storedItems) : [];
}
const tasks: Task[] = loadTasks();
tasks.forEach(renderTask);
function createTask(event: SubmitEvent) {
  event.preventDefault();
  const taskDescription = formInput.value;
  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    addTask(task);
    renderTask(task);
    updateStorage();
    formInput.value = "";
    return "";
  }
  alert("Please enter a task description");
}
iconToggle?.addEventListener("click", toggleTheme);

function toggleTheme(event: Event): void {
  event.stopPropagation();
  if (root!==null) {
    const rootStyles = getComputedStyle(root);
  }
}

function addTask(task: Task): void {
  console.log(task);

  tasks.push(task);
}
function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  const taskElementParagparh = document.createElement("p");
  const iconElement = document.createElement("i");
  taskElement.appendChild(taskElementParagparh);
  iconElement.setAttribute("class", "fa-solid fa-trash");
  taskElement.appendChild(iconElement);
  taskElementParagparh.textContent = task.description;
  taskListElement?.appendChild(taskElement);
  taskListElement?.appendChild(taskElement);
}
function updateStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
taskForm?.addEventListener("submit", createTask);
