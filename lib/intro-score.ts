// 开场动画的配乐：全部用 Web Audio 现场合成，没有任何音频文件。
// 一首 62 秒、120 BPM 的小曲，同一段旋律按年份换编制：
// 2022 芯片方波 → 2023 加上鼓和贝斯 → 2024 铺底和弦随节拍呼吸 → 2025 半速、琶音像在"想" → 2026 全编制，黑色星期四断一拍 → 结尾回到主和弦。
// 同一份事件表既给页面实时播放，也能交给 OfflineAudioContext 离线渲染（导出视频用）。
import {BAR, BEAT, OUTAGE, sketchAt, typeCues, type TypeCue} from './intro-timeline';

type Bus = {ctx: BaseAudioContext; dry: AudioNode; wet: AudioNode};
type Ev = {t: number; play: (bus: Bus, at: number) => void};

const hz = (m: number) => 440 * 2 ** ((m - 69) / 12);
const noiseCache = new WeakMap<BaseAudioContext, AudioBuffer>();
function noise(ctx: BaseAudioContext) {
  let b = noiseCache.get(ctx);
  if (!b) {
    b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    noiseCache.set(ctx, b);
  }
  return b;
}
function env(g: GainNode, at: number, peak: number, a: number, hold: number, r: number) {
  g.gain.setValueAtTime(0.0001, at);
  g.gain.linearRampToValueAtTime(peak, at + a);
  g.gain.setValueAtTime(peak, at + a + hold);
  g.gain.exponentialRampToValueAtTime(0.0001, at + a + hold + r);
  return at + a + hold + r;
}
function out(bus: Bus, node: AudioNode, wet = 0) {
  node.connect(bus.dry);
  if (wet) {
    const s = bus.ctx.createGain();
    s.gain.value = wet;
    node.connect(s);
    s.connect(bus.wet);
  }
}

