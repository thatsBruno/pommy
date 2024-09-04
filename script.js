let startTime, intervalId;
const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const resetBtn = document.getElementById('resetBtn')
const addTaskBtn = document.getElementById('add')

addTaskBtn.onclick = function(){
 const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        taskInput.value = "";
        const taskList = document.getElementById("taskList");
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(taskItem);

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

function createTask(text) {
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${text}</span>
        <button class="delete" onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(taskItem);

    taskItem.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
    });
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}