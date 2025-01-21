let workDuration = 25 * 60; // 25 minutes in seconds
let breakDuration = 5 * 60; // 5 minutes in seconds
let longBreakDuration = 15 * 60; // 15 minutes for long break
let currentSession = 'work'; // Start with work session
let pomodorosCompleted = 0; // Counter for completed Pomodoros
let timerInterval;

function startTimer() {
  let timeRemaining = currentSession === 'work' ? workDuration : (currentSession === 'longBreak' ? longBreakDuration : breakDuration);
  timerInterval = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      handleSessionEnd();
    } else {
      timeRemaining--;
      document.getElementById("time").innerText = formatTime(timeRemaining);
    }
  }, 1000);
}

function handleSessionEnd() {
  if (currentSession === 'work') {
    pomodorosCompleted++;
    if (pomodorosCompleted % 4 === 0) {
      currentSession = 'longBreak';
      alert('Long Break! Time to relax for 15 minutes.');
    } else {
      currentSession = 'break';
      alert('Break time! Relax for 5 minutes.');
    }
  } else {
    currentSession = 'work';
    alert('Work time! Focus and get things done.');
  }
  document.getElementById('count').innerText = pomodorosCompleted;
  startTimer();
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

document.getElementById("startBtn").addEventListener("click", () => {
  startTimer();
});
