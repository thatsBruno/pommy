let intervalId, tasks = [];
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const addTaskBtn = document.getElementById('add');
const timerDisplay = document.getElementById("timer");
let timerLock = false;

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
    if(!timerLock){
        const duration = parseInt(document.getElementById("duration").value) || 10;
        const startTime = new Date().getTime(); // Current time in milliseconds

        chrome.storage.local.set({ startTime, duration }, function () {
            startTimer();
        });
        timerLock = true;
    }
};

// Timer stop button
stopBtn.onclick = function () {
    clearInterval(intervalId);
    chrome.storage.local.remove(['startTime'], function() {
        timerDisplay.innerHTML = "Timer stopped.";
    });
    timerLock = false;
};

// Start the timer function
function startTimer() {
    chrome.storage.local.get(['startTime', 'duration'], function (result) {
        const startTime = result.startTime;
        const duration = result.duration || 10;

        if (!startTime) {
            return;
        }

        intervalId = setInterval(function () {
            const currentTime = new Date().getTime();
            const elapsedMilliseconds = currentTime - startTime;
            const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

            if (elapsedSeconds >= duration) {
                clearInterval(intervalId);
                timerDisplay.innerHTML = `Timer expired!`;
                chrome.storage.local.remove(['startTime']); // Timer expired, clear from storage

                playNotification();
                timerLock = false;
            } else {
                timerDisplay.innerHTML = `Elapsed: ${elapsedSeconds} seconds`;
            }
        }, 1000);
    });
}

// Update task list from storage
function updateTaskList() {
    chrome.storage.local.get(['syncTasks', 'startTime'], (result) => {
        tasks = result.syncTasks || [];
        renderTaskList();

        // Check if timer was running
        if (result.startTime) {
            startTimer();
        }
    });
}

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
        let taskDiv = document.createElement("div")
        let taskItem = document.createElement("li");
        taskDiv.className = "taskItem-div";
        taskItem.className = "taskItem";
        taskItem.textContent = task.title;

        // Add delete button
        let deleteButton = document.createElement("button");
        deleteButton.className = "taskItem=btn";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(task.id);

        taskDiv.appendChild(taskItem);
        taskDiv.appendChild(deleteButton);
        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
        });

        taskList.appendChild(taskDiv);
    });
}

// Delete task by id
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    chrome.storage.local.set({ syncTasks: tasks });
    renderTaskList();
}

// Utility to generate random IDs
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function playNotification() {
  var yourSound = new Audio('./clock-alarm.mp3');
  yourSound.play();

  setTimeout(() => {
    yourSound.pause();
}, 3000);
}
