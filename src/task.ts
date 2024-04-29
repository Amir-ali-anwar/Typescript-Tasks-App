const taskForm = document.querySelector<HTMLFormElement>('.form')
const formInput = document.querySelector('.form-input')! as HTMLInputElement

const taskListElement = document.querySelector<HTMLUListElement>('.list')

type Task = {
    description: string,
    isCompleted: boolean
}

const tasks: Task[] = []
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
   taskElement.textContent=task.description
   taskListElement?.appendChild(taskElement)

}
function updateStorage():void{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
taskForm?.addEventListener('submit', createTask)