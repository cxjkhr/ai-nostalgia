
import {type TimelineEvent,dateLabel,categories} from '@/lib/museum';
import ExhibitVisual from '@/components/exhibit-visual';
import {skinOf,skinInfo} from '@/components/eras/shared';
// 展品目录：按年份分组，每组套上那一年的界面皮肤。
export default function ExhibitGrid({items}:{items:TimelineEvent[]}){const years=[...new Set(items.map(e=>e.year))];return <div className="xgroups">{years.map(y=>{const skin=skinOf(y),list=items.filter(e=>e.year===y);return <section key={y} className={'xgroup skin s'+skin} aria-labelledby={'group-'+y}><div className="xgroup-inner"><h2 className="xgroup-head" id={'group-'+y}><strong>{y}</strong><span>{skinInfo[skin].label}</span><small>{list.length} 件</small></h2><div className="xgrid">{list.map(e=><a className={'xcard'+(e.tier==='minor'?' minor':'')} key={e.id} href={'/exhibits/'+e.id}><span className="xthumb"><ExhibitVisual event={e}/></span><span className="xcopy"><span className="xmeta"><time dateTime={e.date}>{dateLabel(e.date)}</time><span>{categories.find(c=>c.id===e.category)?.name}</span></span><strong>{e.name}</strong><span className="xline">{e.line}</span></span></a>)}</div></div></section>})}</div>}
