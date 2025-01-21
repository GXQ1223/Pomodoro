let workDuration = 25 * 60; // 25 minutes in seconds
let breakDuration = 5 * 60; // 5 minutes in seconds
let longBreakDuration = 15 * 60; // 15 minutes for long break
let currentSession = 'work'; // Start with work session
let pomodorosCompleted = 0; // Counter for completed Pomodoros
let timerInterval;
let isRunning = false; // Flag to check if timer is running
let remainingTime = workDuration; // Keep track of remaining time (starts with workDuration)

function startPauseTimer() {
  if (isRunning) {
    // Pause the timer
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById("startBtn").innerText = "Start"; // Change button text back to Start
    document.getElementById("sessionInfo").innerText = "Paused"; // Optional: Show Paused message
  } else {
    // Start or resume the timer from the current remaining time
    timerInterval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        handleSessionEnd();
      } else {
        remainingTime--;
        document.getElementById("time").innerText = formatTime(remainingTime);
      }
    }, 1000);

    isRunning = true;
    document.getElementById("startBtn").innerText = "Pause"; // Change button text to Pause
    document.getElementById("sessionInfo").innerText = "Stay hard!"; // Update message to Keep working
    // Auto-expand the textarea as you type

    }
}

function handleSessionEnd() {
  if (currentSession === 'work') {
    pomodorosCompleted++;
    if (pomodorosCompleted % 4 === 0) {
      currentSession = 'longBreak';
      alert('Long Break! Time to relax for 15 minutes.');
      remainingTime = longBreakDuration; // Reset remaining time for long break
    } else {
      currentSession = 'break';
      alert('Break time! Relax for 5 minutes.');
      remainingTime = breakDuration; // Reset remaining time for break
    }
  } else {
    currentSession = 'work';
    alert('Work time! Focus and get things done.');
    remainingTime = workDuration; // Reset remaining time for next work session
  }
  document.getElementById('count').innerText = pomodorosCompleted;
  startPauseTimer(); // Restart the timer for the next session
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Add event listener to the start/pause button
document.getElementById("startBtn").addEventListener("click", startPauseTimer);

document.getElementById("notes").addEventListener("input", function () {
    this.style.height = 'auto'; // Reset the height to auto to allow dynamic resizing
    this.style.height = (this.scrollHeight) + 'px'; // Set height to match content
});
