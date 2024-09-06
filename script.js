let startTime, intervalId, tasks = [];
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const addTaskBtn = document.getElementById('add');

// Update the task list from storage on load
updateTaskList();

// Add task button click handler
addTaskBtn.onclick = function () {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        const newTask = { id: randomIntFromInterval(1, 999), title: taskText };
        tasks.push(newTask);

        // Save to chrome.storage.local
        addToSyncTasks(newTask);
        renderTaskList();
        taskInput.value = ''; // Clear input
    }
};

// Timer start button
startBtn.onclick = function () {
    startTime = new Date().getTime() / 1000; // Convert to seconds
    intervalId = setInterval(timer, 1000);
};

// Timer stop button
stopBtn.onclick = function () {
    clearInterval(intervalId);
};

// Timer reset button
resetBtn.onclick = function () {
    clearInterval(intervalId);
    document.getElementById("timer").innerHTML = "Elapsed: 0 seconds";
};

// Add task to chrome.storage.local
function addToSyncTasks(newTask) {
    chrome.storage.local.get('syncTasks', (result) => {
        let tasks = result.syncTasks || [];
        tasks.unshift(newTask);
        chrome.storage.local.set({ syncTasks: tasks });
    });
}

// Render task list
function renderTaskList() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ''; // Clear the existing list

    tasks.forEach(task => {
        let taskItem = document.createElement("li");
        taskItem.textContent = task.title;

        // Add delete button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(task.id);

        taskItem.appendChild(deleteButton);
        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
        });

        taskList.appendChild(taskItem);
    });
}

// Delete task by id
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    chrome.storage.local.set({ syncTasks: tasks });
    renderTaskList();
}

// Update task list from chrome.storage.local
function updateTaskList() {
    chrome.storage.local.get('syncTasks', (result) => {
        tasks = result.syncTasks || [];
        renderTaskList();
    });
}

// Timer function
function timer() {
    const duration = document.getElementById("duration").value;
    const currentTime = new Date().getTime() / 1000; // Convert to seconds
    const elapsedSeconds = currentTime - startTime;
    document.getElementById("timer").innerHTML = `Elapsed: ${elapsedSeconds.toFixed()} seconds`;

    if (elapsedSeconds >= duration) {
        clearInterval(intervalId);
        document.getElementById("timer").innerHTML = `Timer expired!`;
    }
}

// Utility to generate random IDs
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
