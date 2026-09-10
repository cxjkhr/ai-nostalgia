import Link from 'next/link';
import {type TimelineEvent,dateLabel,categoryFor,categories} from '@/lib/museum';
import ExhibitVisual from '@/components/exhibit-visual';
export default function ExhibitGrid({items}:{items:TimelineEvent[]}){return <div className="museum-grid">{items.map(e=><article className="museum-card" key={e.id}><Link href={'/exhibits/'+e.id} className="museum-card-link"><div className="museum-thumb"><ExhibitVisual event={e}/></div><div className="museum-card-copy"><div className="card-meta"><time dateTime={e.date}>{dateLabel(e.date)}</time><span>{categories.find(c=>c.id===categoryFor(e))?.name}</span></div><h2>{e.name}<span aria-hidden="true">↗</span></h2><p>{e.line}</p></div></Link></article>)}</div>}

