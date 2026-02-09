let context = new AudioContext();
let stream = null // MediaStream
let isRecording = false; // boolean
let animationId = null // number | null

var numToLetters = {
    1: 'C',
    2: 'C#',
    3: 'D',
    4: 'D#',
    5: 'E',
    6: 'F',
    7: 'F#',
    8: 'G',
    9: 'G#',
    10: 'A',
    11: 'A#',
    12: 'B',
}

export function toggleRecording() {
  isRecording = !isRecording
  if (context.state !== 'running') startContext()
  isRecording ? startRecording() : stopRecording()
}

async function startRecording() {
  const newStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  })
  stream = newStream

  const source = context.createMediaStreamSource(newStream)
  const analyzer = context.createAnalyser()
  analyzer.fftSize = 2048
  source.connect(analyzer)
  console.log("recording")
  animationId = updateVisual(analyzer)
}

function updateVisual(analyzer) {
  const buffer = new Float32Array(analyzer.fftSize)
  analyzer.getFloatTimeDomainData(buffer)

  const pitch = autoCorrelate(buffer, context.sampleRate)

  if (pitch !== -1) {
    console.log("Tune:", numToLetters[Math.round(freqToNote(pitch) % 12)])
    changeInputValue(numToLetters[Math.round(freqToNote(pitch) % 12)]);
  }

  animationId = requestAnimationFrame(() => updateVisual(analyzer))
}

function stopRecording() {
  stream.getTracks().forEach(s => s.stop())
  stream = null
  cancelAnimationFrame(animationId)
  animationId = null
  document.getElementById("soundBar").style.width = 0
}

function autoCorrelate(buffer, sampleRate) {
  let SIZE = buffer.length
  let rms = 0

  for (let i = 0; i < SIZE; i++) {
    rms += buffer[i] * buffer[i]
  }
  rms = Math.sqrt(rms / SIZE)

  // Ignore silence
  if (rms < 0.01) return -1

  let r1 = 0, r2 = SIZE - 1
  const threshold = 0.2

  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < threshold) {
      r1 = i
      break
    }
  }

  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < threshold) {
      r2 = SIZE - i
      break
    }
  }

  buffer = buffer.slice(r1, r2)
  SIZE = buffer.length

  const c = new Array(SIZE).fill(0)

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
      c[i] += buffer[j] * buffer[j + i]
    }
  }

  let d = 0
  while (c[d] > c[d + 1]) d++

  let maxval = -1
  let maxpos = -1
  for (let i = d; i < SIZE; i++) {
    if (c[i] > maxval) {
      maxval = c[i]
      maxpos = i
    }
  }

  return sampleRate / maxpos
}

function freqToNote(freq) {
  const noteNum = 12 * (Math.log(freq / 440) / Math.log(2)) + 69
  return Math.round(noteNum)
}


function changeInputValue(tempo) {
  var inputElement = document.getElementById("myText");
  if (tempo != undefined)
    inputElement.value = tempo;
}

async function startContext() {
  await context.resume()
}