export default class Ticker extends AudioContext {
  constructor({ onTick }) {
    super();
    this.tempo = 120;
    this.metre = 4;
    this.nextNoteTime = 0.0;
    this.stopPulse = null;
    this.onTick = onTick;
    this.beatCount = 0;
  }

  init() {
    this.nextNoteTime = this.currentTime;
    this.startPulse();
  }

  startPulse() {
    if (this.stopPulse) this.stopPulse();
    const interval = setInterval(() => this.pulse(), 100);

    this.stopPulse = async () => {
      clearInterval(interval);
      this.beatCount = 0;
    };
  }

  pulse() {
    while (this.nextNoteTime < this.currentTime + 0.1) {
      this.nextNoteTime += 60.0 / this.tempo;
      this.playTick();
      this.beatCount++;

      if (this.beatCount === this.metre) {
        this.beatCount = 0;
      }
    }
  }

  playTick() {
    const oscillator = this.createOscillator();
    oscillator.onended = this.onTick;
    oscillator.connect(this.destination);
    oscillator.frequency.value = this.beatCount % this.metre === 0 ? 500 : 450;
    oscillator.start(this.nextNoteTime);
    oscillator.stop(this.nextNoteTime + 0.15);
  }

  setTempo(tempo) {
    this.tempo = tempo;
  }

  setMetre(metre) {
    this.metre = metre;
  }
}
