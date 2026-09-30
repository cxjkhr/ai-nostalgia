import {type TimelineEvent,type CategoryId} from '@/lib/museum';
import {Fragment} from 'react';
import {type EraProps,exhibitHref,anchorId,dotDate} from '@/components/eras/shared';
import {chronological,monthOf,isNewMonth,YearRuler,YearHow,Thumb} from '@/components/eras/timeline';
import ScrollSpy from '@/components/scroll-spy';

// 2026：现役服。终端里按时间往下滚的发布日志，最新的在最下面；按月插一行注释分段。
const level:Record<CategoryId,string>={models:'MODEL',images:'IMAGE',video:'VIDEO',audio:'AUDIO',agents:'AGENT',open:'OPEN'};
const lvl=(e:TimelineEvent)=>e.incident?'ALERT':level[e.category];

function Card({e,pinned=false}:{e:TimelineEvent;pinned?:boolean}){
  return <article className={'s26-card'+(pinned?' pinned':'')+(e.incident?' incident':'')} id={anchorId(e)}>
    <div className="s26-card-text">
      <p className="s26-card-head">{pinned&&<span className="s26-pin">本年主展品 · 当前版本</span>}<span className={'s26-lvl '+e.category}>{lvl(e)}</span><time dateTime={e.date}>{dotDate(e.date)}</time><a href={exhibitHref(e)}>{e.name}</a></p>
      <p className="s26-out">{e.line}</p>
      <p className="s26-dim">{e.detail}</p>
      <a className="s26-more" href={exhibitHref(e)}>→ 查看展品</a>
    </div>
    <Thumb e={e} className="s26-thumb"/>
  </article>;
}

export default function Era2026({era,events}:EraProps){
  const {list,anchor}=chronological(events);
  const latest=list[list.length-1];
  const ticker=[...list].reverse().map(e=>e.name).join('　▲ ');
  return <div className="skin s2026"><ScrollSpy links=".s2026 [data-spy]"/>
    <div className="s26-ticker" aria-hidden="true"><div><span>▲ {ticker}　</span><span>▲ {ticker}　</span></div></div>
    <div className="s26-term">
      <p className="s26-bar"><span className="s26-dots" aria-hidden="true">● ● ●</span><span>~/ai-nostalgia — {era.year} — 现役服</span><span/></p>
      <div className="s26-body">
        <p className="s26-cmd"><span className="s26-ps">$</span> nostalgia log --year {era.year} --live</p>
        <p className="s26-out s26-title">{era.title}</p>
        <p className="s26-dim">{era.subtitle}</p>
        <p className="s26-status"><span className="s26-ok">● 在线</span>收录 {list.length} 条 · 最近一条 {latest&&dotDate(latest.date)}</p>
        <YearRuler list={list} anchor={anchor} width={1030}/>
        <YearHow era={era} unit="更新快到只能用终端追，每一行日志是一件事，最新的在最下面，" anchor={anchor} className="yr-how s26-how"/>
        <ol className="s26-log">{list.map((e,i)=><Fragment key={e.id}>
          {isNewMonth(list,i)&&<li className="s26-month" aria-hidden="true"># ── {era.year}-{String(monthOf(e.date)).padStart(2,'0')} ──────────</li>}
          {e.tier==='major'||e.id===anchor?.id
          ?<li><Card e={e} pinned={e.id===anchor?.id}/></li>
          :<li id={anchorId(e)} className="s26-line"><time dateTime={e.date}>{dotDate(e.date)}</time><span className={'s26-lvl '+e.category}>{lvl(e)}</span><a href={exhibitHref(e)}>{e.name}</a><span className="s26-dim">{e.line}</span><Thumb e={e} className="s26-thumb small"/></li>}
        </Fragment>)}</ol>
        <p className="s26-comment"># 编者手记：{era.note}</p>
        <p className="s26-cmd"><span className="s26-ps">$</span> <span className="s26-caret" aria-hidden="true"/></p>
      </div>
    </div>
  </div>;
}
