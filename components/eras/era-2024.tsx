import {type TimelineEvent} from '@/lib/museum';
import {type EraProps,exhibitHref,anchorId,dotDate,monthDay,yearProgress,ExhibitImg} from '@/components/eras/shared';
import {chronological,monthOf,YearRuler,YearHow} from '@/components/eras/timeline';
import ScrollSpy from '@/components/scroll-spy';

// 2024：多模态。柔和渐变、语音光球；按月一行，左边是月份竖线，大展品是一段"生成好的视频"，其余是带封面的卡片。
function Player({e}:{e:TimelineEvent}){
  const p=yearProgress(e.date);
  return <a className="s24-player" href={exhibitHref(e)} aria-label={'查看展品：'+e.name}>
    {e.visual==='image'?<ExhibitImg event={e}/>:<span className="s24-blank">{e.name}</span>}
    <span className="s24-play" aria-hidden="true">▶</span>
    <span className="s24-scrub" aria-hidden="true"><span style={{width:p+'%'}}/></span>
    <span className="s24-time">{dotDate(e.date)}</span>
  </a>;
}

export default function Era2024({era,events}:EraProps){
  const {list,anchor}=chronological(events);
  const months=[...new Set(list.map(e=>monthOf(e.date)))];
  return <div className="skin s2024"><ScrollSpy links=".s2024 [data-spy]"/><div className="s24-wrap">
    <div className="s24-hero">
      <span className="s24-orb" aria-hidden="true"/>
      <p className="s24-title" data-ent="title">{era.title}</p>
      <p className="s24-sub" data-ent="sub">{era.subtitle}</p>
      <div className="s24-prompt" data-ent="sub" aria-hidden="true"><span>＋</span><span className="s24-prompt-text">描述你想看到的画面……</span><span className="s24-voice">按住说话</span><span className="s24-go">↑</span></div>
      <div className="s24-ruler"><YearRuler list={list} anchor={anchor} width={1100}/></div>
      <YearHow era={era} unit="文字之外，AI 开始生成画面和声音，每张卡片就是一件事，大卡片是重要节点，" anchor={anchor} className="yr-how s24-how"/>
    </div>
    <div className="s24-timeline">{months.map(m=><section key={m} className="s24-mrow" aria-label={m+' 月'}>
      <p className="s24-month flow-wait"><span>{m} 月</span></p>
      <ol className="s24-grid">{list.filter(e=>monthOf(e.date)===m).map(e=>e.tier==='major'
      ?<li key={e.id} id={anchorId(e)} className={'s24-card major flow-wait'+(e.id===anchor?.id?' anchor':'')}><Player e={e}/><div className="s24-copy">
        <span className="s24-chip">{e.id===anchor?.id?'本年主展品 · ':''}{e.tag}</span>
        <p className="s24-name"><a href={exhibitHref(e)}>{e.name}</a></p>
        <p className="s24-line">{e.line}</p>
        <p className="s24-detail">{e.detail}</p>
        <a className="s24-more" href={exhibitHref(e)}>查看展品 →</a>
      </div></li>
      :<li key={e.id} id={anchorId(e)} className="s24-card minor flow-wait"><a href={exhibitHref(e)} aria-label={'查看展品：'+e.name}>
        <span className="s24-thumb">{e.visual==='image'?<ExhibitImg event={e}/>:null}</span>
        <span className="s24-mini"><time dateTime={e.date}>{monthDay(e.date)} · {e.tag}</time><strong>{e.name}</strong><span>{e.line}</span><em>查看展品 →</em></span>
      </a></li>)}</ol>
    </section>)}</div>
    <p className="s24-caption"><span>{era.note}</span><small>编者手记</small></p>
  </div></div>;
}
