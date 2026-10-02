import {Fragment} from 'react';
import {type TimelineEvent,type CategoryId,eras} from '@/lib/museum';
import {type EraProps,exhibitHref,anchorId,monthDay,categoryName} from '@/components/eras/shared';
import {chronological,monthOf,isNewMonth,YearRuler,YearHow,Thumb} from '@/components/eras/timeline';
import ScrollSpy from '@/components/scroll-spy';

// 2023：社区频道。机器人按时间顺序在频道里发公告，按月分隔；主展品标"本年主展品"，每条消息带图片附件。
const channel:Record<CategoryId,string>={models:'对话',images:'作图',video:'视频',audio:'声音',agents:'插件与智能体',open:'开源'};
const slash=(d:string)=>d.replaceAll('-','/');

function Message({e,anchor}:{e:TimelineEvent;anchor:boolean}){
  if(e.tier==='minor')return <article className="s23-msg compact flow-wait" id={anchorId(e)}>
    <time dateTime={e.date}>{e.date.slice(5).replace('-','/')}</time>
    <div className="s23-compact-body">
      <p><a href={exhibitHref(e)}>{e.name}</a> —— {e.line}<span className="s23-ch">#{channel[e.category]}</span><a className="s23-more" href={exhibitHref(e)}>查看展品 →</a></p>
      <Thumb e={e} className="s23-attach"/>
    </div>
  </article>;
  return <article className={'s23-msg flow-wait'+(anchor?' pinned':'')} id={anchorId(e)}>
    <span className="s23-av" aria-hidden="true">档</span>
    <div className="s23-body">
      <div className="s23-meta"><strong>档案馆</strong><span className="s23-bot">机器人</span><time dateTime={e.date}>{slash(e.date)}</time>{anchor&&<span className="s23-star">📌 本年主展品</span>}</div>
      <p>{e.line}</p>
      <div className="s23-embed">
        <span className="s23-embed-site">#{channel[e.category]} · {categoryName(e.category)}</span>
        <a href={exhibitHref(e)}><strong>{e.name}</strong></a>
        <span className="s23-embed-text">{e.detail}</span>
        <Thumb e={e} className="s23-attach big"/>
        <a className="s23-more" href={exhibitHref(e)}>查看展品 →</a>
      </div>
    </div>
  </article>;
}

export default function Era2023({era,events}:EraProps){
  const {list,anchor}=chronological(events);
  const used=[...new Set(list.map(e=>e.category))];
  const months=[...new Set(list.map(e=>monthOf(e.date)))];
  return <div className="skin s2023"><ScrollSpy links=".s2023 [data-spy]"/><div className="s23-app">
    <nav className="s23-rail" aria-label="切换年份">
      <span className="s23-home" aria-hidden="true">档</span>
      {eras.map(e=><a key={e.year} href={'/year/'+e.year} aria-current={e.year===era.year?'true':undefined}>{e.year.slice(2)}</a>)}
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
        <div className="s23-welcome">
          <span aria-hidden="true">#</span>
          <p className="s23-welcome-title" data-ent="title">欢迎来到 #{era.year}-大事记</p>
          <p className="s23-welcome-sub" data-ent="sub">{era.title}</p>
          <YearRuler list={list} anchor={anchor} width={685}/>
          <YearHow unit="此时的 AI，还是社区里的小圈子自嗨。" className="yr-how s23-how"/>
        </div>
        {list.map((e,i)=><Fragment key={e.id}>
          {isNewMonth(list,i)&&<p className="s23-divider flow-wait"><span>{era.year} 年 {monthOf(e.date)} 月</span></p>}
          <Message e={e} anchor={e.id===anchor?.id}/>
        </Fragment>)}
      </div>
      <div className="s23-dock"><div className="s23-input"><span aria-hidden="true">＋</span>在 #{era.year}-大事记 里说点什么</div></div>
    </div>
    <aside className="s23-pins" aria-label={era.year+' 年目录与编者手记'}>
      <p className="s23-cat">置顶 · 编者手记</p><blockquote>{era.note}</blockquote>
      <p className="s23-cat">本频道 · {list.length} 条</p>
      <nav className="s23-index">{months.map(m=><Fragment key={m}>
        <p className="s23-index-month">{m} 月</p>
        {list.filter(e=>monthOf(e.date)===m).map(e=><a key={e.id} href={'#'+anchorId(e)} data-spy={anchorId(e)}><time dateTime={e.date}>{monthDay(e.date)}</time><span>{e.name}</span></a>)}
      </Fragment>)}</nav>
    </aside>
  </div></div>;
}
