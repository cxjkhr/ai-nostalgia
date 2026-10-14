'use client';
import {useEffect, useRef, useState} from 'react';
import {BEAT, FILM_LEN, FINALE, OUTAGE, beats2023, beats2024, beats2025, beats2026, filmEras, typeCues, typeEnd} from '@/lib/intro-timeline';
import {buildScore, createBus, schedule} from '@/lib/intro-score';

// 开服动画：一分钟，从 2022 的灰色对话框，一年一年长成 2026 的手绘分镜。
// 画面是一条声明式时间轴：带 data-at="出现,消失" 的元素按当前秒数加减 on / past，CSS 负责动；
// 打字、计数也按秒数算，所以可以随时拖动进度。时钟优先跟着 AudioContext 走，音画不会跑偏。
// 是否弹出由 <head> 里的 introGateScript 决定（首次访问才弹），这里只管播放。
const SEEN = 'intro-seen';
const VOL = 1.1;
const cue = Object.fromEntries(typeCues.map(c => [c.id, c]));
const at = (a: number, b?: number) => (b === undefined ? String(a) : a + ',' + b);
const T = ({id}: {id: string}) => <span data-type={id} />;
// 2026 每格分镜里的手绘小图（viewBox 120×80），落笔时一笔一笔描出来
const doodles: string[][] = [
  ['M20 62h24v-16h-24z', 'M48 62h24v-16h-24z', 'M34 44h24v-16h-24z', 'M80 20l6-6', 'M84 30h9', 'M80 40l6 6'],
  ['M60 10l8 20 22 2-17 14 5 22-18-12-18 12 5-22-17-14 22-2z', 'M10 30h14', 'M6 42h16', 'M12 54h12'],
  ['M18 34h22v16h-22z', 'M40 38h9', 'M40 46h9', 'M18 42c-12 2-12 20 0 24', 'M76 26h28v30h-28z', 'M86 36v8', 'M94 36v8', 'M58 26l5 9-7 3 7 11'],
  ['M44 8h28a4 4 0 0 1 4 4v56a4 4 0 0 1-4 4h-28a4 4 0 0 1-4-4v-56a4 4 0 0 1 4-4z', 'M52 64h12', 'M84 22h24v16h-24z', 'M84 22l12 9 12-9', 'M78 54c8-4 10-10 8-16'],
  ['M18 14h14v14h-14z', 'M18 34h14v14h-14z', 'M18 54h14v14h-14z', 'M21 41l4 4 6-8', 'M42 21h18', 'M42 41h60', 'M42 61h10'],
  ['M60 6c15 12 17 34 9 54h-18c-8-20-6-42 9-54z', 'M55 28a5 5 0 1 0 10 0a5 5 0 1 0-10 0', 'M52 50l-11 13 11-2', 'M68 50l11 13-11-2', 'M55 62q5 12 5 15q0-3 5-15', 'M28 26v16', 'M92 30v14'],
];

export function FilmReplay() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return <button type="button" className="film-replay" onClick={() => dispatchEvent(new Event('film:play'))}>▶ 开服动画</button>;
}

