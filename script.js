(function(){
  const playlist = [
    { title: "Gone Away", artist: "Blue Beat Review", src: "songs/Gone Away - Blue Beat Review.mp3" },
    { title: "Lost Myself", artist: "Lalanne", src: "songs/Lost Myself - Lalanne.mp3" },
    { title: "Wait Too Long", artist: "Anno Domini Beats", src: "songs/Wait Too Long - Anno Domini Beats.mp3" },
    { title: "Wildfire", artist: "Jessie Villa", src: "songs/Wildfire - Jessie Villa.mp3" }
  ];

  let current = 0;
  let isPlaying = false;
  let autoplay = true;

  const audio = new Audio();
  audio.preload = "metadata";

  const els = {
    title: document.getElementById('songTitle'),
    artist: document.getElementById('songArtist'),
    playBtn: document.getElementById('playBtn'),
    playIcon: document.getElementById('playIcon'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    barTrack: document.getElementById('barTrack'),
    barFill: document.getElementById('barFill'),
    barThumb: document.getElementById('barThumb'),
    curTime: document.getElementById('curTime'),
    durTime: document.getElementById('durTime'),
    volSlider: document.getElementById('volSlider'),
    platter: document.getElementById('platter'),
    tonearm: document.getElementById('tonearm'),
    liveDot: document.getElementById('liveDot'),
    autoplayToggle: document.getElementById('autoplayToggle'),
    playlistItems: document.getElementById('playlistItems'),
    playlistCount: document.getElementById('playlistCount'),
  };

  const ICON_PLAY = '<path d="M8 5v14l11-7z"/>';
  const ICON_PAUSE = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';

  function formatTime(sec){
    if(!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ":" + String(s).padStart(2,'0');
  }

  function renderPlaylist(){
    els.playlistItems.innerHTML = "";
    playlist.forEach((track, i) => {
      const row = document.createElement('div');
      row.className = 'track' + (i === current ? ' active' : '');
      row.setAttribute('role','button');
      row.tabIndex = 0;

      const num = document.createElement('div');
      if(i === current && isPlaying){
        num.className = 'track-eq';
        num.innerHTML = '<span></span><span></span><span></span>';
      } else {
        num.className = 'track-num';
        num.textContent = String(i+1).padStart(2,'0');
      }

      const meta = document.createElement('div');
      meta.className = 'track-meta';
      meta.innerHTML = '<p class="t-title">'+track.title+'</p><p class="t-artist">'+track.artist+'</p>';

      const dur = document.createElement('div');
      dur.className = 't-dur';
      dur.textContent = track.duration ? formatTime(track.duration) : '--:--';

      row.append(num, meta, dur);
      row.addEventListener('click', () => loadTrack(i, true));
      row.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); loadTrack(i, true); } });

      els.playlistItems.appendChild(row);
    });
    els.playlistCount.textContent = playlist.length + (playlist.length === 1 ? ' track' : ' tracks');
  }

  function loadTrack(index, autoPlayNow){
    current = (index + playlist.length) % playlist.length;
    const track = playlist[current];
    audio.src = track.src;
    els.title.textContent = track.title;
    els.artist.textContent = track.artist;
    els.barFill.style.width = '0%';
    els.barThumb.style.left = '0%';
    els.curTime.textContent = '0:00';
    els.durTime.textContent = track.duration ? formatTime(track.duration) : '0:00';
    renderPlaylist();
    if(autoPlayNow){ play(); } else { updatePlayUI(false); }
  }

  function play(){
    audio.play().then(() => {
      isPlaying = true;
      updatePlayUI(true);
    }).catch(() => {
      isPlaying = false;
      updatePlayUI(false);
    });
  }

  function pause(){
    audio.pause();
    isPlaying = false;
    updatePlayUI(false);
  }

  function updatePlayUI(playing){
    els.playIcon.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
    els.playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    els.platter.classList.toggle('spinning', playing);
    els.tonearm.classList.toggle('down', playing);
    els.liveDot.classList.toggle('live', playing);
    renderPlaylist();
  }

  els.playBtn.addEventListener('click', () => { isPlaying ? pause() : play(); });
  els.nextBtn.addEventListener('click', () => loadTrack(current + 1, true));
  els.prevBtn.addEventListener('click', () => {
    if(audio.currentTime > 3){ audio.currentTime = 0; }
    else { loadTrack(current - 1, true); }
  });

  audio.addEventListener('timeupdate', () => {
    if(!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    els.barFill.style.width = pct + '%';
    els.barThumb.style.left = pct + '%';
    els.curTime.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    els.durTime.textContent = formatTime(audio.duration);
    playlist[current].duration = audio.duration;
    renderPlaylist();
  });

  audio.addEventListener('ended', () => {
    if(autoplay){
      loadTrack(current + 1, true);
    } else {
      pause();
    }
  });

  function seek(e){
    const rect = els.barTrack.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let pct = (clientX - rect.left) / rect.width;
    pct = Math.min(1, Math.max(0, pct));
    if(audio.duration){ audio.currentTime = pct * audio.duration; }
  }
  els.barTrack.addEventListener('click', seek);

  els.volSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
  });
  audio.volume = els.volSlider.value / 100;

  els.autoplayToggle.addEventListener('click', () => {
    autoplay = !autoplay;
    els.autoplayToggle.classList.toggle('active', autoplay);
    els.autoplayToggle.setAttribute('aria-pressed', String(autoplay));
  });
  els.autoplayToggle.classList.add('active');
  playlist.forEach((track, i) => {
    const a = new Audio();
    a.preload = 'metadata';
    a.src = track.src;
    a.addEventListener('loadedmetadata', () => {
      track.duration = a.duration;
      renderPlaylist();
    });
  });

  loadTrack(0, false);
})();