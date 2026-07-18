const body = document.body;
  document.getElementById('themeToggle').addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    playThemeToggleSfx();
  });

  // --- translate ---
  // Languages are read straight from translations.js — add a new
  // language object there and it'll automatically join the cycle.
  const dict = window.translations || { en: {} };
  const availableLangs = Object.keys(dict);
  let currentLang = localStorage.getItem('lang');
  if(!availableLangs.includes(currentLang)) currentLang = 'en';
  let currentMoodKey = 'mood.idle'; // tracks which mood string is currently shown, so it re-translates too

  function t(key){
    const langDict = dict[currentLang] || {};
    if(langDict[key]) return langDict[key];
    return (dict.en && dict.en[key]) || key;
  }

  function applyTranslations(){
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = t(key);
      if(el.hasAttribute('data-i18n-html')){
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });
    const moodLineEl = document.getElementById('moodLine');
    if(moodLineEl) moodLineEl.textContent = t(currentMoodKey);
    const codeEl = document.getElementById('langCode');
    if(codeEl) codeEl.textContent = currentLang.toUpperCase();
  }

  function setMood(key){
    currentMoodKey = key;
    const moodLineEl = document.getElementById('moodLine');
    if(moodLineEl) moodLineEl.textContent = t(key);
  }

  const langToggle = document.getElementById('langToggle');
  langToggle.addEventListener('click', () => {
    const idx = availableLangs.indexOf(currentLang);
    currentLang = availableLangs[(idx + 1) % availableLangs.length];
    localStorage.setItem('lang', currentLang);
    applyTranslations();
    playClickSfx();
  });

  applyTranslations();

  const soundBtn = document.getElementById('soundToggle');
  const bgm = document.getElementById('bgm');
  soundBtn.addEventListener('click', () => {
    soundBtn.dataset.state = soundBtn.dataset.state === 'on' ? 'off' : 'on';
    if(soundBtn.dataset.state === 'off'){
      bgm.pause();
    } else {
      playSoundOnSfx();
    }
  });

  // --- sound effects (dock clicks / panel close / toggles) ---
  // Synthesized directly with the Web Audio API instead of loading audio files.
  // No file to fetch/decode means no lead-in gap and no delay before it plays.
  const sfxCtx = new (window.AudioContext || window.webkitAudioContext)();

  function ensureAudioRunning(){
    if(sfxCtx.state === 'suspended') sfxCtx.resume(); // browsers suspend the context until a user gesture
  }

  // cute upward "chirp" like a kitten's little mew — for opening a room
  function playClickSfx(){
    if(soundBtn.dataset.state !== 'on') return;
    ensureAudioRunning();
    const t = sfxCtx.currentTime;
    const osc = sfxCtx.createOscillator();
    const gain = sfxCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(720, t);
    osc.frequency.exponentialRampToValueAtTime(1500, t + 0.06);
    osc.frequency.exponentialRampToValueAtTime(1150, t + 0.12);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.22, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    osc.connect(gain);
    gain.connect(sfxCtx.destination);
    osc.start(t);
    osc.stop(t + 0.16);
  }

  // soft descending "paw-boop" — like a gentle paw tap closing the box lid
  function playCloseSfx(){
    if(soundBtn.dataset.state !== 'on') return;
    ensureAudioRunning();
    const t = sfxCtx.currentTime;
    const osc = sfxCtx.createOscillator();
    const gain = sfxCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(260, t + 0.11);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.2, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    osc.connect(gain);
    gain.connect(sfxCtx.destination);
    osc.start(t);
    osc.stop(t + 0.18);
  }

  // sparkly "cat magic" chime — a little ascending twinkle for the day/night toggle,
  // like the cat casting a small spell to swap the sun for the moon
  function playThemeToggleSfx(){
    if(soundBtn.dataset.state !== 'on') return;
    ensureAudioRunning();
    const t = sfxCtx.currentTime;
    const notes = [660, 880, 1320]; // little pentatonic-ish sparkle run
    notes.forEach((freq, i) => {
      const start = t + i * 0.07;
      const osc = sfxCtx.createOscillator();
      const gain = sfxCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.16, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
      osc.connect(gain);
      gain.connect(sfxCtx.destination);
      osc.start(start);
      osc.stop(start + 0.24);
    });
    // shimmering high overlay for a bit of "magic dust" sparkle
    const shimmer = sfxCtx.createOscillator();
    const shimmerGain = sfxCtx.createGain();
    shimmer.type = 'triangle';
    shimmer.frequency.setValueAtTime(2400, t);
    shimmer.frequency.exponentialRampToValueAtTime(3400, t + 0.32);
    shimmerGain.gain.setValueAtTime(0.0001, t);
    shimmerGain.gain.exponentialRampToValueAtTime(0.04, t + 0.05);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.36);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(sfxCtx.destination);
    shimmer.start(t);
    shimmer.stop(t + 0.38);
  }

  // friendly little "mrow?" — plays when sound gets turned ON, like the cat perking
  // up its ears the moment it can be heard again
  function playSoundOnSfx(){
    ensureAudioRunning();
    const t = sfxCtx.currentTime;
    const osc = sfxCtx.createOscillator();
    const gain = sfxCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(660, t + 0.08);
    osc.frequency.exponentialRampToValueAtTime(520, t + 0.18);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.24, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    osc.connect(gain);
    gain.connect(sfxCtx.destination);
    osc.start(t);
    osc.stop(t + 0.24);
  }

  // bright wooden mallet-strike — plays kolintang notes (traditional Indonesian
  // bamboo/wood gong-chime) climbing the scale low to high as the pointer enters
  // each chip, looping back to the lowest note after the top
  const kolintangScale = [349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46]; // F pentatonic-ish run, mid register, low → high
  let kolintangIndex = 0;
  function playKolintangNoteSfx(){
    if(soundBtn.dataset.state !== 'on') return;
    ensureAudioRunning();
    const t = sfxCtx.currentTime;
    const freq = kolintangScale[kolintangIndex];
    kolintangIndex = (kolintangIndex + 1) % kolintangScale.length;

    // fundamental — fast mallet attack, woody decay
    const osc = sfxCtx.createOscillator();
    const gain = sfxCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.22, t + 0.004); // sharp strike attack
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    osc.connect(gain);
    gain.connect(sfxCtx.destination);
    osc.start(t);
    osc.stop(t + 0.45);

    // bright overtone slightly above the fundamental, decaying faster —
    // gives it that hollow wooden-bar "clack" instead of a pure piano tone
    const overtone = sfxCtx.createOscillator();
    const overtoneGain = sfxCtx.createGain();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2.76, t); // inharmonic ratio, typical of struck wooden bars
    overtoneGain.gain.setValueAtTime(0.0001, t);
    overtoneGain.gain.exponentialRampToValueAtTime(0.09, t + 0.003);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    overtone.connect(overtoneGain);
    overtoneGain.connect(sfxCtx.destination);
    overtone.start(t);
    overtone.stop(t + 0.18);
  }

  document.querySelectorAll('.chip-row .chip').forEach(chip => {
    chip.addEventListener('mouseenter', playKolintangNoteSfx);
  });

  const moodLine = document.getElementById('moodLine');

  // --- wandering cat ---
  const yard = document.getElementById('yard');
  const cat = document.getElementById('catCritter');
  const catFlip = cat.querySelector('.cat-flip');
  let wandering = false;
  let wanderTimer = null;
  const CAT_W = 78, CAT_H = 66;

  function restPosition(){
    const yardW = yard.clientWidth, yardH = yard.clientHeight;
    return { x: yardW / 2 - CAT_W / 2, y: yardH - CAT_H - 6 };
  }

  function placeCat(x, y){
    const prevLeft = parseFloat(cat.style.left || restPosition().x);
    cat.style.left = x + 'px';
    cat.style.top = y + 'px';
    if(x > prevLeft + 2){ catFlip.classList.add('face-right'); }
    else if(x < prevLeft - 2){ catFlip.classList.remove('face-right'); }
  }

  function goRest(){
    const r = restPosition();
    placeCat(r.x, r.y);
  }

  let pacingRight = true;
  const bowl = document.getElementById('foodBowl');
  const PATROL_LAPS = 3; // how many left-right laps before heading to dinner

  let sequenceActive = false;
  let patrolCount = 0;

  // --- eyes follow the pointer, only while resting in the house ---
  const eyePupils = cat.querySelectorAll('.eye-open.face-normal');
  const MAX_PUPIL_SHIFT = 1.7; // in SVG viewBox units — subtle, not googly-eyed

  function catIsIdleAtHome(){
    return !sequenceActive && !cat.classList.contains('surprised');
  }

  function resetEyes(){
    eyePupils.forEach(eye => eye.setAttribute('transform', 'translate(0,0)'));
  }

  function updateEyes(clientX, clientY){
    if(!catIsIdleAtHome()){ return; }
    const rect = cat.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let dx = clientX - centerX;
    let dy = clientY - centerY;
    if(catFlip.classList.contains('face-right')){ dx = -dx; } // account for the mirrored SVG
    const dist = Math.hypot(dx, dy) || 1;
    const nx = (dx / dist) * MAX_PUPIL_SHIFT;
    const ny = (dy / dist) * MAX_PUPIL_SHIFT;
    eyePupils.forEach(eye => eye.setAttribute('transform', `translate(${nx.toFixed(2)},${ny.toFixed(2)})`));
  }

  window.addEventListener('pointermove', (e) => updateEyes(e.clientX, e.clientY));

  function patrolStep(){
    if(!sequenceActive) return;
    if(patrolCount >= PATROL_LAPS){
      goToBowl();
      return;
    }
    const yardW = yard.clientWidth;
    const margin = 4;
    const groundY = restPosition().y;
    const leftX = margin;
    const rightX = yardW - CAT_W - margin;
    const x = pacingRight ? rightX : leftX;
    pacingRight = !pacingRight;
    patrolCount++;
    const prevLeft = parseFloat(cat.style.left || x);
    const dist = Math.abs(x - prevLeft);
    const duration = Math.min(3, Math.max(0.8, dist / 55));
    cat.style.transitionDuration = duration + 's, ' + duration + 's';
    placeCat(x, groundY);
    wanderTimer = setTimeout(patrolStep, duration * 1000 + 600);
  }

  function goToBowl(){
    wandering = false;
    cat.classList.remove('wandering');
    const yardW = yard.clientWidth;
    const bowlX = yardW - CAT_W - 40;
    const groundY = restPosition().y;
    const prevLeft = parseFloat(cat.style.left || 0);
    const dist = Math.abs(bowlX - prevLeft);
    const duration = Math.min(2, Math.max(0.6, dist / 55));
    cat.style.transitionDuration = duration + 's, ' + duration + 's';
    placeCat(bowlX, groundY);
    setMood('mood.dinner');
    wanderTimer = setTimeout(() => {
      cat.classList.add('eating');
      wanderTimer = setTimeout(() => {
        bowl.classList.add('eaten');
        wanderTimer = setTimeout(startSleep, 1100);
      }, 1300);
    }, duration * 1000 + 150);
  }

  function startSleep(){
    if(!sequenceActive) return;
    cat.classList.remove('eating');
    cat.classList.add('sleeping');
    setMood('mood.asleep');
    if(soundBtn.dataset.state === 'on'){
      bgm.currentTime = 0;
      bgm.play().catch(() => {}); // browsers block autoplay until a user gesture — a click counts, so this is safe
    }
  }

  function startSequence(){
    sequenceActive = true;
    wandering = true;
    patrolCount = 0;
    pacingRight = true;
    cat.classList.remove('eating', 'sleeping');
    cat.classList.add('wandering');
    bowl.classList.remove('eaten');
    bowl.classList.add('show');
    setMood('mood.patrol');
    resetEyes();
    patrolStep();
  }

  function stopSequence(){
    sequenceActive = false;
    wandering = false;
    clearTimeout(wanderTimer);
    cat.classList.remove('wandering', 'eating', 'sleeping');
    bowl.classList.remove('show', 'eaten');
    bgm.pause();
    cat.style.transitionDuration = '0.9s, 0.9s';
    goRest();
    setMood('mood.idle');
  }

  let surpriseTimer = null;
  function startleCat(){
    cat.classList.add('surprised');
    resetEyes();
    clearTimeout(surpriseTimer);
    surpriseTimer = setTimeout(() => cat.classList.remove('surprised'), 480);
  }

  function unlockBgm(){
    // Mobile browsers only allow <audio>.play() during/right after a user
    // gesture. startSleep() fires several setTimeout()s after the tap, so by
    // then the gesture is gone and play() is silently blocked there. Priming
    // it here (muted, played, immediately paused) inside the actual click
    // handler "unlocks" the element so the later real play() succeeds.
    bgm.muted = true;
    bgm.play().then(() => {
      bgm.pause();
      bgm.currentTime = 0;
      bgm.muted = false;
    }).catch(() => { bgm.muted = false; });
  }

  cat.addEventListener('click', () => {
    startleCat();
    unlockBgm();
    if(sequenceActive){
      stopSequence();
    } else {
      startSequence();
    }
  });

  // place the cat at rest once layout is ready
  window.addEventListener('load', goRest);
  window.addEventListener('resize', () => { if(!wandering && !sequenceActive) goRest(); });

  document.querySelectorAll('.dock button').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSfx();
      document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
      document.querySelectorAll('.dock button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      playCloseSfx();
      const ov = btn.closest('.overlay');
      ov.classList.remove('active');
      resetPanelPosition(ov.querySelector('.panel'));
      document.querySelectorAll('.dock button').forEach(b => b.classList.remove('active'));
    });
  });
  document.querySelectorAll('.overlay').forEach(ov => {
    ov.addEventListener('click', (e) => {
      if(e.target === ov){
        ov.classList.remove('active');
        resetPanelPosition(ov.querySelector('.panel'));
        document.querySelectorAll('.dock button').forEach(b => b.classList.remove('active'));
      }
    });
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      document.querySelectorAll('.overlay.active').forEach(ov => {
        ov.classList.remove('active');
        resetPanelPosition(ov.querySelector('.panel'));
      });
      document.querySelectorAll('.dock button').forEach(b => b.classList.remove('active'));
    }
  });

  // --- draggable rooms ---
