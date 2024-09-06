let startTime, intervalId, task;
const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const resetBtn = document.getElementById('resetBtn')
const addTaskBtn = document.getElementById('add')
let tasks = [
    {"id": 1, "title": "task1"},
    {"id": 2, "title": "task2"}
];

// TODO get the tasks from chrome.storage.sync
addExistingTasks();

// btns
addTaskBtn.onclick = function(){
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        let taskList = document.getElementById("taskList");
        
        let taskItem = document.createElement("li");
        taskItem.textContent = taskText;
        taskList.appendChild(taskItem);
        let newTask = {"id":2, "title": taskText}
        tasks.push(newTask)

        // TODO add to chrome.storage.sync
        chrome.storage.sync.set({syncTasks: tasks });

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

function deleteTask(id) {
    // TODO iterate over the list and return it withouth the item that has the id
    const taskItem = button.parentElement;
    taskItem.remove();
}

function addExistingTasks(){
    chrome.storage.sync.get('tasks', (result) => {

    let tasks = result ? result.syncTasks : [{}]
    let taskList = document.getElementById("taskList");

    tasks.forEach((task) => {
        let taskItem = document.createElement("li");
        taskItem.textContent = task.title;
        taskList.appendChild(taskItem);

        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
        });
    });
})}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }