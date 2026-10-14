'use client';
import {useEffect, useRef, useState} from 'react';
import {BEAT, FILM_LEN, FINALE, answer25, filmEras, panels26, think25, typeCues, typeEnd} from '@/lib/intro-timeline';
import {buildScore, createBus, schedule} from '@/lib/intro-score';

// 开服动画：一分钟，从 2022 的灰色对话框，一年一年长成 2026 的手绘分镜。每一年只讲一件和那年界面对得上的事。
// 画面是一条声明式时间轴：带 data-at="出现,消失" 的元素按当前秒数加减 on / past，CSS 负责动；
// 打字、计数也按秒数算，所以可以随时拖动进度。时钟优先跟着 AudioContext 走，音画不会跑偏。
// 是否弹出由 <head> 里的 introGateScript 决定（首次访问才弹），这里只管播放。
const SEEN = 'intro-seen';
const VOL = 1.1;
const cue = Object.fromEntries(typeCues.map(c => [c.id, c]));
const at = (a: number, b?: number) => (b === undefined ? String(a) : a + ',' + b);
const T = ({id}: {id: string}) => <span data-type={id} />;
// 手绘小图（viewBox 120×80）。落笔时一笔一笔描出来
const ROBOT = ['M44 14h32a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-32a6 6 0 0 1-6-6v-20a6 6 0 0 1 6-6z', 'M60 14v-6', 'M48 48h24v18h-24z', 'M48 52l-10 8', 'M54 66v8', 'M66 66v8'];
const ARM = 'M72 52l10-8';
const FACE = ['M50 28a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0', 'M65 28a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0', 'M54 37q6 4 12 0'];
const CUP = ['M40 40h40v12a16 16 0 0 1-16 16h-8a16 16 0 0 1-16-16z', 'M80 44a7 7 0 0 1 0 14', 'M30 72h60', 'M40 40a20 4 0 0 0 40 0a20 4 0 0 0-40 0', 'M53 40q7-3 14 0q-7 3-14 0'];
const STEAM = ['M52 32q-4-6 0-12t0-12', 'M60 30q-4-6 0-12t0-12', 'M68 32q-4-6 0-12t0-12'];
const HAND = ['M18 52q-6-14 2-22h22q8 8 2 22z', 'M22 30v-14', 'M27 29v-19', 'M32 29v-21', 'M37 29v-19', 'M41 31v-13', 'M44 38l9-8'];
const NOTES = ['M30 60v-30l18-5v30', 'M30 30l18-5', 'M24 60a6 4 0 1 0 12 0a6 4 0 1 0-12 0', 'M42 55a6 4 0 1 0 12 0a6 4 0 1 0-12 0', 'M78 52v-26', 'M72 52a6 4 0 1 0 12 0a6 4 0 1 0-12 0', 'M78 26q8 2 10 10'];
const Draw = ({d, className}: {d: string[]; className?: string}) => <>{d.map(p => <path key={p} d={p} pathLength={1} className={className} />)}</>;

export function FilmReplay() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return <button type="button" className="film-replay" onClick={() => dispatchEvent(new Event('film:play'))}>▶ 开服动画</button>;
}

