/** Lightweight procedural SFX via Web Audio — no asset files required. */

type SoundName = 'shoot' | 'hit' | 'planetHit' | 'select' | 'reset' | 'ui';

const STORAGE_KEY = 'space-audio-muted';

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let muted = typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1';
let thrusterGain: GainNode | null = null;
let thrusterOsc: OscillatorNode | null = null;
let thrusterNoise: AudioBufferSourceNode | null = null;
let thrusterRunning = false;

const ensureContext = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new Ctx();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = muted ? 0 : 0.55;
    masterGain.connect(audioCtx.destination);
  }

  return audioCtx;
};

export const unlockSpaceAudio = async () => {
  const ctx = ensureContext();
  if (!ctx) {
    return;
  }
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
};

export const isSpaceAudioMuted = () => muted;

export const setSpaceAudioMuted = (next: boolean) => {
  muted = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
  } catch {
    // ignore quota / private mode
  }
  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(next ? 0 : 0.55, audioCtx.currentTime, 0.03);
  }
};

const noiseBuffer = (ctx: AudioContext, seconds = 0.2) => {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

const playTone = (
  ctx: AudioContext,
  {
    frequency,
    endFrequency,
    type = 'square',
    duration = 0.12,
    gain = 0.12,
    attack = 0.005,
    filterFreq
  }: {
    frequency: number;
    endFrequency?: number;
    type?: OscillatorType;
    duration?: number;
    gain?: number;
    attack?: number;
    filterFreq?: number;
  }
) => {
  if (!masterGain) {
    return;
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);
  if (endFrequency !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(endFrequency, 40), now + duration);
  }

  amp.gain.setValueAtTime(0.0001, now);
  amp.gain.exponentialRampToValueAtTime(gain, now + attack);
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  if (filterFreq) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;
    osc.connect(filter);
    filter.connect(amp);
  } else {
    osc.connect(amp);
  }

  amp.connect(masterGain);
  osc.start(now);
  osc.stop(now + duration + 0.02);
};

const playNoiseBurst = (
  ctx: AudioContext,
  {
    duration = 0.15,
    gain = 0.1,
    filterFreq = 1800
  }: { duration?: number; gain?: number; filterFreq?: number }
) => {
  if (!masterGain) {
    return;
  }

  const now = ctx.currentTime;
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer(ctx, duration + 0.05);
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = filterFreq;
  filter.Q.value = 0.8;
  const amp = ctx.createGain();
  amp.gain.setValueAtTime(0.0001, now);
  amp.gain.exponentialRampToValueAtTime(gain, now + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  source.connect(filter);
  filter.connect(amp);
  amp.connect(masterGain);
  source.start(now);
  source.stop(now + duration + 0.02);
};

export const playSpaceSound = (name: SoundName) => {
  const ctx = ensureContext();
  if (!ctx || !masterGain || muted) {
    return;
  }

  if (ctx.state === 'suspended') {
    void ctx.resume();
  }

  switch (name) {
    case 'shoot':
      playTone(ctx, {
        frequency: 880,
        endFrequency: 220,
        type: 'sawtooth',
        duration: 0.14,
        gain: 0.09,
        filterFreq: 2400
      });
      playNoiseBurst(ctx, { duration: 0.08, gain: 0.05, filterFreq: 3200 });
      break;
    case 'hit':
      playNoiseBurst(ctx, { duration: 0.18, gain: 0.14, filterFreq: 900 });
      playTone(ctx, {
        frequency: 180,
        endFrequency: 70,
        type: 'triangle',
        duration: 0.2,
        gain: 0.1,
        filterFreq: 600
      });
      break;
    case 'planetHit':
      playTone(ctx, {
        frequency: 520,
        endFrequency: 260,
        type: 'sine',
        duration: 0.22,
        gain: 0.1
      });
      playTone(ctx, {
        frequency: 780,
        endFrequency: 390,
        type: 'triangle',
        duration: 0.18,
        gain: 0.06
      });
      break;
    case 'select':
      playTone(ctx, {
        frequency: 440,
        endFrequency: 660,
        type: 'sine',
        duration: 0.16,
        gain: 0.08
      });
      playTone(ctx, {
        frequency: 660,
        endFrequency: 880,
        type: 'triangle',
        duration: 0.2,
        gain: 0.05,
        attack: 0.02
      });
      break;
    case 'reset':
      playTone(ctx, {
        frequency: 240,
        endFrequency: 60,
        type: 'sawtooth',
        duration: 0.45,
        gain: 0.11,
        filterFreq: 800
      });
      playNoiseBurst(ctx, { duration: 0.35, gain: 0.12, filterFreq: 500 });
      break;
    case 'ui':
      playTone(ctx, {
        frequency: 520,
        type: 'sine',
        duration: 0.08,
        gain: 0.05
      });
      break;
    default:
      break;
  }
};

export const setThrusterLevel = (level: number) => {
  const ctx = ensureContext();
  if (!ctx || !masterGain) {
    return;
  }

  const amount = muted ? 0 : Math.max(0, Math.min(1, level));

  if (amount < 0.05) {
    if (thrusterGain && thrusterRunning) {
      const now = ctx.currentTime;
      thrusterGain.gain.setTargetAtTime(0.0001, now, 0.08);
      thrusterRunning = false;
    }
    return;
  }

  if (!thrusterRunning) {
    thrusterGain = ctx.createGain();
    thrusterGain.gain.value = 0.0001;
    thrusterGain.connect(masterGain);

    thrusterOsc = ctx.createOscillator();
    thrusterOsc.type = 'sawtooth';
    thrusterOsc.frequency.value = 55;
    const oscFilter = ctx.createBiquadFilter();
    oscFilter.type = 'lowpass';
    oscFilter.frequency.value = 280;
    thrusterOsc.connect(oscFilter);
    oscFilter.connect(thrusterGain);
    thrusterOsc.start();

    thrusterNoise = ctx.createBufferSource();
    thrusterNoise.buffer = noiseBuffer(ctx, 1);
    thrusterNoise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 400;
    noiseFilter.Q.value = 0.6;
    const noiseAmp = ctx.createGain();
    noiseAmp.gain.value = 0.45;
    thrusterNoise.connect(noiseFilter);
    noiseFilter.connect(noiseAmp);
    noiseAmp.connect(thrusterGain);
    thrusterNoise.start();

    thrusterRunning = true;
  }

  if (thrusterGain && thrusterOsc) {
    const now = ctx.currentTime;
    thrusterGain.gain.setTargetAtTime(0.04 + amount * 0.07, now, 0.05);
    thrusterOsc.frequency.setTargetAtTime(48 + amount * 40, now, 0.05);
  }
};
