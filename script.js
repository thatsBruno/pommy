let startTime, intervalId, task;
const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const resetBtn = document.getElementById('resetBtn')
const addTaskBtn = document.getElementById('add')
let tasks = [];

updateTaskList();

// btns
addTaskBtn.onclick = function(){
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        let taskList = document.getElementById("taskList");
        
        let taskItem = document.createElement("li");
        taskItem.textContent = taskText;
        taskList.appendChild(taskItem);
        let newTask = {"id": randomIntFromInterval(1,999), "title": taskText}

        // TODO add to chrome.storage.sync
        addToSyncTasks(newTask)

        chrome.storage.local.set({syncTasks: tasks });

        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
        });
    }
}

startBtn.onclick = function(){
    startTime = new Date().getTime() / 1000; // Convert to seconds
    intervalId = setInterval(timer, 1000);
}
stopBtn.onclick = function(){
    clearInterval(intervalId);
}

resetBtn.onclick = function(){
    clearInterval(intervalId);
    document.getElementById("timer").innerHTML = "Elapsed: 0 seconds";
}

// functions
function addToSyncTasks(newTask){
 chrome.storage.local.get('syncTasks', (result) => {
    let tasks = result ? result.syncTasks : [{}]

    tasks.unshift(newTask)
    chrome.storage.local.set({syncTasks: tasks });
    })
}

function timer() {
    const duration = document.getElementById("duration").value;
    const currentTime = new Date().getTime() / 1000; // Convert to seconds
    const elapsedSeconds = currentTime - startTime;
    document.getElementById("timer").innerHTML = `Elapsed: ${elapsedSeconds.toFixed()} seconds`;

    if (elapsedSeconds >= duration) {
        clearInterval(intervalId);
        console.log("Timer expired!");
        document.getElementById("timer").innerHTML = `Timer expired!`;
    }
}

function deleteTask(id) {
    // TODO iterate over the list and return it withouth the item that has the id
    const taskItem = button.parentElement;
    taskItem.remove();
}

function updateTaskList(){
    chrome.storage.local.get('syncTasks', (result) => {

    let tasks = result ? result.syncTasks : [{}]
    let taskList = document.getElementById("taskList");

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let taskItem = document.createElement("li");
        taskItem.textContent = task.title;
        taskList.appendChild(taskItem);

        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
        });
    }
    })
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
