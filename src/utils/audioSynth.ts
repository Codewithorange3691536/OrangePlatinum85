/**
 * High-fidelity procedural audio generator for the slow-motion training reel.
 * Uses Web Audio API to generate an authentic athletic atmosphere:
 * - Sub-bass rhythmic heart cadence
 * - Filtered breath air/chalk sweep
 * - Deep harmonic metallic resonance
 */

class TrainingAtmosphereSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.4, this.ctx.currentTime + 1.2);
    this.masterGain.connect(this.ctx.destination);

    // Continuous sub drone (60Hz / 45Hz)
    const droneOsc = this.ctx.createOscillator();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(54, this.ctx.currentTime);

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    droneOsc.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.masterGain);
    droneOsc.start();

    // Rhythmic heart / kinetic pulse every 1.8s
    const triggerPulse = () => {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;
      const t = this.ctx.currentTime;

      // Deep barbell thud
      const kickOsc = this.ctx.createOscillator();
      kickOsc.type = 'triangle';
      kickOsc.frequency.setValueAtTime(80, t);
      kickOsc.frequency.exponentialRampToValueAtTime(32, t + 0.35);

      const kickGain = this.ctx.createGain();
      kickGain.gain.setValueAtTime(0.35, t);
      kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

      kickOsc.connect(kickGain);
      kickGain.connect(this.masterGain);
      kickOsc.start(t);
      kickOsc.stop(t + 0.55);

      // Breath / Chalk swoosh (filtered noise)
      const bufferSize = this.ctx.sampleRate * 0.4;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(450, t);
      noiseFilter.Q.setValueAtTime(2, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      whiteNoise.start(t);
      whiteNoise.stop(t + 0.45);
    };

    triggerPulse();
    this.intervalId = window.setInterval(triggerPulse, 1800);
  }

  public stop() {
    if (!this.isPlaying) return;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const trainingAudio = new TrainingAtmosphereSynth();
