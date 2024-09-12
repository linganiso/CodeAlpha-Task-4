// Select audio element from the DOM
const audio = document.getElementById('audio');

// Select control buttons from the DOM
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const repeatButton = document.getElementById('repeat');
const volumeButton = document.getElementById('volume');
const moreOptionsButton = document.querySelector('.more-options');

// Select song information elements from the DOM
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');

// Select the progress container and progress bar elements from the DOM
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');

// Select the time elements from the DOM
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Array of song objects containing title, artist, file path, and cover image
const songs = [
  { title: "Suicide Trumpet", artist: "Pro-Tee", file: "Pro-Tee-Suicide-Trumpet.mp3", cover: "Pro-Tee-Suicide-Trumpet-scaled.jpg" },
  { title: "The New Age Gqom", artist: "Pro-Tee", file: "Pro-Tee-The-New-Age-Gqom.mp3", cover: "Pro-Tee-Suicide-Trumpet-scaled.jpg" },
  { title: "Hope", artist: "Pro-Tee", file: "Pro-Tee-Hope-Gqom-Remix-.mp3", cover: "Pro-Tee-Hope-Gqom-Remix-scaled.jpg" },
  { title: "10111", artist: "Limit", file: "Limit-10111.mp3", cover: "Limit-10111-Mp3-Download-scaled.jpg" },
  { title: "I Mathematics", artist: "Limit", file: "Limit-I-Mathematics.mp3", cover: "Limit-I-Mathematics-scaled.jpg" }
];

// Index to keep track of the current song being played
let songIndex = 0;
let isRepeating = false;

// Function to load a song's details (title, artist, file, cover) into the player
function loadSong(song) {
  title.textContent = song.title; // Set the song title
  artist.textContent = song.artist; // Set the artist name
  audio.src = song.file; // Set the audio file source
  cover.src = song.cover; // Set the cover image source
  audio.load(); // Reload the audio element to update the source
}

// Function to play the current song
function playSong() {
  audio.play(); // Start playing the audio
  playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
}

// Function to pause the current song
function pauseSong() {
  audio.pause(); // Pause the audio
  playButton.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
}

// Function to format time from seconds to MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60);
  return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`; // Format with leading zero
}

// Function to toggle volume mute/unmute
function toggleVolume() {
  if (audio.muted) {
    audio.muted = false;
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    audio.muted = true;
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

// Function to toggle repeat
function toggleRepeat() {
  isRepeating = !isRepeating;
  repeatButton.classList.toggle('active', isRepeating);
}

// Event listener for the play button
playButton.addEventListener('click', () => {
  if (audio.paused) { // If the audio is paused
    playSong(); // Call the function to play the song
  } else { // If the audio is playing
    pauseSong(); // Call the function to pause the song
  }
});

// Event listener for the previous button
prevButton.addEventListener('click', () => {
  // Decrement songIndex to go to the previous song, using modulus to wrap around
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]); // Load the new song
  playSong(); // Play the new song
});

// Event listener for the next button
nextButton.addEventListener('click', () => {
  // Increment songIndex to go to the next song, using modulus to wrap around
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]); // Load the new song
  playSong(); // Play the new song
});

// Event listener for the volume button
volumeButton.addEventListener('click', toggleVolume);

// Event listener for the repeat button
repeatButton.addEventListener('click', toggleRepeat);

// Event listener to update the progress bar and time as the audio plays
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100; // Calculate progress percentage
  progress.style.width = `${progressPercent}%`; // Set the width of the progress bar

  // Update the current time display
  currentTimeEl.textContent = formatTime(audio.currentTime);

  // Update the duration display when the metadata is loaded
  if (audio.duration) {
    durationEl.textContent = formatTime(audio.duration);
  }
});

// Event listener to seek the audio when clicking on the progress bar
progressContainer.addEventListener('click', (e) => {
  const progressWidth = progressContainer.clientWidth;
  const clickX = e.offsetX; // Get the X coordinate of the click
  const newTime = (clickX / progressWidth) * audio.duration; // Calculate new time
  audio.currentTime = newTime; // Update the current time of the audio
});

// Event listener for the more options button
moreOptionsButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Redirect to the playlist page
});

// Event listener to handle when a song ends
audio.addEventListener('ended', () => {
  if (isRepeating) {
    audio.currentTime = 0; // Restart the song if repeating
    playSong(); // Play the song again
  } else {
    // Move to the next song
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]); // Load the new song
    playSong(); // Play the new song
  }
});

// Initial load of the first song or selected song
function initializePlayer() {
  const savedIndex = window.localStorage.getItem('selectedSongIndex');
  if (savedIndex !== null) {
    songIndex = parseInt(savedIndex, 10); // Get the selected song index from local storage
  }
  loadSong(songs[songIndex]); // Load the song at songIndex
  playSong(); // Play the song
}

// Call initializePlayer on page load
window.addEventListener('load', initializePlayer);
