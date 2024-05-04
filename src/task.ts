import Swal from 'sweetalert2';

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
type ThemeTyes={
  newBackgroundColor:string,
  newTextColor:string,
  newWhiteColor:string

}
let newBackgroundColor = '';
let newTextColor = '';
let newWhiteColor = '';
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
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Please Enter the Task description!",
  });
}
iconToggle?.addEventListener("click", toggleTheme);



function themeFromLocalStorage() {
  const storedTheme = getThemeFromLocalStorage();
  if (root !== null) {
    if (storedTheme) {
      root.style.setProperty(
        "--background-color",
        storedTheme?.newBackgroundColor
      );
      root.style.setProperty("--text-color", storedTheme?.newTextColor);
      root.style.setProperty("--white", storedTheme?.newWhiteColor);
      return;
    }
  }
}
document.addEventListener('DOMContentLoaded',themeFromLocalStorage)

function toggleTheme(event: Event): void {
  event.stopPropagation();

  if (root !== null) {
    const rootStyles = getComputedStyle(root);
    const currentBackgroundColor = rootStyles.getPropertyValue('--background-color').trim();
   

    // Toggle between light and dark themes
    if (currentBackgroundColor === '#f8fafc') {
      newBackgroundColor = '#282c35'; // Dark background
      newTextColor = '#fff'; // Light text
      newWhiteColor = '#282c35'; // White color
      root.style.setProperty('--background-color', newBackgroundColor);
      root.style.setProperty('--text-color', newTextColor);
      root.style.setProperty('--white', newWhiteColor);
      iconToggle?.classList.remove('fa-moon'); // Remove moon icon
      iconToggle?.classList.add('fa-sun'); // Add sun icon
    } else {
      newBackgroundColor = '#f8fafc'; // Light background
      newTextColor = '#0f172a'; // Dark text
      newWhiteColor = '#fff'; // White color
      root.style.setProperty('--background-color', newBackgroundColor);
      root.style.setProperty('--text-color', newTextColor);
      root.style.setProperty('--white', newWhiteColor);
      iconToggle?.classList.remove('fa-sun'); // Remove sun icon
      iconToggle?.classList.add('fa-moon'); // Add moon icon
    }

    // Update CSS variables
   
    const themevalues={
      newBackgroundColor,
      newTextColor,
      newWhiteColor
    }
    UpdateThemeLocalStorage(themevalues)
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
function UpdateThemeLocalStorage(theme:ThemeTyes):void{
  localStorage.setItem('theme', JSON.stringify(theme))
}
function getThemeFromLocalStorage(): ThemeTyes | ThemeTyes {
  const storedItems = localStorage.getItem("theme");
  return storedItems ? JSON.parse(storedItems) : [];
}
taskForm?.addEventListener("submit", createTask);
