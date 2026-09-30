import {eras,eventsInYear} from '@/lib/museum';
import {skinOf,skinInfo} from '@/components/eras/shared';
import {EraSkin} from '@/components/eras';
import YearNav from '@/components/year-nav';

// 首页时间线：每一年先过一段"载入界面"的过场，再进入那一年的界面皮肤。
export default function HistoryTimeline(){
  return <><YearNav/><div className="timeline">{eras.map(era=>{
    const skin=skinOf(era.year),list=eventsInYear(era.year);
    return <section key={era.year} id={'year-'+era.year} className="era" aria-labelledby={'heading-'+era.year}>
      <header className="era-banner" data-era={skin}><div className="era-banner-inner">
        <h2 id={'heading-'+era.year}><span className="era-year">{era.year}</span><span className="era-tag">{era.tag}</span></h2>
        <div className="era-load">
          <p><span>正在载入 {era.year} 年的界面</span><span>{skinInfo[skin].label} · {list.length} 件展品</span></p>
          <span className="era-load-bar" aria-hidden="true"><span/></span>
          <small>{skinInfo[skin].hint}</small>
        </div>
      </div></header>
      <EraSkin skin={skin} era={era} events={list}/>
    </section>})}
    <div className="timeline-end"><p>故事，还在往下写。</p><span>TO BE CONTINUED</span></div>
  </div></>;
}