// ── 乐器 ──
type ToneOpt = {type?: OscillatorType; gain?: number; a?: number; r?: number; cut?: number; wet?: number; detune?: number};
function tone(bus: Bus, at: number, midi: number, dur: number, o: ToneOpt = {}) {
  const {ctx} = bus;
  const osc = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
  osc.type = o.type ?? 'square';
  osc.frequency.value = hz(midi);
  osc.detune.value = o.detune ?? 0;
  f.type = 'lowpass';
  f.frequency.value = o.cut ?? 3000;
  osc.connect(f).connect(g);
  const end = env(g, at, o.gain ?? 0.05, o.a ?? 0.005, Math.max(0, dur - (o.a ?? 0.005)), o.r ?? 0.12);
  out(bus, g, o.wet);
  osc.start(at);
  osc.stop(end + 0.05);
}
function bell(bus: Bus, at: number, midi: number, gain = 0.05) {
  for (const [ratio, g, d] of [[1, gain, 1.6], [2.76, gain * 0.35, 0.6], [5.4, gain * 0.12, 0.25]] as const) {
    const osc = bus.ctx.createOscillator(), e = bus.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = hz(midi) * ratio;
    osc.connect(e);
    const end = env(e, at, g, 0.004, 0, d);
    out(bus, e, 0.35);
    osc.start(at);
    osc.stop(end + 0.05);
  }
}
function pad(bus: Bus, at: number, notes: number[], dur: number, gain = 0.03, a = 0.4, r = 0.9, cut = 1400) {
  for (const n of notes) for (const det of [-9, 8]) tone(bus, at, n, dur, {type: 'sawtooth', gain: gain / notes.length, a, r, cut, wet: 0.5, detune: det});
}
function noiseHit(bus: Bus, at: number, gain: number, dur: number, type: BiquadFilterType, freq: number, q = 0.8, wet = 0) {
  const {ctx} = bus;
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noise(ctx);
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  s.connect(f).connect(g);
  const end = env(g, at, gain, 0.002, 0, dur);
  out(bus, g, wet);
  s.start(at, Math.random() * 1.5);
  s.stop(end + 0.05);
}
function kick(bus: Bus, at: number, gain = 0.5) {
  const {ctx} = bus;
  const osc = ctx.createOscillator(), g = ctx.createGain();
  osc.frequency.setValueAtTime(140, at);
  osc.frequency.exponentialRampToValueAtTime(42, at + 0.12);
  osc.connect(g);
  const end = env(g, at, gain, 0.002, 0.02, 0.28);
  out(bus, g);
  osc.start(at);
  osc.stop(end + 0.05);
}
const snare = (bus: Bus, at: number, gain = 0.14) => {
  noiseHit(bus, at, gain, 0.16, 'bandpass', 1900, 0.7, 0.25);
  tone(bus, at, 50, 0.04, {type: 'triangle', gain: gain * 0.6, r: 0.08});
};
const hat = (bus: Bus, at: number, gain = 0.03, open = false) => noiseHit(bus, at, gain, open ? 0.22 : 0.04, 'highpass', 8000);
const crash = (bus: Bus, at: number, gain = 0.07) => noiseHit(bus, at, gain, 1.6, 'highpass', 5200, 0.5, 0.4);
function riser(bus: Bus, at: number, dur: number, gain = 0.05) {
  const {ctx} = bus;
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noise(ctx);
  f.type = 'bandpass';
  f.Q.value = 1.4;
  f.frequency.setValueAtTime(300, at);
  f.frequency.exponentialRampToValueAtTime(7000, at + dur);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(gain, at + dur * 0.95);
  g.gain.linearRampToValueAtTime(0, at + dur);
  s.connect(f).connect(g);
  out(bus, g, 0.3);
  s.start(at);
  s.stop(at + dur + 0.05);
}
// 键盘声：短促的咔哒
function keyTick(bus: Bus, at: number, soft: boolean) {
  noiseHit(bus, at, soft ? 0.025 : 0.07, soft ? 0.02 : 0.035, 'bandpass', soft ? 5200 : 3200 + Math.random() * 900, 2.2);
}
// 铅笔在纸上划一笔
function pencil(bus: Bus, at: number) {
  const {ctx} = bus;
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noise(ctx);
  f.type = 'bandpass';
  f.Q.value = 3;
  f.frequency.setValueAtTime(2600, at);
  f.frequency.linearRampToValueAtTime(3800, at + 0.35);
  g.gain.setValueAtTime(0.0001, at);
  for (let i = 0; i < 6; i++) g.gain.linearRampToValueAtTime(i % 2 ? 0.01 : 0.06, at + i * 0.055 + 0.03);
  g.gain.linearRampToValueAtTime(0.0001, at + 0.38);
  s.connect(f).connect(g);
  out(bus, g);
  s.start(at, Math.random());
  s.stop(at + 0.4);
}
// 断电：音高一路往下掉
function powerDown(bus: Bus, at: number) {
  const {ctx} = bus;
  const osc = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(330, at);
  osc.frequency.exponentialRampToValueAtTime(28, at + 0.7);
  f.type = 'lowpass';
  f.frequency.value = 1200;
  osc.connect(f).connect(g);
  env(g, at, 0.12, 0.005, 0.2, 0.5);
  out(bus, g);
  osc.start(at);
  osc.stop(at + 0.8);
  for (let i = 0; i < 5; i++) noiseHit(bus, at + 0.08 + i * 0.13 + Math.random() * 0.05, 0.05, 0.03, 'highpass', 3000);
}

// ── 曲谱 ──
const CH: Record<string, {n: number[]; b: number}> = {
  F: {n: [53, 57, 60], b: 41},
  G: {n: [55, 59, 62], b: 43},
  Em: {n: [52, 55, 59], b: 40},
  Am: {n: [57, 60, 64], b: 45},
  Gs: {n: [55, 60, 62], b: 43},
  C: {n: [60, 64, 67], b: 36},
};
// 主旋律：[拍, 音高, 时值(拍)]，跟着和弦走
const MEL: Record<string, [number, number, number][]> = {
  F: [[0, 69, 1], [1, 72, 1], [2, 77, 2]],
  G: [[0, 76, 1], [1, 74, 1], [2, 71, 2]],
  Em: [[0, 67, 1], [1, 71, 1], [2, 76, 1], [3, 74, 1]],
  Am: [[0, 72, 3], [3, 69, 1]],
  Gs: [[0, 74, 2], [2, 72, 1], [3, 71, 1]],
};
const CYCLE = ['F', 'G', 'Em', 'Am', 'Gs'];

