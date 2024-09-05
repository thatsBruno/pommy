let startTime, intervalId, task;
const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const resetBtn = document.getElementById('resetBtn')
const addTaskBtn = document.getElementById('add')
// TODO get the tasks from chrome.storage.sync
let tasks = [{id: "stuff", title: "stuff"}, {id: "stuff", title: "stuff2"}, {id: "stuff", title: "stuff3"}]

addExistingTasks(tasks)

// btns
addTaskBtn.onclick = function(){
 const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        let taskList = document.getElementById("taskList");
        
        let taskItem = document.createElement("li");
        taskItem.textContent = taskText;
        taskList.appendChild(taskItem);
        // TODO add to chrome.storage.sync

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

function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTask(taskText);
        taskInput.value = "";
    }
}

function deleteTask(id) {
    // TODO iterate over the list and return it withouth the item that has the id
    const taskItem = button.parentElement;
    taskItem.remove();
}

function addExistingTasks(tasks){
    let taskList = document.getElementById("taskList");
    
    for (let i = 0; i < tasks.length; i++) {
        let taskItem = document.createElement("li");
        task = tasks[i].title;
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
        });
    }
}