function resetPanelPosition(panel){
  panel.style.position = '';
  panel.style.left = '';
  panel.style.top = '';
  panel.style.margin = '';
  panel.style.transform = '';
}

document.querySelectorAll('.panel').forEach(panel => {
  const handle = panel.querySelector('.panel-header');
  if(!handle) return;

  let dragging = false, offsetX = 0, offsetY = 0;

  function startDrag(e){
    // ignore drag if it started on the close button
    if(e.target.closest('[data-close]')) return;
    dragging = true;
    panel.classList.add('dragging');
    const rect = panel.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    offsetX = point.clientX - rect.left;
    offsetY = point.clientY - rect.top;

    panel.style.position = 'fixed';
    panel.style.left = rect.left + 'px';
    panel.style.top = rect.top + 'px';
    panel.style.margin = '0';
    panel.style.transform = 'none';

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, { passive:false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    e.preventDefault();
  }

  function onDrag(e){
    if(!dragging) return;
    e.preventDefault();
    const point = e.touches ? e.touches[0] : e;
    let x = point.clientX - offsetX;
    let y = point.clientY - offsetY;
    const maxX = window.innerWidth - panel.offsetWidth;
    const maxY = window.innerHeight - panel.offsetHeight;
    x = Math.min(Math.max(0, x), Math.max(0, maxX));
    y = Math.min(Math.max(0, y), Math.max(0, maxY));
    panel.style.left = x + 'px';
    panel.style.top = y + 'px';
  }

  function endDrag(){
    dragging = false;
    panel.classList.remove('dragging');
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
  }

  handle.addEventListener('mousedown', startDrag);
  handle.addEventListener('touchstart', startDrag, { passive:false });
});

  // scatter faint paw prints in the background
  const pawSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="15" r="4"/><circle cx="6" cy="9" r="2.2"/><circle cx="18" cy="9" r="2.2"/><circle cx="8.5" cy="5" r="1.8"/><circle cx="15.5" cy="5" r="1.8"/></svg>';
  const pawsContainer = document.getElementById('paws');
  const positions = [[6,12,10],[88,20,-15],[14,78,20],[80,82,-8],[46,6,8],[92,55,15]];
  positions.forEach(([left, top, rot]) => {
    const div = document.createElement('div');
    div.innerHTML = pawSvg;
    div.style.left = left + '%';
    div.style.top = top + '%';
    div.style.transform = 'rotate(' + rot + 'deg)';
    div.querySelector('svg').style.width = '100%';
    div.querySelector('svg').style.height = '100%';
    div.style.position = 'absolute';
    div.style.width = '30px';
    div.style.height = '30px';
    pawsContainer.appendChild(div);
  })