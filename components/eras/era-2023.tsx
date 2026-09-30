import {Fragment} from 'react';
import {type TimelineEvent,type CategoryId,eras} from '@/lib/museum';
import {type EraProps,exhibitHref,anchorId,categoryName,ExhibitImg} from '@/components/eras/shared';

// 2023：社区频道。机器人在频道里发公告，置顶一条，按月分隔。
const channel:Record<CategoryId,string>={models:'对话',images:'作图',video:'视频',audio:'声音',agents:'插件与智能体',open:'开源'};
const slash=(d:string)=>d.replaceAll('-','/');

function Message({e,pinned=false}:{e:TimelineEvent;pinned?:boolean}){
  if(e.tier==='minor'&&!pinned)return <article className="s23-msg compact" id={anchorId(e)}>
    <time dateTime={e.date}>{e.date.slice(5).replace('-','/')}</time>
    <p><a href={exhibitHref(e)}>{e.name}</a> —— {e.line}<span className="s23-ch">#{channel[e.category]}</span></p>
  </article>;
  return <article className={'s23-msg'+(pinned?' pinned':'')} id={anchorId(e)}>
    <span className="s23-av" aria-hidden="true">档</span>
    <div className="s23-body">
      <div className="s23-meta"><strong>档案馆</strong><span className="s23-bot">机器人</span><time dateTime={e.date}>{slash(e.date)}</time></div>
      <p>{e.line}</p>
      <a className="s23-embed" href={exhibitHref(e)}>
        <span className="s23-embed-site">#{channel[e.category]} · {categoryName(e.category)}</span>
        <strong>{e.name}</strong>
        <span className="s23-embed-text">{e.detail}</span>
        {e.visual==='image'&&<ExhibitImg event={e}/>}
      </a>
    </div>
  </article>;
}

export default function Era2023({era,events}:EraProps){
  const [pinned,...rest]=events;
  const used=[...new Set(events.map(e=>e.category))];
  return <div className="skin s2023"><div className="s23-app">
    <nav className="s23-rail" aria-label="切换年份">
      <span className="s23-home" aria-hidden="true">档</span>
      {eras.map(e=><a key={e.year} href={'#year-'+e.year} aria-current={e.year===era.year?'true':undefined}>{e.year.slice(2)}</a>)}
    </nav>
    <aside className="s23-channels" aria-label="频道">
      <p className="s23-server">AI 怀旧服 · {era.year}<span aria-hidden="true">⌄</span></p>
      <p className="s23-cat">文字频道</p>
      <span className="s23-chan current"># {era.year}-大事记</span>
      {used.map(c=><a key={c} className="s23-chan" href={'/collections/'+c}># {channel[c]}</a>)}
      <div className="s23-me"><span className="s23-av me" aria-hidden="true">你</span><div><strong>你</strong><small>潜水中</small></div></div>
    </aside>
    <div className="s23-main">
      <p className="s23-head"><span aria-hidden="true">#</span><strong>{era.year}-大事记</strong><span className="s23-topic">{era.subtitle}</span></p>
      <div className="s23-feed">
        <div className="s23-welcome"><span aria-hidden="true">#</span><p className="s23-welcome-title">欢迎来到 #{era.year}-大事记</p><p>{era.title}</p></div>
        {pinned&&<><p className="s23-pin-label">📌 置顶消息</p><Message e={pinned} pinned/></>}
        {rest.map((e,i)=>{const m=e.date.slice(0,7),divider=i===0||rest[i-1].date.slice(0,7)!==m;return <Fragment key={e.id}>
          {divider&&<p className="s23-divider"><span>{Number(m.slice(0,4))} 年 {Number(m.slice(5))} 月</span></p>}
          <Message e={e}/>
        </Fragment>})}
      </div>
      <div className="s23-dock"><div className="s23-input"><span aria-hidden="true">＋</span>在 #{era.year}-大事记 里说点什么</div></div>
    </div>
    <aside className="s23-pins" aria-label="编者手记"><p className="s23-cat">置顶 · 编者手记</p><blockquote>{era.note}</blockquote></aside>
  </div></div>;
}
