
import {notFound} from 'next/navigation';
import {events,categories,categoryFor,dateLabel} from '@/lib/museum';
import ExhibitVisual from '@/components/exhibit-visual';
export function generateStaticParams(){return events.map(e=>({slug:e.id}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const event=events.find(e=>e.id===slug);return {title:event?event.name+' · AI Museum':'展品未找到 · AI Museum',description:event?.detail}}
export default async function Exhibit({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const index=events.findIndex(e=>e.id===slug);if(index<0)notFound();
 const event=events[index],previous=events[index-1],next=events[index+1];const category=categories.find(c=>c.id===categoryFor(event))!;
 return <main className="detail-main"><nav className="breadcrumbs" aria-label="面包屑"><a href="/">首页</a><span>›</span><a href={'/collections/'+category.id}>{category.name}</a><span>›</span><span>{event.name}</span></nav>
 <article className="detail-panel"><header className="detail-heading"><span className="museum-kicker">EXHIBIT {String(index+1).padStart(2,'0')} / {String(events.length).padStart(2,'0')}</span><h1>{event.name}</h1><div className="title-rule"/><time dateTime={event.date}>{dateLabel(event.date)}</time></header>
 <div className="detail-body"><p className="detail-lead">{event.detail}</p><figure className="detail-figure"><div className="detail-media"><ExhibitVisual key={event.id} event={event} expanded/></div><figcaption>{event.name}<span>{event.visual==='image'?'CompVis 官方仓库原始样例':event.visual==='chat'?'界面意象重构 · 预设演示对话，非历史原始记录':'编辑式档案展示 · 非历史界面截图'}</span></figcaption></figure><div className="detail-sources"><span>资料来源</span><a href={event.source} target="_blank" rel="noreferrer">原始发布资料 ↗</a>{event.visual==='image'&&<a href="https://github.com/CompVis/stable-diffusion/blob/main/assets/stable-samples/txt2img/000002025.png" target="_blank" rel="noreferrer">原始图片 ↗</a>}<a href={'/history#year-'+event.year}>返回 {event.year} 年时间线 →</a></div></div>
 {next&&<a className="detail-next-side" href={'/exhibits/'+next.id} aria-label={'Next：'+next.name}>Next →</a>}
 <nav className="exhibit-pagination" aria-label="按时间浏览相邻展品">{previous?<a rel="prev" href={'/exhibits/'+previous.id}><span>← Previous</span><strong>{previous.name}</strong></a>:<div className="sequence-edge"><span>START OF THE COLLECTION</span><strong>这是第一件展品</strong></div>}<div className="sequence-count">{index+1} / {events.length}<small>按时间顺序</small></div>{next?<a rel="next" href={'/exhibits/'+next.id}><span>Next →</span><strong>{next.name}</strong></a>:<a href="/"><span>已到最后一件</span><strong>返回全部展品 →</strong></a>}</nav></article></main>
}

