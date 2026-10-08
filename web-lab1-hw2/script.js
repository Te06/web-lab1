const beatQueue = [];

function playSound(key) {
  const pad = document.querySelector(
    `.drum-pad[data-key="${key.toLowerCase()}"]`
  );

  if (!pad) return;

  const audio = new Audio(pad.dataset.sound);
  audio.play();
}

function recordBeat(key) {
  beatQueue.push({
    key: key.toLowerCase(),
    timestamp: Date.now()
  });
}

document.addEventListener("keydown", (event) => {
  if (event.repeat) return;

  const key = event.key.toLowerCase();

  const pad = document.querySelector(
    `.drum-pad[data-key="${key}"]`
  );

  if (!pad) return;

  playSound(key);
  recordBeat(key);
});