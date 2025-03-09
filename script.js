// Clock configuration
const clockConfig = {
    is24HourFormat: true,
    showSeconds: true
};

// Format time with AM/PM
function formatTime(hours, minutes, seconds) {
    if (!clockConfig.is24HourFormat) {
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    }
    
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return clockConfig.showSeconds 
        ? `${hours}:${minutes}:${seconds}${!clockConfig.is24HourFormat ? ' ' + period : ''}`
        : `${hours}:${minutes}${!clockConfig.is24HourFormat ? ' ' + period : ''}`;
}

function updateClock() {
    try {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const day = String(now.getDate()).padStart(2, '0');
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const weekday = now.toLocaleString('default', { weekday: 'long' });

        const timeString = formatTime(hours, minutes, seconds);
        const dateString = `${weekday}, ${day} ${month} ${year}`;

        document.getElementById('time').textContent = timeString;
        document.getElementById('date').textContent = dateString;
    } catch (error) {
        console.error('Error updating clock:', error);
    }
}

function toggleTimeFormat() {
    clockConfig.is24HourFormat = !clockConfig.is24HourFormat;
    updateClock();
    localStorage.setItem('clockFormat', clockConfig.is24HourFormat ? '24' : '12');
}

function toggleSeconds() {
    clockConfig.showSeconds = !clockConfig.showSeconds;
    updateClock();
    localStorage.setItem('showSeconds', clockConfig.showSeconds.toString());
}

function toggleFullScreen() {
    try {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    } catch (error) {
        console.error('Error toggling fullscreen:', error);
    }
}

// Load saved preferences
function loadPreferences() {
    const savedFormat = localStorage.getItem('clockFormat');
    const savedSeconds = localStorage.getItem('showSeconds');
    
    if (savedFormat) {
        clockConfig.is24HourFormat = savedFormat === '24';
    }
    
    if (savedSeconds) {
        clockConfig.showSeconds = savedSeconds === 'true';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);
    
    // Add format toggle button event listener if it exists
    const formatToggleBtn = document.getElementById('format-toggle');
    if (formatToggleBtn) {
        formatToggleBtn.addEventListener('click', toggleTimeFormat);
    }
    
    // Add seconds toggle button event listener if it exists
    const secondsToggleBtn = document.getElementById('seconds-toggle');
    if (secondsToggleBtn) {
        secondsToggleBtn.addEventListener('click', toggleSeconds);
    }
    
    // Start the clock
    updateClock();
    setInterval(updateClock, 1000);
});
