// ! JavaScript for Clonify
// Made and maintained by github.com/Arpan-Saha-25
console.log("Welcome to Clonify");

// * Initialize the Variables
let songIndex = 0;

let audioElement = new Audio('songs/1.mp3');

let masterPlay = document.getElementById('masterPlay');

let masterSongname = document.getElementById("masterSongname");

let myProgressBar = document.getElementById('myProgressBar');

let gif = document.getElementById("gif");

let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Warriyo - Mortals (feat. Laura Brehm) | Future Trap", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "NCS - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "NCS - My heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "NCS - Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Cartoon, Jéja - On & On (feat. Daniel Levi)", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Halvorsen - Shoulders of Giants  Complextro 7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Mangoo, B3nte - Perfection (feat. Derek Cate)", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Rameses B - i want u  DnB", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "springs! - Magnetic  Pluggnb", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// * Set song cover images and titles
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// * Update play/pause listeners after elements are created
const updatePlayPauseListeners = () => {
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllPlaysPause();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterSongname.innerText = songs[songIndex].songName;
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            updateSongItemPlayIcon();
        });
    });
};

// * Add song durations and play icons
let timestamps = Array.from(document.getElementsByClassName("timestamp"));
timestamps.forEach((element, i) => {
    let audioNewElement = new Audio(songs[i].filePath);

    audioNewElement.addEventListener("loadedmetadata", () => {
        let duration = Math.floor(audioNewElement.duration);
        element.innerHTML = `${Math.floor(duration / 60)}:${("0" + (duration % 60)).slice(-2)} ` +
            `<i id="${i}" class="fa-regular songitemPlay fa-circle-play"></i>`;

        // Attach play/pause listeners after each icon is added
        updatePlayPauseListeners();
    });
});

// * Handle master play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        updateSongItemPlayIcon();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        updateSongItemPlayIcon();
    }
});

// * Update progress bar and seek functionality
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('click', (e) => {
    const clickPosition = e.offsetX; // Get the click position relative to the progress bar
    const progressBarWidth = myProgressBar.clientWidth; // Get the full width of the progress bar

    const clickedValue = (clickPosition / progressBarWidth) * 100; // Calculate the percentage clicked
    audioElement.currentTime = (clickedValue * audioElement.duration) / 100; // Update the song's current time
});

// * Change song automatically at the end
audioElement.addEventListener('ended', () => {
    songIndex = songIndex >= songs.length - 1 ? 0 : songIndex + 1; // If the index is out of range, it becomes 0 ; else incremented
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    myProgressBar.value = 0; // Reset progress bar to 0
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makeAllPlaysPause();
    updateSongItemPlayIcon();
});

// * Function to update all songItemPlay icons to the play state
const updateSongItemPlayIcon = () => {
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element, i) => {
        if (i === songIndex) {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        } else {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    });
};

// * Reset all play icons to play state
const makeAllPlaysPause = () => {
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// * Handle next and previous buttons
document.getElementById("next").addEventListener("click", () => {
    songIndex = songIndex >= songs.length - 1 ? 0 : songIndex + 1;
    gif.style.opacity = 1;
    updateSongItemPlayIcon();
    playSong();
});

document.getElementById("previous").addEventListener("click", () => {
    songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
    gif.style.opacity = 1;
    updateSongItemPlayIcon();
    playSong();
});

const playSong = () => {
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
};


// * Volume Adjustments
const volumeControl = document.getElementById("volume-control");
const volIcon = document.querySelector(".volume .fa-volume-high");

volumeControl.addEventListener("input", (event) => {
    // Set audio volume
    audioElement.volume = event.target.value;

    // Change icon based on volume level
    if (audioElement.volume <= 0) {
        volIcon.classList.remove("fa-volume-high");
        volIcon.classList.add("fa-volume-xmark");
    } else if (audioElement.volume > 0 && audioElement.volume <= 0.5) {
        volIcon.classList.remove("fa-volume-high", "fa-volume-xmark");
        volIcon.classList.add("fa-volume-low");
    } else {
        volIcon.classList.remove("fa-volume-xmark", "fa-volume-low");
        volIcon.classList.add("fa-volume-high");
    }
});