export default function IntroFilm({titles}: {titles: string[]}) {
  const root = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(false);
  const api = useRef<{play: (from?: number) => void; skip: () => void; mute: (m: boolean) => void} | null>(null);

  useEffect(() => {
    const el = root.current!;
    const html = document.documentElement;
    const stage = el.querySelector<HTMLElement>('.film-stage')!;
    const nodes = [...el.querySelectorAll<HTMLElement>('[data-at]')].map(n => {
      const [a, b] = n.dataset.at!.split(',').map(Number);
      return {n, a, b: Number.isNaN(b) || b === undefined ? Infinity : b, s: ''};
    });
    const types = [...el.querySelectorAll<HTMLElement>('[data-type]')].map(n => ({n, c: cue[n.dataset.type!], k: -1, typing: false}));
    const counts = [...el.querySelectorAll<HTMLElement>('[data-count]')].map(n => ({n, v: n.dataset.count!.split(',').map(Number), last: ''}));
    let era = '';

    function draw(t: number) {
      for (const x of nodes) {
        const s = t >= x.b ? 'past' : t >= x.a ? 'on' : '';
        if (s !== x.s) {
          x.n.classList.toggle('on', s === 'on');
          x.n.classList.toggle('past', s === 'past');
          x.s = s;
        }
      }
      for (const x of types) {
        const chars = [...x.c.text];
        const k = Math.max(0, Math.min(chars.length, Math.floor((t - x.c.at) * x.c.cps)));
        if (k !== x.k) {
          x.n.textContent = chars.slice(0, k).join('');
          x.k = k;
        }
        const typing = t >= x.c.at - 0.3 && t < typeEnd(x.c) + 0.5;
        if (typing !== x.typing) {
          x.n.classList.toggle('typing', typing);
          x.typing = typing;
        }
      }
      for (const x of counts) {
        const [s, d, from, to] = x.v, p = Math.max(0, Math.min(1, (t - s) / d));
        const v = String(Math.round(from + (to - from) * (1 - (1 - p) ** 3)));
        if (v !== x.last) x.n.textContent = x.last = v;
      }
      const e = t < filmEras[0].from ? 'intro' : t >= FINALE ? 'final' : filmEras.find(f => t >= f.from && t < f.to)!.year;
      if (e !== era) stage.dataset.era = era = e;
      stage.classList.toggle('outage', t >= OUTAGE[0] && t < OUTAGE[1]);
      stage.style.setProperty('--pulse', Math.exp(-(t % BEAT) / 0.14).toFixed(3));
      stage.style.setProperty('--p', Math.min(1, t / FILM_LEN).toFixed(4));
    }

    // ── 时钟与声音 ──
    let ctx: AudioContext | null = null, bus: ReturnType<typeof createBus> | null = null, t0 = 0, queued = 0, pump = 0, raf = 0, wall = 0, ended = false;
    let isMuted = false;
    const score = buildScore();
    const now = () => (ctx ? ctx.currentTime - t0 : (performance.now() - wall) / 1000);
    function stopAudio(fade = 0.15) {
      clearInterval(pump);
      if (bus && ctx) {
        const b = bus, c = ctx;
        b.master.gain.setTargetAtTime(0, c.currentTime, fade / 3);
        setTimeout(() => b.master.disconnect(), fade * 1000 + 300);
      }
      bus = null;
    }
    function start(from: number) {
      stopAudio();
      if (!ctx) {
        try {
          ctx = new AudioContext();
        } catch {
          ctx = null;
        }
      }
      if (ctx) {
        void ctx.resume();
        bus = createBus(ctx, ctx.destination, isMuted ? 0 : VOL);
        t0 = ctx.currentTime + 0.06 - from;
        queued = from;
        const fill = () => {
          if (!ctx || !bus) return;
          const to = Math.min(FILM_LEN + 1, ctx.currentTime - t0 + 0.4);
          if (to > queued) {
            schedule(bus, score, t0, queued, to);
            queued = to;
          }
        };
        fill();
        pump = window.setInterval(fill, 60);
        // 声卡起不来（AudioContext 一直不是 running）时，画面改用普通时钟，别卡在原地
        const c = ctx;
        setTimeout(() => {
          if (ended || ctx !== c || c.state === 'running' || document.hidden) return;
          const t = now();
          stopAudio();
          ctx = null;
          void c.close();
          wall = performance.now() - t * 1000;
        }, 900);
      } else wall = performance.now() - from * 1000;
      ended = false;
      cancelAnimationFrame(raf);
      const loop = () => {
        const t = now();
        draw(Math.max(0, t));
        if (t >= FILM_LEN) return finish(false);
        raf = requestAnimationFrame(loop);
      };
      loop();
    }
    function finish(skipped: boolean) {
      if (ended) return;
      ended = true;
      cancelAnimationFrame(raf);
      try {
        localStorage.setItem(SEEN, '1');
      } catch {
        // 无痕模式等存不了：下次进站还会再弹一次门，不影响使用
      }
      stopAudio(skipped ? 0.4 : 1.2);
      el.classList.add('leaving');
      setTimeout(() => {
        el.classList.remove('leaving');
        delete html.dataset.intro;
        stage.dataset.era = era = '';
      }, 800);
      setTimeout(() => {
        if (ended && ctx) {
          void ctx.close();
          ctx = null;
        }
      }, 2500);
    }
    api.current = {
      play(from = 0) {
        html.dataset.intro = 'play';
        start(from);
      },
      skip: () => finish(true),
      mute(m) {
        isMuted = m;
        if (bus && ctx) bus.master.gain.setTargetAtTime(m ? 0 : VOL, ctx.currentTime, 0.05);
      },
    };
    const onPlay = () => api.current!.play(0);
    const onKey = (e: KeyboardEvent) => {
      if (!html.dataset.intro) return;
      if (e.key === 'Escape') finish(true);
    };
    const onVis = () => {
      if (!ctx || ended || html.dataset.intro !== 'play') return;
      void (document.hidden ? ctx.suspend() : ctx.resume());
    };
    addEventListener('film:play', onPlay);
    addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVis);
    draw(0);
    if (html.dataset.intro === 'gate') el.querySelector<HTMLButtonElement>('.fg-play')?.focus();
    return () => {
      removeEventListener('film:play', onPlay);
      removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', onVis);
      cancelAnimationFrame(raf);
      stopAudio();
      void ctx?.close();
    };
  }, []);

  const seek = (s: number) => api.current?.play(s);

  return (
    <div className="film" ref={root} role="dialog" aria-modal="true" aria-label="AI 怀旧服开服动画">
      <div className="film-gate">
        <p className="fg-kicker">AI 怀旧服 · 开服动画</p>
        <button type="button" className="fg-play" onClick={() => api.current?.play(0)}>
          <i aria-hidden="true" />
          <span>开服</span>
        </button>
        <p className="fg-note">从 2022 到 2026 · 一分钟 · 有声音</p>
        <button type="button" className="fg-skip" onClick={() => api.current?.skip()}>跳过，直接进入 ›</button>
      </div>

      <div className="film-stage">
        <svg width="0" height="0" aria-hidden="true" style={{position: 'absolute'}}>
          {[5, 17, 29].map((seed, i) => (
            <filter key={seed} id={'fw' + (i + 1)}>
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed={seed} />
              <feDisplacementMap in="SourceGraphic" scale="4" />
            </filter>
          ))}
        </svg>
        <div className="film-glow" aria-hidden="true">{filmEras.map(e => <i key={e.year} className={'g' + e.year} />)}</div>

        <header className="film-hud">
          <div className="film-year" aria-live="off">
            {filmEras.map(e => (
              <div key={e.year} data-at={at(e.from, e.to)}>
                <b>{e.year}</b>
                <span>{e.server} · {e.skin}</span>
              </div>
            ))}
          </div>
          <div className="film-ctrl">
            <button type="button" onClick={() => { setMuted(!muted); api.current?.mute(!muted); }} aria-pressed={muted}>{muted ? '开声音' : '静音'}</button>
            <button type="button" onClick={() => api.current?.skip()}>跳过 ›</button>
          </div>
        </header>

        <div className="film-hello" data-at={at(0.2, 3.7)}><p><T id="hello" /></p></div>

        <div className="film-win">
          {/* 2022 · 研究预览：灰底对话框，一问一答 */}
          <div className="fw fw22" data-at={at(4, 14)}>
            <div className="c22-top"><span className="c22-badge">研究预览</span><span>新对话</span></div>
            <div className="c22-log">
              {(['u1', 'a1', 'u2', 'a2'] as const).map(id => (
                <div key={id} className={'c22-row ' + id[0]} data-at={at(cue[id].at - 0.25)}>
                  <i className="c22-av" aria-hidden="true">{id[0] === 'u' ? '你' : 'AI'}</i>
                  <p><T id={id} /></p>
                </div>
              ))}
            </div>
            <div className="c22-stat" data-at={at(12)}>上线 5 天 · 用户破 <b data-count="12.1,1.2,0,100">0</b> 万</div>
            <div className="c22-input"><span>发送一条消息…</span><i aria-hidden="true" /></div>
          </div>

          {/* 2023 · 社区频道：机器人在频道里发公告 */}
          <div className="fw fw23" data-at={at(14, 24)}>
            <nav className="c23-rail" aria-hidden="true"><i /><i /><i /><i /></nav>
            <div className="c23-main">
              <div className="c23-head"><b># 版本公告</b><small>档案员正在搬运 2023 年的头条</small></div>
              <div className="c23-log">
                {beats2023.map((b, i) => (
                  <div key={b[2]} className="c23-msg" data-at={at(b[0], beats2023[i + 4]?.[0])}>
                    <div>
                      <i className="c23-av" aria-hidden="true">档</i>
                      <p><span className="c23-name">档案员 <em>BOT</em> <small>2023.{b[1]}</small></span><b>{b[2]}</b>{b[3]}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="c23-typing" data-at={at(21.8)}>有人正在输入<i /><i /><i /></div>
            </div>
          </div>

          {/* 2024 · 多模态：会呼吸的语音球，周围浮着那年的画面 */}
          <div className="fw fw24" data-at={at(24, 34)}>
            <div className="c24-orb" aria-hidden="true"><i /><span>正在聆听</span><b>{[0, 1, 2, 3, 4].map(k => <s key={k} style={{'--k': k} as React.CSSProperties} />)}</b></div>
            {beats2024.map((b, i) => (
              <div key={b[2]} className={'c24-card p' + i} data-at={at(b[0])}>
                <small>2024.{b[1]}</small><b>{b[2]}</b><span>{b[3]}</span>
              </div>
            ))}
          </div>

          {/* 2025 · 深度思考：先想，再答，再一项项勾掉 */}
          <div className="fw fw25" data-at={at(34, 44)}>
            <div className="c25-q" data-at={at(34.3)}><p><T id="q25" /></p></div>
            <div className="c25-think" data-at={at(35.2, 39.2)}>
              <div className="c25-th-head"><i aria-hidden="true" /><span className="c25-a">思考中…</span><span className="c25-b">已思考 4 秒 ›</span></div>
              <div className="c25-th-body"><div>{['t1', 't2', 't3', 't4'].map(id => <p key={id}><T id={id} /></p>)}</div></div>
            </div>
            <ul className="c25-todo">
              {beats2025.map(b => (
                <li key={b[2]} data-at={at(b[0])}><i aria-hidden="true" /><small>2025.{b[1]}</small><b>{b[2]}</b><span>{b[3]}</span></li>
              ))}
            </ul>
          </div>

          {/* 2026 · 手绘动画：分镜本一格一格画出来 */}
          <div className="fw fw26" data-at={at(44, 54)}>
            <div className="c26-grid">
              {beats2026.map((b, i) => (
                <div key={b[2]} className={'c26-panel' + (i === 2 ? ' incident' : '') + (i === 5 ? ' live' : '')} data-at={at(b[0])} style={{'--w': `url(#fw${(i % 3) + 1})`} as React.CSSProperties}>
                  <svg className="c26-doodle" viewBox="0 0 120 80" aria-hidden="true">{doodles[i].map(d => <path key={d} d={d} pathLength={1} />)}</svg>
                  <span className="c26-tag">#{String(i + 1).padStart(2, '0')} · 2026.{b[1]}</span>
                  <b>{b[2]}</b>
                  <small>{b[3]}</small>
                  {i === 2 && <em className="c26-sticker">事故</em>}
                  {i === 5 && <em className="c26-sticker">NEW</em>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="film-cap">
          {filmEras.map((e, i) => <span key={e.year} data-at={at(e.from + 0.5, e.to - 0.15)}>{titles[i]}</span>)}
        </p>

        <div className="film-outage" aria-hidden="true"><b>连接中断</b><small>ChatGPT · Claude · Grok 无响应</small></div>

        <div className="film-final" data-at={at(FINALE)}>
          <div className="ff-minis">
            {filmEras.map((e, i) => (
              <div key={e.year} className={'ff-mini m' + e.year} data-at={at(FINALE + 0.2 + i * 0.22)}>
                <b>{e.year}</b><small>{e.server}</small><span>{e.skin}</span>
              </div>
            ))}
          </div>
          <h2 data-at={at(56)}>才几年，AI 就能开<span>怀旧服</span>了？</h2>
          <p data-at={at(57.4)}>你还记得你第一次和 AI 讲话吗？</p>
        </div>

        <nav className="film-rail" aria-label="跳到某一年">
          <i className="film-rail-fill" aria-hidden="true" />
          {filmEras.map(e => (
            <button key={e.year} type="button" onClick={() => seek(e.from)} style={{'--x': e.from / FILM_LEN} as React.CSSProperties}>{e.year}</button>
          ))}
        </nav>
      </div>
    </div>
  );
}
