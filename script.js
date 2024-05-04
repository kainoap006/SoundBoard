function play_sound(clicked_id) {
    var audio = new Audio("sounds/" + clicked_id + ".mp3");
    audio.play();
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
    play_sound("Another Banger");
  }
  if (keyCode === 'Digit5') {
    play_sound("Ruh Roh Raggy");
  }
});2