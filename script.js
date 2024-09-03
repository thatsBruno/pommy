let startTime, intervalId;

function startTimer() {
    const duration = document.getElementById("duration").value;
    startTime = new Date().getTime() / 1000; // Convert to seconds
    intervalId = setInterval(timer, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}

function resetTimer() {
    stopTimer();
    document.getElementById("timer").innerHTML = "Elapsed: 0 seconds";
}

function timer() {
    const currentTime = new Date().getTime() / 1000; // Convert to seconds
    const elapsedSeconds = currentTime - startTime;
    document.getElementById("timer").innerHTML = `Elapsed: ${elapsedSeconds.toFixed()} seconds`;

    if (elapsedSeconds >= duration) {
        clearInterval(intervalId);
        console.log("Timer expired!");
    }
}