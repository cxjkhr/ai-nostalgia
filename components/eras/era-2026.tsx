import {type TimelineEvent} from '@/lib/museum';
import {type EraProps,exhibitHref,anchorId,monthDay,categoryName,ExhibitImg} from '@/components/eras/shared';
import {chronological,monthOf,YearRuler,YearHow} from '@/components/eras/timeline';
import ScrollSpy from '@/components/scroll-spy';

// 2026：手绘动画。这一年 AI 开始用代码一笔一笔画动画：纸面、限定配色、会轻轻"沸腾"的手绘描边（一拍二的步进）。
// 整页是一本分镜本：一件事是一格分镜，格子按时间编号；同一个月是同一场戏（SCENE）。
function Wobble(){
  // 三张略有不同的扭曲滤镜，CSS 轮流切换，线条就像手绘动画那样抖。
  return <svg className="s26-defs" aria-hidden="true" focusable="false">
    {[3,11,23].map((seed,i)=><filter key={seed} id={'s26w'+(i+1)}><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed}/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter>)}
  </svg>;
}

function Doodle(){
  // 一个自己画的小机器人，一拍二地上下晃。
  return <svg className="s26-doodle" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <g className="s26-bob">
      <path d="M60 18 L60 6"/><circle cx="60" cy="5" r="4" className="s26-fill-pink"/>
      <rect x="22" y="18" width="76" height="60" rx="22" className="s26-fill-paper"/>
      <circle cx="46" cy="47" r="6" className="s26-fill-ink"/><circle cx="74" cy="47" r="6" className="s26-fill-ink"/>
      <path d="M48 62 Q60 71 72 62"/>
      <circle cx="33" cy="60" r="5" className="s26-fill-pink s26-soft"/><circle cx="87" cy="60" r="5" className="s26-fill-pink s26-soft"/>
      <path d="M40 78 L36 100 M80 78 L84 100"/><path d="M28 104 L44 104 M76 104 L92 104"/>
    </g>
  </svg>;
}

function Panel({e,no,scene,anchor}:{e:TimelineEvent;no:number;scene:number;anchor:boolean}){
  return <li id={anchorId(e)} className={'s26-panel flow-wait'+(e.tier==='major'?' major':'')+(anchor?' anchor':'')+(e.incident?' incident':'')}>
    <span className="s26-outline" aria-hidden="true"/>
    <a className="s26-frame" href={exhibitHref(e)} aria-label={'查看展品：'+e.name}>
      {e.visual==='image'&&e.image?<ExhibitImg event={e}/>:<span className="s26-blank">{e.name}</span>}
      <span className="s26-frame-no" aria-hidden="true">#{String(no).padStart(2,'0')}</span>
      <span className="s26-scene-tag" aria-hidden="true">SCENE {String(scene).padStart(2,'0')} · {monthOf(e.date)} 月</span>
    </a>
    <div className="s26-caption">
      <p className="s26-meta"><time dateTime={e.date}>{monthDay(e.date)}</time><span>{categoryName(e.category)}</span>{anchor&&<em className="s26-sticker">本年主展品</em>}{e.incident&&<em className="s26-sticker alert">事故</em>}</p>
      <p className="s26-name"><a href={exhibitHref(e)}>{e.name}</a></p>
      <p className="s26-line">{e.line}</p>
      {e.tier==='major'&&<p className="s26-detail">{e.detail}</p>}
      <a className="s26-more" href={exhibitHref(e)}>查看展品 →</a>
    </div>
  </li>;
}

export default function Era2026({era,events}:EraProps){
  const {list,anchor}=chronological(events);
  const months=[...new Set(list.map(e=>monthOf(e.date)))];
  return <div className="skin s2026"><Wobble/><ScrollSpy links=".s2026 [data-spy]"/>
    <div className="s26-book">
      <header className="s26-cover">
        <div className="s26-cover-text">
          <p className="s26-kicker" data-ent="kicker">分镜本 · {era.year} · {list.length} 格</p>
          <p className="s26-title" data-ent="title">{era.title}<svg className="s26-scribble" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 12 C60 4 110 18 160 10 S250 6 296 12"/></svg></p>
          <p className="s26-sub" data-ent="sub">{era.subtitle}</p>
        </div>
        <Doodle/>
      </header>
      <YearRuler list={list} anchor={anchor} width={940}/>
      <YearHow era={era} unit="这一年 AI 开始用代码一笔一笔画动画，整页是一本分镜本，每一格是一件事，编号就是先后顺序，同一个月是同一场戏，" anchor={anchor} className="yr-how s26-how"/>
      <ol className="s26-panels">{list.map((e,i)=><Panel key={e.id} e={e} no={i+1} scene={months.indexOf(monthOf(e.date))+1} anchor={e.id===anchor?.id}/>)}</ol>
      <p className="s26-end"><span>编者手记</span>{era.note}</p>
    </div>
  </div>;
}
