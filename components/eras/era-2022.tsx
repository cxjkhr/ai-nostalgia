import {Fragment,type ReactNode} from 'react';
import {type TimelineEvent} from '@/lib/museum';
import {type EraProps,exhibitHref,anchorId,monthDay,categoryName,ExhibitImg} from '@/components/eras/shared';
import {chronological,YearRuler,YearHow} from '@/components/eras/timeline';
import ScrollSpy from '@/components/scroll-spy';

// 2022：研究预览时代的对话框。保留灰底、整行一问一答交替；
// 在它上面加一条清楚的时间线：开篇说明 + 全年刻度，左侧日期竖线，按月分段，侧栏是按月的目录。
const month=(d:string)=>Number(d.slice(5,7));

// 时间线上的缩略图：点图和点"查看展品"一样，进详情页。没有可考原图的展品不放图。
function Thumb({e}:{e:TimelineEvent}){
  if(e.visual==='image'&&e.image)return <a className="s22-thumb" href={exhibitHref(e)} aria-label={'查看展品：'+e.name}><ExhibitImg event={e}/><span aria-hidden="true">查看展品 →</span></a>;
  if(e.visual==='chat')return <a className="s22-thumb chat" href={exhibitHref(e)} aria-label={'查看展品：'+e.name}>
    <span className="s22-mini user"><i>你</i>用简单的话解释什么是人工智能</span>
    <span className="s22-mini bot"><i>✳</i>可以把人工智能想象成一个从大量例子中学习的助手……</span>
    <span aria-hidden="true">查看展品 →</span>
  </a>;
  return null;
}

function Row({who,children,gutter}:{who:'user'|'bot';children:ReactNode;gutter?:ReactNode}){
  return <div className={'s22-row '+who}><div className="s22-inner">
    <div className="s22-gutter">{gutter}</div>
    <span className="s22-av" aria-hidden="true">{who==='user'?'你':'✳'}</span>
    <div className="s22-msg">{children}</div>
  </div></div>;
}

export default function Era2022({era,events}:EraProps){
  const {list,anchor}=chronological(events);
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
        <p className="s22-kicker" data-ent="kicker">版本 {era.year} · 研究预览</p>
        <p className="s22-title" data-ent="title">{era.title}</p>
        <p className="s22-sub" data-ent="sub">{era.subtitle}</p>
        <YearRuler list={list} anchor={anchor}/>
        <YearHow era={era} unit="那时候的 AI 就是一个对话框，每一轮「你问 · 它答」就是一件事，" anchor={anchor} className="yr-how s22-how"/>
      </header>
      {list.map((e,i)=>{const newMonth=i===0||month(list[i-1].date)!==month(e.date);return <Fragment key={e.id}>
        {newMonth&&<div className="s22-month flow-wait"><div className="s22-inner"><div className="s22-gutter"><strong>{month(e.date)} 月</strong></div><span/></div></div>}
        <section id={anchorId(e)} className={'s22-turn flow-wait'+(e.tier==='major'?' major':'')+(e.id===anchor?.id?' anchor':'')} aria-label={monthDay(e.date)+' '+e.name}>
          <Row who="user" gutter={<><time dateTime={e.date}>{monthDay(e.date)}</time><small>{e.tag}</small></>}>
            <span className="s22-q">{e.name}</span>{e.id===anchor?.id&&<span className="s22-badge">本年主展品</span>}
          </Row>
          <Row who="bot"><div className="s22-answer">
            <div className="s22-text">
              <p className="s22-lead">{e.line}</p>
              {e.tier==='major'&&<p>{e.detail}</p>}
              <p className="s22-meta"><span>{categoryName(e.category)}</span><a href={exhibitHref(e)}>查看展品 →</a></p>
            </div>
            <Thumb e={e}/>
          </div></Row>
        </section>
      </Fragment>})}
      <div className="s22-dock">
        <div className="s22-input"><span>发送消息……</span><span aria-hidden="true">➤</span></div>
        <p className="s22-note">{era.note}<span>编者手记</span></p>
      </div>
    </div>
  </div></div>;
}
