let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;  // Start in work mode by default
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle-mode');
const modeText = document.getElementById('mode-text');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function updateModeDisplay() {
    if (timeLeft === 25 * 60 || timeLeft > 5 * 60) {
        modeText.textContent = 'Work Time';
        toggleButton.textContent = 'Rest Mode';  // Shows what mode you can switch to
    } else {
        modeText.textContent = 'Rest Time';
        toggleButton.textContent = 'Work Mode';  // Shows what mode you can switch to
    }
}

function startTimer() {
    if (!isRunning) {
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
                updateModeDisplay();  // Update mode display as time changes
            } else {
                stopTimer();
            }
        }, 1000);
        startButton.textContent = 'Pause';
        isRunning = true;
    } else {
        stopTimer();
    }
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = 'Start';
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    updateDisplay();
    updateModeDisplay();
}

// Start/Pause button
startButton.addEventListener('click', startTimer);

// Reset button
resetButton.addEventListener('click', resetTimer);

// Toggle Work/Rest Mode button
toggleButton.addEventListener('click', () => {
    stopTimer();
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    updateModeDisplay();
    updateDisplay();
});

// Initial setup
updateModeDisplay();
updateDisplay(); 