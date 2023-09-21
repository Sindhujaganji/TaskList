const formList = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filterTask = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    formList.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filterTask.addEventListener('keyup', filterTasks);
}


function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<button> X</button>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}



function addTask(e){
    if(taskInput.value === ''){
        alert("Add a Task");
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<button> X</button>';
    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
    e.preventDefault();
}


function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks =[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskfromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}


function removeTaskfromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks =[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTasks(){
    // taskList.innerHTML = ''; or

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}


function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !=-1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}