export function buildScore(cues: TypeCue[] = typeCues): Ev[] {
  const ev: Ev[] = [];
  const at = (t: number, play: Ev['play']) => ev.push({t, play});
  const beat = (bar: number, b: number) => bar * BAR + b * BEAT;

  // 开头两小节：低低的铺底，像开机
  at(0.05, (bus, t) => pad(bus, t, CH.Am.n, 1.9, 0.035, 1.1, 1.2, 900));
  at(2, (bus, t) => pad(bus, t, CH.F.n, 1.9, 0.035, 0.8, 1.2, 900));
  at(2, (bus, t) => tone(bus, t, 29, 2, {type: 'sine', gain: 0.12, a: 0.8, r: 1}));

  for (let era = 0; era < 5; era++) {
    for (let i = 0; i < 5; i++) {
      const bar = 2 + era * 5 + i, name = CYCLE[i], ch = CH[name], t0 = bar * BAR;
      const mel = MEL[name];
      if (i === 0 && era > 0) at(t0, (bus, t) => crash(bus, t));
      if (i === 4) at(t0, (bus, t) => riser(bus, t, BAR, era === 4 ? 0.07 : 0.05));
      if (era === 0) {
        // 2022：方波旋律 + 三角波低音，干干净净
        if (i === 0) at(t0, (bus, t) => {
          tone(bus, t, 81, 0.06, {gain: 0.05});
          tone(bus, t + 0.07, 88, 0.1, {gain: 0.05});
        });
        for (const [b, m, d] of mel) at(beat(bar, b), (bus, t) => tone(bus, t, m, d * BEAT * 0.9, {gain: 0.05, cut: 2400, wet: 0.2}));
        for (const b of [0, 2]) at(beat(bar, b), (bus, t) => tone(bus, t, ch.b + 12, BEAT * 1.6, {type: 'triangle', gain: 0.12}));
      } else if (era === 1) {
        // 2023：鼓、贝斯进场，旋律加一条低八度的影子
        for (let b = 0; b < 4; b++) {
          at(beat(bar, b), (bus, t) => (b % 2 ? snare(bus, t) : kick(bus, t, 0.45)));
          for (const h of [0, 0.5]) at(beat(bar, b + h), (bus, t) => hat(bus, t, 0.022));
          for (const h of [0, 0.5]) at(beat(bar, b + h), (bus, t) => tone(bus, t, ch.b + (h ? 12 : 0), BEAT * 0.45, {type: 'sawtooth', gain: 0.06, cut: 650}));
        }
        for (const [b, m, d] of mel) at(beat(bar, b), (bus, t) => {
          tone(bus, t, m, d * BEAT * 0.9, {gain: 0.035, cut: 2600, wet: 0.2});
          tone(bus, t, m - 12, d * BEAT * 0.9, {type: 'triangle', gain: 0.04});
        });
        if (i === 4) for (let k = 0; k < 8; k++) at(beat(bar, 2 + k * 0.25), (bus, t) => snare(bus, t, 0.04 + k * 0.012));
      } else if (era === 2) {
        // 2024：和弦每拍呼吸一次（像语音球在跳），钟琴唱旋律
        for (let b = 0; b < 4; b++) {
          at(beat(bar, b), (bus, t) => kick(bus, t, 0.32));
          at(beat(bar, b), (bus, t) => pad(bus, t + 0.04, ch.n.map(n => n + 12), BEAT * 0.55, 0.05, 0.1, 0.35, 2200));
          at(beat(bar, b + 0.5), (bus, t) => hat(bus, t, 0.018, true));
        }
        for (const b of [0, 2]) at(beat(bar, b), (bus, t) => tone(bus, t, ch.b, BEAT * 1.8, {type: 'sine', gain: 0.16}));
        for (const [b, m] of mel) at(beat(bar, b), (bus, t) => bell(bus, t, m + 12, 0.045));
      } else if (era === 3) {
        // 2025：半速。前三小节只有琶音在转，像在"想"；思考结束后旋律才回来
        at(beat(bar, 0), (bus, t) => kick(bus, t, 0.4));
        at(beat(bar, 2), (bus, t) => snare(bus, t, 0.1));
        at(t0, (bus, t) => pad(bus, t, ch.n, BAR * 0.95, 0.03, 0.5, 0.8, 1000));
        const arp = [...ch.n, ch.n[1] + 12, ch.n[0] + 12, ch.n[2], ch.n[1], ch.n[0] + 12];
        for (let k = 0; k < 16; k++) at(beat(bar, k * 0.25), (bus, t) => tone(bus, t, arp[k % arp.length] + 12, BEAT * 0.2, {type: 'triangle', gain: 0.03, wet: 0.25}));
        for (let k = 0; k < 8; k++) at(beat(bar, k * 0.5), (bus, t) => noiseHit(bus, t, 0.02, 0.012, 'highpass', 9000));
        if (i >= 2) for (const [b, m] of mel) at(beat(bar, b), (bus, t) => bell(bus, t, m + 12, 0.04));
        for (const b of [0, 2]) at(beat(bar, b), (bus, t) => tone(bus, t, ch.b, BEAT * 1.8, {type: 'sine', gain: 0.14}));
      } else {
        // 2026：全编制
        for (let b = 0; b < 4; b++) {
          at(beat(bar, b), (bus, t) => (b % 2 ? snare(bus, t, 0.15) : kick(bus, t, 0.5)));
          if (b === 2) at(beat(bar, 2.5), (bus, t) => kick(bus, t, 0.35));
          at(beat(bar, b), (bus, t) => hat(bus, t, 0.022));
          at(beat(bar, b + 0.5), (bus, t) => hat(bus, t, 0.03, true));
          for (const h of [0, 0.5]) at(beat(bar, b + h), (bus, t) => tone(bus, t, ch.b + (h ? 12 : 0), BEAT * 0.45, {type: 'sawtooth', gain: 0.07, cut: 800}));
        }
        at(t0, (bus, t) => pad(bus, t, ch.n.map(n => n + 12), BAR * 0.95, 0.035, 0.2, 0.6, 2000));
        for (const [b, m, d] of mel) at(beat(bar, b), (bus, t) => {
          tone(bus, t, m, d * BEAT * 0.9, {gain: 0.04, cut: 3200, wet: 0.25});
          bell(bus, t, m + 12, 0.03);
        });
        if (i === 4) for (let k = 0; k < 8; k++) at(beat(bar, 2 + k * 0.25), (bus, t) => snare(bus, t, 0.05 + k * 0.015));
      }
    }
  }

  // 结尾：F → G → C，钟琴往上走一串，留一个长尾巴
  at(54, (bus, t) => crash(bus, t, 0.08));
  at(54, (bus, t) => pad(bus, t, CH.F.n.map(n => n + 12), 1.95, 0.05, 0.3, 0.8, 1800));
  at(56, (bus, t) => pad(bus, t, CH.G.n.map(n => n + 12), 1.95, 0.05, 0.3, 0.8, 1800));
  at(54, (bus, t) => tone(bus, t, 41, 1.9, {type: 'sine', gain: 0.16}));
  at(56, (bus, t) => tone(bus, t, 43, 1.9, {type: 'sine', gain: 0.16}));
  for (const [b, m] of [[0, 69], [1, 72], [2, 77], [4, 76], [5, 74], [6, 71], [7, 74]] as const) at(54 + b * BEAT, (bus, t) => bell(bus, t, m + 12, 0.045));
  for (let k = 0; k < 8; k++) at(57 + k * 0.125, (bus, t) => snare(bus, t, 0.03 + k * 0.012));
  at(58, (bus, t) => {
    crash(bus, t, 0.09);
    kick(bus, t, 0.55);
    pad(bus, t, [...CH.C.n, 72], 3.2, 0.06, 0.05, 1.6, 2200);
    tone(bus, t, 36, 3.2, {type: 'sine', gain: 0.18, r: 1.2});
  });
  for (const [k, m] of [72, 76, 79, 84, 88].entries()) at(58 + k * 0.16, (bus, t) => bell(bus, t, m, 0.05));

  // 打字声、铅笔声
  for (const c of cues) if (c.tick) [...c.text].forEach((ch, k) => {
    if (ch.trim()) at(c.at + k / c.cps, (bus, t) => keyTick(bus, t, c.tick === 'soft'));
  });
  for (const s of sketchAt) at(s, (bus, t) => pencil(bus, t));

  // 黑色星期四：这一拍里的音全部不出声，只剩断电声
  const kept = ev.filter(e => e.t < OUTAGE[0] || e.t >= OUTAGE[1]);
  kept.push({t: OUTAGE[0], play: (bus, t) => powerDown(bus, t)});
  kept.push({t: OUTAGE[1], play: (bus, t) => crash(bus, t, 0.09)});
  return kept.sort((a, b) => a.t - b.t);
}

// 总线：干声 + 混响，压一道限幅
export function createBus(ctx: BaseAudioContext, dest: AudioNode, volume = 0.8): Bus & {master: GainNode} {
  const master = ctx.createGain();
  master.gain.value = volume;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16;
  comp.ratio.value = 4;
  comp.attack.value = 0.005;
  comp.release.value = 0.2;
  const dry = ctx.createGain(), wet = ctx.createGain(), verb = ctx.createConvolver();
  const len = Math.floor(ctx.sampleRate * 2.2), ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  }
  verb.buffer = ir;
  wet.gain.value = 0.5;
  dry.connect(master);
  wet.connect(verb).connect(master);
  master.connect(comp).connect(dest);
  return {ctx, dry, wet, master};
}

// 把 [from, to) 区间里的音排进时间表；t0 是影片第 0 秒对应的 AudioContext 时刻
export function schedule(bus: Bus, score: Ev[], t0: number, from: number, to: number) {
  for (const e of score) if (e.t >= from && e.t < to) e.play(bus, t0 + e.t);
}
