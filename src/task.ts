const taskForm = document.querySelector<HTMLFormElement>('.form')
const formInput = document.querySelector('.form-input')! as HTMLInputElement

const taskListElement = document.querySelector<HTMLUListElement>('.list')

type Task = {
    description: string,
    isCompleted: boolean
}

function loadTasks(): Task[] {
    const storedItems = localStorage.getItem('tasks')
    return storedItems ? JSON.parse(storedItems) : []
}
const tasks: Task[] = loadTasks();
tasks.forEach(renderTask)
function createTask(event: SubmitEvent) {
    event.preventDefault()
    const taskDescription = formInput.value
    if (taskDescription) {

        const task: Task = {
            description: taskDescription,
            isCompleted: false
        }
        addTask(task)
        renderTask(task)
        updateStorage()
        formInput.value = '';
        return ''

    }
    alert('Please enter a task description')
}
function addTask(task: Task): void {
    console.log(task);
    
    tasks.push(task)
}
function renderTask(task:Task):void{
   const taskElement= document.createElement('li')
   const iconElement= document.createElement('i')
   console.log({iconElement});
   
    iconElement.setAttribute('class','fa-solid fa-user')
//    input.type='checkbox'
//    input.checked= task.isCompleted
   taskElement.appendChild(iconElement)
   taskElement.appendChild(iconElement)
   taskElement.textContent=task.description
   taskListElement?.appendChild(taskElement)

}
function updateStorage():void{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
taskForm?.addEventListener('submit', createTask)