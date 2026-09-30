import {type TimelineEvent,type CategoryId} from '@/lib/museum';
import {type EraProps,exhibitHref,anchorId,dotDate,ExhibitImg} from '@/components/eras/shared';

// 2026：现役服。终端里滚动的发布日志，更新快到只能用时间戳追。
const level:Record<CategoryId,string>={models:'MODEL',images:'IMAGE',video:'VIDEO',audio:'AUDIO',agents:'AGENT',open:'OPEN'};
const lvl=(e:TimelineEvent)=>e.incident?'ALERT':level[e.category];

function Card({e,pinned=false}:{e:TimelineEvent;pinned?:boolean}){
  return <article className={'s26-card'+(pinned?' pinned':'')+(e.incident?' incident':'')} id={anchorId(e)}>
    <p className="s26-card-head">{pinned&&<span className="s26-pin">当前版本</span>}<span className={'s26-lvl '+e.category}>{lvl(e)}</span><time dateTime={e.date}>{dotDate(e.date)}</time><a href={exhibitHref(e)}>{e.name}</a></p>
    <p className="s26-out">{e.line}</p>
    <p className="s26-dim">{e.detail}</p>
    {e.visual==='image'&&<a className="s26-media" href={exhibitHref(e)}><ExhibitImg event={e}/></a>}
  </article>;
}

export default function Era2026({era,events}:EraProps){
  const [pinned,...rest]=events;
  const latest=[...events].sort((a,b)=>b.date.localeCompare(a.date))[0];
  const ticker=[...rest].sort((a,b)=>b.date.localeCompare(a.date)).map(e=>e.name).join('　▲ ');
  return <div className="skin s2026">
    <div className="s26-ticker" aria-hidden="true"><div><span>▲ {ticker}　</span><span>▲ {ticker}　</span></div></div>
    <div className="s26-term">
      <p className="s26-bar"><span className="s26-dots" aria-hidden="true">● ● ●</span><span>~/ai-nostalgia — {era.year} — 现役服</span><span/></p>
      <div className="s26-body">
        <p className="s26-cmd"><span className="s26-ps">$</span> nostalgia log --year {era.year} --live</p>
        <p className="s26-out">{era.title}</p>
        <p className="s26-dim">{era.subtitle}</p>
        <p className="s26-status"><span className="s26-ok">● 在线</span>收录 {events.length} 条 · 最近一条 {latest&&dotDate(latest.date)}</p>
        {pinned&&<Card e={pinned} pinned/>}
        <ol className="s26-log">{rest.map(e=>e.tier==='major'
          ?<li key={e.id}><Card e={e}/></li>
          :<li key={e.id} id={anchorId(e)} className="s26-line"><time dateTime={e.date}>{dotDate(e.date)}</time><span className={'s26-lvl '+e.category}>{lvl(e)}</span><a href={exhibitHref(e)}>{e.name}</a><span className="s26-dim">{e.line}</span></li>)}</ol>
        <p className="s26-comment"># 编者手记：{era.note}</p>
        <p className="s26-cmd"><span className="s26-ps">$</span> <span className="s26-caret" aria-hidden="true"/></p>
      </div>
    </div>
  </div>;
}
