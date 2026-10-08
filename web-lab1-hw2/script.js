function playSound(key) {
  const pad = document.querySelector(
    `.drum-pad[data-key="${key.toLowerCase()}"]`
  );

  if (!pad) return;

  const audio = new Audio(pad.dataset.sound);
  audio.play();
}

document.addEventListener("keydown", (event) => {
  if (event.repeat) return;

  playSound(event.key);
});