export default class Ticker extends AudioContext {
  constructor() {
    super();
    this.metre = 4;
    this.beatCount = 0;
    this.nextNoteTime = 0.0;
    this.stopPulse = null;
  }

  startPulse(tempo, metre) {
    this.tempo = tempo;
    this.metre = metre;
    if (this.stopPulse) this.stopPulse();
    const interval = setInterval(() => this.pulse(), (60 / tempo) * 1000);

    this.stopPulse = () => {
      clearInterval(interval);
      this.beatCount = 0;
      this.nextNoteTime = 0;
    };
  }

  pulse() {
    while (this.nextNoteTime < this.currentTime + 0.2) {
      this.nextNoteTime += 60.0 / this.tempo;
      this.playTick();
      this.beatCount++;
    }
  }

  playTick() {
    const oscillator = this.createOscillator();
    oscillator.connect(this.destination);
    oscillator.frequency.value = this.beatCount % this.metre === 1 ? 500 : 450;
    oscillator.start(this.nextNoteTime);
    oscillator.stop(this.nextNoteTime + 0.15);
  }
}
