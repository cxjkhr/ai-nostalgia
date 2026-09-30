import {type TimelineEvent} from '@/lib/museum';
import {type EraProps,exhibitHref,anchorId,dotDate,monthDay,yearProgress,ExhibitImg} from '@/components/eras/shared';

// 2024：多模态。柔和渐变、语音光球、每件大展品都是一段"生成好的视频"。
function Player({e}:{e:TimelineEvent}){
  const p=yearProgress(e.date);
  return <a className="s24-player" href={exhibitHref(e)} aria-label={'查看 '+e.name}>
    {e.visual==='image'?<ExhibitImg event={e}/>:<span className="s24-blank">{e.name}</span>}
    <span className="s24-play" aria-hidden="true">▶</span>
    <span className="s24-scrub" aria-hidden="true"><span style={{width:p+'%'}}/></span>
    <span className="s24-time">{dotDate(e.date)}</span>
  </a>;
}

export default function Era2024({era,events}:EraProps){
  return <div className="skin s2024"><div className="s24-wrap">
    <div className="s24-hero">
      <span className="s24-orb" aria-hidden="true"/>
      <p className="s24-title">{era.title}</p>
      <p className="s24-sub">{era.subtitle}</p>
      <div className="s24-prompt" aria-hidden="true"><span>＋</span><span className="s24-prompt-text">描述你想看到的画面……</span><span className="s24-voice">按住说话</span><span className="s24-go">↑</span></div>
    </div>
    <ol className="s24-grid">{events.map(e=>e.tier==='major'
      ?<li key={e.id} id={anchorId(e)} className="s24-card major"><Player e={e}/><div className="s24-copy">
        <span className="s24-chip">{e.tag}</span>
        <p className="s24-name"><a href={exhibitHref(e)}>{e.name}</a></p>
        <p className="s24-line">{e.line}</p>
        <p className="s24-detail">{e.detail}</p>
      </div></li>
      :<li key={e.id} id={anchorId(e)} className="s24-card minor"><a href={exhibitHref(e)}>
        <span className="s24-thumb">{e.visual==='image'?<ExhibitImg event={e}/>:null}</span>
        <span className="s24-mini"><time dateTime={e.date}>{monthDay(e.date)} · {e.tag}</time><strong>{e.name}</strong><span>{e.line}</span></span>
      </a></li>)}</ol>
    <p className="s24-caption"><span>{era.note}</span><small>编者手记</small></p>
  </div></div>;
}
