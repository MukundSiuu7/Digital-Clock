function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let day = now.getDate();
    let month = now.getMonth() + 1; // January is 0!
    let year = now.getFullYear();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    let timeString = `${hours}:${minutes}:${seconds}`;
    let dateString = `${day} ${now.toLocaleString('default', { month: 'long' })} ${year}`;

    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);

setInterval(updateClock, 1000);
updateClock();
