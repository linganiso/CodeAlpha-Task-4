// Array of song objects containing title, artist, file path, and cover image
const songs = [
  { title: "Suicide Trumpet", artist: "Pro-Tee", file: "Pro-Tee-Suicide-Trumpet.mp3", cover: "Pro-Tee-Suicide-Trumpet-scaled.jpg" },
  { title: "The New Age Gqom", artist: "Pro-Tee", file: "Pro-Tee-The-New-Age-Gqom.mp3", cover: "Pro-Tee-Suicide-Trumpet-scaled.jpg" },
  { title: "Hope", artist: "Pro-Tee", file: "Pro-Tee-Hope-Gqom-Remix-.mp3", cover: "Pro-Tee-Hope-Gqom-Remix-scaled.jpg" },
  { title: "10111", artist: "Limit", file: "Limit-10111.mp3", cover: "Limit-10111-Mp3-Download-scaled.jpg" },
  { title: "I Mathematics", artist: "Limit", file: "Limit-I-Mathematics.mp3", cover: "Limit-I-Mathematics-scaled.jpg" }
];

// Function to create a playlist item
function createPlaylistItem(song, index) {
  const li = document.createElement('li');
  li.dataset.index = index; // Store the index in a data attribute
  li.innerHTML = `
    <img src="${song.cover}" alt="${song.title} Cover" class="cover">
    <div class="info">
      <span class="title">${song.title}</span>
      <span class="artist">${song.artist}</span>
    </div>
    <i class="fas fa-play"></i>
  `;
  return li;
}

// Populate the playlist
function populatePlaylist() {
  const playlist = document.getElementById('playlist');
  songs.forEach((song, index) => {
    const playlistItem = createPlaylistItem(song, index);
    playlist.appendChild(playlistItem);
  });
}

// Handle playlist item clicks
document.getElementById('playlist').addEventListener('click', (e) => {
  if (e.target.closest('li')) {
    const index = e.target.closest('li').dataset.index;
    window.localStorage.setItem('selectedSongIndex', index); // Save the selected song index
    window.location.href = 'player.html'; // Redirect to the player page
  }
});

// Populate the playlist on page load
window.addEventListener('load', populatePlaylist);
