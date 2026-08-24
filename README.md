# 🎵 Turntable Music Player

A modern, visually engaging music player built with **HTML, CSS, and JavaScript** — packed into a single self-contained file. The project features a turntable-inspired design with a spinning vinyl record, a lifting tonearm, a playlist, playback controls, progress tracking, and volume control.

## 📸 Preview

The player features a dark, elegant interface inspired by a classic vinyl turntable — warm gold and plum tones, a serif display font for the track title, and a vinyl disc that spins (with the tonearm dropping into place) whenever a song is playing.

## ✨ Features

* ▶️ Play and pause functionality
* ⏮️ Previous track (restarts the current song if played more than 3 seconds in, jumps back a track otherwise)
* ⏭️ Next track
* 🎵 Playlist support with click-to-play tracks
* 📀 Turntable-inspired UI — spinning vinyl record and animated tonearm
* ⏱️ Clickable, seekable progress bar
* ⌛ Live current time and total duration display, read from each track's own audio metadata
* 🔊 Volume control slider
* 🔁 Autoplay toggle — automatically advances to the next track when one ends
* 🎶 Active track highlighting with an animated equalizer icon in the playlist
* ✨ Smooth transitions and interactive hover/focus states
* 📱 Responsive design, down to mobile

## 🛠️ Technologies Used

* **HTML5** – Structure of the music player and the native `<audio>` element
* **CSS3** – Styling, animations (spinning record, tonearm, equalizer bars), layout, and responsive design
* **JavaScript** – Audio playback control, playlist rendering, progress tracking, seek/volume handling, and autoplay logic

## 📂 Project Structure

This project is built as a single self-contained HTML file — all CSS and JavaScript are embedded inline, so there are no separate stylesheet or script files to manage.

```text
music-player/ │
├── index.html
├── style.css
├── script.js │
├── songs/
│ ├── song1.mp3
│ ├── song2.mp3
│ └── ...
│
├── images/
│ └── ...
│
└── README.md
```

> Song audio is currently loaded from external URLs rather than local files. If you swap in your own MP3s, you can add a local `audio/` folder and update the `src` values in the `playlist` array inside `music-player.html` to point to it, e.g. `audio/song1.mp3`.

## 🚀 How to Run the Project

1. Clone this repository:
```bash
git clone https://github.com/your-username/your-repository-name.git
```
2. Navigate to the project folder.
3. Open `music-player.html` directly in your browser — no build step or server required.

For the best development experience, you can also use the **Live Server** extension in Visual Studio Code.

## 🎮 Controls

| Control       | Function                                   |
| ------------- | ------------------------------------------- |
| ▶️ Play       | Starts the current song                     |
| ⏸️ Pause      | Pauses the current song                     |
| ⏮️ Previous   | Restarts current song, or jumps to the previous track |
| ⏭️ Next       | Plays the next track                        |
| Progress Bar  | Click anywhere to seek to that point in the song |
| 🔊 Volume     | Adjusts the audio volume via slider         |
| Autoplay      | Toggle on/off — automatically continues to the next track |
| Playlist Item | Click any track to load and play it directly |

## 🎯 Project Objective

The purpose of this project was to practice building an interactive web application using JavaScript while focusing on both functionality and visual design.

Key concepts explored include:

* JavaScript DOM manipulation
* HTML5 Audio API (`play`, `pause`, `timeupdate`, `loadedmetadata`, `ended`)
* Event listeners and user interaction handling
* Dynamic playlist rendering from a data array
* Updating UI based on application state (playing/paused, active track)
* Progress and duration tracking
* Volume control
* Responsive, mobile-first CSS
* UI/UX and visual design principles (typography, color, motion)

## 📱 Responsive Design

The music player is designed to provide a smooth experience across different screen sizes, including:

* 💻 Desktop
* 📟 Tablet
* 📱 Mobile devices

## 💡 Future Improvements

* Add shuffle functionality
* Add repeat/loop-single-track functionality
* Add album artwork for each song
* Add a music search feature
* Add keyboard shortcuts (space to play/pause, arrow keys to seek)
* Add multiple playlists
* Save the last played song and volume using local storage
* Add dark/light theme options

## 👩‍💻 Author

**Hamna Sajjad**

## 📄 License & Copyright

Copyright © 2026 Hamna Sajjad. All Rights Reserved.

This project was developed by Hamna Sajjad as part of a frontend development internship.

---
