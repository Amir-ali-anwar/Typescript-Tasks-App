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
  if (root !== null) {
    const rootStyles = getComputedStyle(root);
    const currentBackgroundColor = rootStyles.getPropertyValue('--background-color').trim();
    
    let newBackgroundColor = '';
    let newTextColor = '';
    let newWhiteColor = '';

    // Toggle between light and dark themes
    if (currentBackgroundColor === '#f8fafc') {
      newBackgroundColor = '#282c35'; // Dark background
      newTextColor = '#fff'; // Light text
      newWhiteColor = '#282c35'; // White color
      iconToggle?.classList.remove('fa-moon'); // Remove moon icon
      iconToggle?.classList.add('fa-sun'); // Add sun icon
    } else {
      newBackgroundColor = '#f8fafc'; // Light background
      newTextColor = '#0f172a'; // Dark text
      newWhiteColor = '#fff'; // White color
      iconToggle?.classList.remove('fa-sun'); // Remove sun icon
      iconToggle?.classList.add('fa-moon'); // Add moon icon
    }

    // Update CSS variables
    root.style.setProperty('--background-color', newBackgroundColor);
    root.style.setProperty('--text-color', newTextColor);
    root.style.setProperty('--white', newWhiteColor);
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
