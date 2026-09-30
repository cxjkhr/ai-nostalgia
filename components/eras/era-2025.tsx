import {type TimelineEvent} from '@/lib/museum';
import {type EraProps,exhibitHref,anchorId,dotDate,monthDay,categoryName,ExhibitImg} from '@/components/eras/shared';

// 2025：深度思考。居中单栏，答案之前先展开一段"思考"，零碎消息收进待办清单。
export function thinking(e:TimelineEvent){
  const [y,m,d]=e.date.split('-');
  return '嗯，要讲的是「'+e.name+'」。先对一下时间：'+y+' 年 '+Number(m)+' 月 '+Number(d)+' 日，归在「'+categoryName(e.category)+'」。关键词是「'+e.tag+'」。先给一句话结论，再补来龙去脉。';
}

type Block={kind:'major';e:TimelineEvent}|{kind:'tasks';list:TimelineEvent[]};
function toBlocks(events:TimelineEvent[]){
  const blocks:Block[]=[];
  for(const e of events){
    const last=blocks[blocks.length-1];
    if(e.tier==='major')blocks.push({kind:'major',e});
    else if(last?.kind==='tasks')last.list.push(e);
    else blocks.push({kind:'tasks',list:[e]});
  }
  return blocks;
}

export default function Era2025({era,events}:EraProps){
  return <div className="skin s2025"><div className="s25-col">
    <div className="s25-greet"><span className="s25-mark" aria-hidden="true"/><p className="s25-title">{era.title}</p><p>{era.subtitle}</p></div>
    {toBlocks(events).map((b,i)=>b.kind==='major'
      ?<div className="s25-turn" key={b.e.id} id={anchorId(b.e)}>
        <p className="s25-user">{b.e.name}</p>
        <div className="s25-ai">
          <details className="s25-think" open={i===0}><summary>已思考片刻 · {dotDate(b.e.date)}</summary><p>{thinking(b.e)}</p></details>
          <p className="s25-lead">{b.e.line}</p>
          <p>{b.e.detail}</p>
          {b.e.visual==='image'&&<a className="s25-media" href={exhibitHref(b.e)}><ExhibitImg event={b.e}/></a>}
          <p className="s25-actions"><a href={exhibitHref(b.e)}>查看展品 →</a><a href={b.e.source} target="_blank" rel="noreferrer">来源 ↗</a></p>
        </div>
      </div>
      :<div className="s25-turn" key={'t'+i}>
        <p className="s25-user">这段时间还发生了什么？</p>
        <div className="s25-ai"><div className="s25-tasks">
          <p className="s25-tasks-head">待办 · {b.list.length} 项已完成</p>
          <ul>{b.list.map(e=><li key={e.id} id={anchorId(e)}><span className="s25-check" aria-hidden="true">✓</span><div><a href={exhibitHref(e)}>{e.name}</a><time dateTime={e.date}>{monthDay(e.date)}</time><p>{e.line}</p></div></li>)}</ul>
        </div></div>
      </div>)}
    <div className="s25-composer" aria-hidden="true"><p>给 AI 发送消息</p><div><span className="s25-pill on">深度思考</span><span className="s25-pill">联网搜索</span><span className="s25-send">↑</span></div></div>
    <p className="s25-foot">{era.note}<span>编者手记</span></p>
  </div></div>;
}
