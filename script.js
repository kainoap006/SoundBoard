let audioCurrentlyPlaying;

function play_sound(clicked_id) {
    if (audioCurrentlyPlaying != null) {
      audioCurrentlyPlaying.pause();
      audioCurrentlyPlaying.currentTime = 0;
    }
    audioCurrentlyPlaying = new Audio("sounds/" + clicked_id + ".mp3");
    audioCurrentlyPlaying.play();
}

let tempo;
let previousTime = new Date();;

function find_tempo(clicked_id) {
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

document.addEventListener('keypress', (event) => {
  var keyCode = event.code;
  if (keyCode === 'Digit1') {
      play_sound("applause");
  }
  if (keyCode === 'Digit2') {
      play_sound("RIZZ");
  }
  if (keyCode === 'Digit3') {
      play_sound("china");
  }
  if (keyCode === 'Digit4') {
    play_sound("Banger");
  }
  if (keyCode === 'Digit5') {
    play_sound("Crossaint");
  }
});