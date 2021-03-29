export default class Ticker extends AudioContext {
  constructor({ onTick }) {
    super();
    this.tempo = 120;
    this.metre = 4;
    this.division = 1;
    this.nextNoteTime = 0.0;
    this.stopPulse = null;
    this.onTick = onTick;
    this.beatCount = 0;
    this.gainNode = this.createGain();
  }

  init() {
    this.gainNode.connect(this.destination);
    this.gainNode.gain.value = 0.2;
    this.nextNoteTime = this.currentTime;
    this.startPulse();
  }

  startPulse() {
    if (this.stopPulse) this.stopPulse();
    const interval = setInterval(() => this.pulse(), 100);

    this.stopPulse = () => {
      clearInterval(interval);
      this.beatCount = 0;
    };
  }

  pulse() {
    while (this.nextNoteTime < this.currentTime + 0.1) {
      this.nextNoteTime += (60.0 / this.tempo) * this.division;
      this.playTick();
      this.beatCount += this.division;

      if (this.beatCount === this.metre) {
        this.beatCount = 0;
      }
    }
  }

  playTick() {
    const oscillator = this.createOscillator();
    if (Number.isInteger(this.beatCount)) {
      oscillator.onended = this.onTick;
    }
    oscillator.connect(this.gainNode);
    oscillator.frequency.value = this.getFrequency();
    oscillator.start(this.nextNoteTime);
    oscillator.stop(this.nextNoteTime + 0.1);
  }

  setTempo(tempo) {
    this.tempo = tempo;
  }

  setMetre(metre) {
    this.metre = metre;
  }

  getFrequency() {
    if (this.beatCount % this.metre === 0) {
      return 550;
    } else if (Number.isInteger(this.beatCount)) {
      return 450;
    } else {
      return 350;
    }
  }
}
