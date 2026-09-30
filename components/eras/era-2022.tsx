import {Fragment,type ReactNode} from 'react';
import {type TimelineEvent} from '@/lib/museum';
import {type EraProps,exhibitHref,anchorId,monthDay,yearProgress,categoryName,ExhibitImg} from '@/components/eras/shared';
import ScrollSpy from '@/components/scroll-spy';

// 2022：研究预览时代的对话框。保留灰底、整行一问一答交替；
// 在它上面加一条清楚的时间线：开篇说明 + 全年刻度，左侧日期竖线，按月分段，侧栏是按月的目录。
const month=(d:string)=>Number(d.slice(5,7));

// 全年刻度：点都落在轴上；重要节点的名字立在点上方，靠得太近的名字往上错开一层。
function marks(list:TimelineEvent[]){
  const last:number[]=[];
  return list.map(e=>{
    const x=yearProgress(e.date);
    if(e.tier!=='major')return {e,x,lane:-1};
    let lane=0;while(last[lane]!==undefined&&x-last[lane]<16)lane++;last[lane]=x;
    return {e,x,lane};
  });
}

function Row({who,children,gutter}:{who:'user'|'bot';children:ReactNode;gutter?:ReactNode}){
  return <div className={'s22-row '+who}><div className="s22-inner">
    <div className="s22-gutter">{gutter}</div>
    <span className="s22-av" aria-hidden="true">{who==='user'?'你':'✳'}</span>
    <div className="s22-msg">{children}</div>
  </div></div>;
}

export default function Era2022({era,events}:EraProps){
  const list=[...events].sort((a,b)=>a.date.localeCompare(b.date));
  const anchor=events[0];
  const months=[...new Set(list.map(e=>month(e.date)))];
  return <div className="skin s2022"><ScrollSpy links=".s2022 [data-spy]"/><div className="s22-app">
    <aside className="s22-side" aria-label={era.year+' 年时间线目录'}>
      <p className="s22-new">{era.year} 年 · {list.length} 件事</p>
      <nav>{months.map(m=><Fragment key={m}>
        <p className="s22-group">{m} 月</p>
        <ol>{list.filter(e=>month(e.date)===m).map(e=><li key={e.id}><a href={'#'+anchorId(e)} data-spy={anchorId(e)}><time dateTime={e.date}>{monthDay(e.date)}</time><span>{e.name}</span></a></li>)}</ol>
      </Fragment>)}</nav>
      <p className="s22-side-foot">按时间顺序 · 点任意一条跳过去</p>
    </aside>
    <div className="s22-main">
      <header className="s22-intro">
        <p className="s22-kicker">版本 {era.year} · 研究预览</p>
        <p className="s22-title">{era.title}</p>
        <p className="s22-sub">{era.subtitle}</p>
        {(()=>{const m=marks(list),n=Math.max(0,...m.map(k=>k.lane))+1;return <div className="s22-ruler" style={{'--lanes':n} as React.CSSProperties}>
          {m.map(({e,x,lane})=><a key={e.id} href={'#'+anchorId(e)} data-spy={anchorId(e)} className={'s22-dot'+(lane>=0?' major':'')+(e.id===anchor?.id?' anchor':'')} style={{left:x+'%','--lane':Math.max(lane,0)} as React.CSSProperties}><i aria-hidden="true"/><b>{e.name}<small>{monthDay(e.date)}</small></b></a>)}
          <div className="s22-ruler-track" aria-hidden="true">{Array.from({length:12},(_,i)=><span key={i}>{i+1}月</span>)}</div>
        </div>})()}
        <p className="s22-how">这一页是 {era.year} 年的样子：那时候的 AI 就是一个对话框。下面每一轮「你问 · 它答」就是这一年的一件事，按时间从上往下排，左边是日期；大一点的点是重要节点，{anchor&&<>最重要的是 <a href={'#'+anchorId(anchor)}>{anchor.name}（{monthDay(anchor.date)}）</a></>}。</p>
      </header>
      {list.map((e,i)=>{const newMonth=i===0||month(list[i-1].date)!==month(e.date);return <Fragment key={e.id}>
        {newMonth&&<div className="s22-month"><div className="s22-inner"><div className="s22-gutter"><strong>{month(e.date)} 月</strong></div><span/></div></div>}
        <section id={anchorId(e)} className={'s22-turn'+(e.tier==='major'?' major':'')+(e.id===anchor?.id?' anchor':'')} aria-label={monthDay(e.date)+' '+e.name}>
          <Row who="user" gutter={<><time dateTime={e.date}>{monthDay(e.date)}</time><small>{e.tag}</small></>}>
            <span className="s22-q">{e.name}</span>{e.id===anchor?.id&&<span className="s22-badge">本年主展品</span>}
          </Row>
          <Row who="bot">
            <p className="s22-lead">{e.line}</p>
            {e.tier==='major'&&<p>{e.detail}</p>}
            {e.tier==='major'&&e.visual==='image'&&<a className="s22-media" href={exhibitHref(e)}><ExhibitImg event={e}/></a>}
            <p className="s22-meta"><span>{categoryName(e.category)}</span><a href={exhibitHref(e)}>查看展品 →</a></p>
          </Row>
        </section>
      </Fragment>})}
      <div className="s22-dock">
        <div className="s22-input"><span>发送消息……</span><span aria-hidden="true">➤</span></div>
        <p className="s22-note">{era.note}<span>编者手记</span></p>
      </div>
    </div>
  </div></div>;
}
