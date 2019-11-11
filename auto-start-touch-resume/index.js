const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const request = new XMLHttpRequest();
const url = 'https://zprodev.github.io/web-audio-test/assets/Campfire_Song.mp3';
request.open('GET', url, true);
request.responseType = 'arraybuffer';
request.onload =  () => {
  ctx.decodeAudioData(request.response, (audioBuffer) => {
    const audioSource = ctx.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.connect(ctx.destination);
    audioSource.start();
  });
}
request.send();

const eventName = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';
document.addEventListener(eventName, initAudioContext);
function initAudioContext(){
  document.removeEventListener(eventName, initAudioContext);
  // wake up AudioContext
  ctx.resume();
}