export default function IntroFilm() {
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
        const e = 1 - (1 - p) ** 3, v = String(Math.round(from + (to - from) * e));
        if (v !== x.last) {
          x.n.textContent = x.last = v;
          x.n.style.setProperty('--v', e.toFixed(3));
        }
      }
      const e = t < filmEras[0].from ? 'intro' : t >= FINALE ? 'final' : filmEras.find(f => t >= f.from && t < f.to)!.year;
      if (e !== era) stage.dataset.era = era = e;
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

          {/* 2023 · 社区频道：画画要去频道里念咒，等机器人出图，再数手指 */}
          <div className="fw fw23" data-at={at(14, 24)}>
            <nav className="c23-rail" aria-hidden="true"><i /><i /><i /><i /></nav>
            <div className="c23-main">
              <div className="c23-head"><b># 画室-新手区</b><small>念一句咒语，等机器人出图</small></div>
              <div className="c23-log">
                <div className="c23-msg me" data-at={at(14.5)}><div><i className="c23-av" aria-hidden="true">你</i><p><span className="c23-name">你</span><code><T id="cmd" /></code></p></div></div>
                <div className="c23-msg" data-at={at(16.6)}>
                  <div>
                    <i className="c23-av" aria-hidden="true">档</i>
                    <div className="c23-body">
                      <span className="c23-name">档案员 <em>BOT</em></span>
                      <span>收到，排队中…… 前面还有 23 人</span>
                      <span className="c23-bar">生成中 <b data-count="17,2,0,100">0</b>%<i className="c23-track"><i className="c23-fill" data-count="17,2,0,100" /></i></span>
                      <div className="c23-grid" data-at={at(19)}>
                        <i className="art a1" /><i className="art a2" /><i className="art a3" />
                        <i className="art hand" data-at={at(20)}><svg viewBox="0 0 60 60" aria-hidden="true"><Draw d={HAND} /></svg></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="c23-msg" data-at={at(19.8)}><div><i className="c23-av" aria-hidden="true">档</i><p><span className="c23-name">档案员 <em>BOT</em></span>数手指鉴定：第 4 张，一共 <b className="c23-fingers" data-count="20,1.2,0,6">0</b> 根手指</p></div></div>
                <div className="c23-msg me" data-at={at(21.3)}><div><i className="c23-av" aria-hidden="true">你</i><p><span className="c23-name">你</span><code><T id="neg" /></code></p></div></div>
              </div>
              <div className="c23-typing" data-at={at(23.2)}>档案员正在重新念咒<i /><i /><i /></div>
            </div>
          </div>

          {/* 2024 · 多模态：对它说话，给它看东西，再让它把画面变成视频 */}
          <div className="fw fw24" data-at={at(24, 34)}>
            <div className="c24-orb" aria-hidden="true">
              <i />
              <span className="c24-state">
                <em data-at={at(24.3, 27.4)}>正在聆听</em>
                <em data-at={at(27.4, 29.8)}>正在说话</em>
                <em data-at={at(29.8, 30.8)}>正在聆听</em>
                <em data-at={at(30.8)}>正在生成</em>
              </span>
              <b>{[0, 1, 2, 3, 4].map(k => <s key={k} style={{'--k': k} as React.CSSProperties} />)}</b>
            </div>
            <div className="c24-log">
              <div className="c24-item me" data-at={at(24.7, 30.8)}><div><p className="c24-voice"><small>语音</small><T id="v1" /></p></div></div>
              <div className="c24-item" data-at={at(26.5, 30.8)}>
                <div><div className="c24-cam"><svg viewBox="0 0 120 80" aria-hidden="true"><Draw d={CUP} /></svg><small>摄像头</small></div></div>
              </div>
              <div className="c24-item ai" data-at={at(27.4)}><div><p><T id="v2" /></p></div></div>
              <div className="c24-item me" data-at={at(29.8)}><div><p className="c24-voice"><small>语音</small><T id="v3" /></p></div></div>
              <div className="c24-item" data-at={at(30.8)}>
                <div>
                  <div className="c24-video" data-at={at(31.6)}>
                    <svg viewBox="0 0 120 80" aria-hidden="true"><Draw d={CUP} /><g className="c24-steam"><Draw d={STEAM} /></g></svg>
                    <span className="c24-gen">生成中…</span>
                    <span className="c24-play"><i />生成的视频 · 0:04</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2025 · 深度思考：当年难倒 AI 的两道老题，这回先想再答 */}
          <div className="fw fw25" data-at={at(34, 44)}>
            <div className="c25-q" data-at={at(34.3)}><p><T id="q" /></p></div>
            <div className="c25-think" data-at={at(...think25[0])}>
              <div className="c25-th-head"><i aria-hidden="true" /><span className="c25-a">思考中… <b data-count={`${think25[0][0]},4,0,4`}>0</b> 秒</span><span className="c25-b">已深度思考（用时 4 秒）›</span></div>
              <div className="c25-th-body"><div>{['t1', 't2', 't3', 't4'].map(id => <p key={id}><T id={id} /></p>)}</div></div>
            </div>
            <div className="c25-ans" data-at={at(answer25[0])}><b>9.9 更大。</b><small>这道题，前两年难倒过不少 AI。</small></div>
            <div className="c25-q" data-at={at(40.7)}><p><T id="q2" /></p></div>
            <div className="c25-think" data-at={at(...think25[1])}>
              <div className="c25-th-head"><i aria-hidden="true" /><span className="c25-a">思考中…</span><span className="c25-b">已深度思考（用时 1 秒）›</span></div>
              <div className="c25-th-body"><div><p><T id="t5" /></p></div></div>
            </div>
            <div className="c25-ans" data-at={at(answer25[1])}><b>3 个。</b><small>以前，它常数成 2 个。</small></div>
          </div>

          {/* 2026 · 手绘动画：写代码 → 起稿 → 上色 → 活过来 → 配乐 → 正式服 */}
          <div className="fw fw26" data-at={at(44, 54)}>
            <div className="c26-grid">
              {panels26.map(([t, title, line], i) => (
                <div key={title} className={'c26-panel k' + i} data-at={at(t)} style={{'--w': `url(#fw${(i % 3) + 1})`} as React.CSSProperties}>
                  <div className="c26-pic">
                    {i === 0 && <pre className="c26-code"><T id="code" /></pre>}
                    {(i === 1 || i === 2 || i === 3) && (
                      <svg viewBox="0 0 120 80" aria-hidden="true" className={'c26-robot' + (i === 1 ? ' sketch' : i === 2 ? ' color' : ' alive')}>
                        <Draw d={ROBOT} />
                        <path d={ARM} pathLength={1} className="arm" />
                        <Draw d={FACE} className="face" />
                        {i === 3 && <Draw d={['M30 24l-6-4', 'M28 36h-8', 'M90 24l6-4', 'M92 36h8']} className="motion" />}
                      </svg>
                    )}
                    {i === 4 && <svg viewBox="0 0 120 80" aria-hidden="true" className="c26-notes"><Draw d={NOTES} /></svg>}
                    {i === 5 && <p className="c26-meta">这段开场，<br />也是这样画出来的</p>}
                  </div>
                  <span className="c26-tag">#{String(i + 1).padStart(2, '0')}</span>
                  <b>{title}</b>
                  <small>{line}</small>
                  {i === 5 && <em className="c26-sticker">NEW</em>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="film-cap">
          {filmEras.map(e => <span key={e.year} data-at={at(e.from + 0.5, e.to - 0.15)}>{e.caption}</span>)}
        </p>

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
