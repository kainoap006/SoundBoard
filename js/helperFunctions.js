let audioCurrentlyPlaying = null;

export function play_sound(clicked_id) {
  if (audioCurrentlyPlaying) {
    audioCurrentlyPlaying.pause();
    audioCurrentlyPlaying.currentTime = 0;
  }

  audioCurrentlyPlaying = new Audio(`assets/sounds/${clicked_id}.mp3`);
  console.log(`${clicked_id}.mp3`);
  audioCurrentlyPlaying.play();
}


let tempo;
let previousTime = new Date();;

export function find_tempo() {
    const now = new Date();
    const timeDifference = now - previousTime;
    if (timeDifference < 1000) {
      const seconds = timeDifference / 1000;
      tempo = 1 / seconds * 60;
      changeInputValue(tempo);
    }
    previousTime = now;
}

function changeInputValue(tempo) {
  var inputElement = document.getElementById("myText");
  inputElement.value = Math.round(tempo);
}