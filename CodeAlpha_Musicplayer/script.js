const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlistUI = document.getElementById("playlist");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let songIndex = 0;

const songs = [
    {
        title: "music1",
        artist: "MassTamilan",
        src: "music/music1.mpeg"
    },
    {
        title: "music2",
        artist: "MassTamilan",
        src: "music/music2.mpeg"
    },
    {
        title: "music3",
        artist: "Local File",
        src: "music/music3.mpeg"
    }
];

function loadSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;
}

function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
}

// Progress update
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Autoplay next
audio.addEventListener("ended", nextSong);

// Playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => {
        songIndex = index;
        loadSong(songIndex);
        audio.play();
    };
    playlistUI.appendChild(li);
});

function formatTime(time) {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

// Initial load
loadSong(songIndex);
volume.value = 0.5;
audio.volume = 0.5;