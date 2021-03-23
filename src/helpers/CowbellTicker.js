export default class Ticker {
  constructor(audioCtx) {
    this.audioCtx = audioCtx;
    this.tempo = 60;
    this.metre = 4;
    this.beatCount = 0;
    this.nextNoteTime = 0.0;
  }

  startPulse() {
    while (this.nextNoteTime < this.audioCtx.currentTime + 0.2) {
      this.playTick();
    }
    setTimeout(() => this.startPulse(), (60 / this.tempo) * 1000);
  }

  playTick() {
    const oscillator = this.audioCtx.createOscillator();
    oscillator.connect(this.audioCtx.destination);
    oscillator.frequency.value = this.beatCount % this.metre === 0 ? 500 : 400;
    oscillator.start(this.nextNoteTime.current);
    oscillator.stop(this.nextNoteTime.current + 0.1);
    this.nextNoteTime.current += 60.0 / this.tempo;
  }

  nextNote() {
    const secondsPerBeat = 60.0 / this.tempo;

    this.nextNoteTime += secondsPerBeat;

    this.beatCount++;
    if (this.beatCount === 4) {
      this.beatCount = 0;
    }
  }
}
