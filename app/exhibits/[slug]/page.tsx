
import {notFound} from 'next/navigation';
import {events,categories,dateLabel,eventsInYear} from '@/lib/museum';
import {comments} from '@/lib/comments';
import ExhibitVisual from '@/components/exhibit-visual';
import CommentWall from '@/components/comment-wall';
import {skinOf,skinInfo,type Skin} from '@/components/eras/shared';
import {thinking} from '@/components/eras/era-2025';
export function generateStaticParams(){return events.map(e=>({slug:e.id}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const event=events.find(e=>e.id===slug);return {title:event?event.name+' · AI 怀旧服':'展品未找到 · AI 怀旧服',description:event?.detail}}
// 详情页按展品所属年份换皮：提问的样子跟着那一年的界面走。
const ask:Record<Skin,(name:string,id:string)=>string>={'2022':n=>n,'2023':n=>'/查档 '+n,'2024':n=>'生成：'+n,'2025':n=>n,'2026':(_,id)=>'$ nostalgia show '+id};
export default async function Exhibit({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const index=events.findIndex(e=>e.id===slug);if(index<0)notFound();
 const event=events[index],previous=events[index-1],next=events[index+1];const category=categories.find(c=>c.id===event.category)!;
 const skin=skinOf(event.year),yearEvents=eventsInYear(event.year),thread=comments[event.id]??[];
 return <main className={'detail skin s'+skin}><div className="dx-app">
 <aside className="dx-side" aria-label={event.year+' 年展品'}><p className="dx-side-head">{event.year} · {skinInfo[skin].label}</p><ol>{yearEvents.map(x=><li key={x.id}><a href={'/exhibits/'+x.id} aria-current={x.id===event.id?'page':undefined}>{x.name}</a></li>)}</ol><a className="dx-side-back" href={'/#year-'+event.year}>← 回到 {event.year} 年时间线</a></aside>
 <article className="dx-main"><nav className="breadcrumbs" aria-label="面包屑"><a href="/">首页</a><span>›</span><a href={'/collections/'+category.id}>{category.name}</a><span>›</span><span>{event.name}</span></nav>
 <header className="dx-head"><p className="dx-kicker">展品 {String(index+1).padStart(2,'0')} / {String(events.length).padStart(2,'0')} · {category.name}</p><h1>{event.name}</h1><p className="dx-date"><time dateTime={event.date}>{dateLabel(event.date)}</time><span>{event.tag}</span></p></header>
 <p className="dx-q"><span className="dx-av" aria-hidden="true">你</span><span>{ask[skin](event.name,event.id)}</span></p>
 <div className="dx-a"><span className="dx-av bot" aria-hidden="true">{skin==='2023'?'档':'✳'}</span><div className="dx-a-body">
  {skin==='2025'&&<details className="s25-think" open><summary>已思考片刻</summary><p>{thinking(event)}</p></details>}
  <p className="dx-lead">{event.line}</p><p className="dx-detail">{event.detail}</p>
  <figure className="dx-figure"><div className="dx-media"><ExhibitVisual key={event.id} event={event} expanded/></div><figcaption>{event.image?.note??(event.visual==='chat'?'界面意象重构 · 预设演示对话，非历史原始记录':'暂无可考的原始图片 · 文字档案')}</figcaption></figure>
  <p className="dx-sources"><span>资料来源</span><a href={event.source} target="_blank" rel="noreferrer">原始发布资料 ↗</a>{event.image?.sourceUrl&&<a href={event.image.sourceUrl} target="_blank" rel="noreferrer">原始图片 ↗</a>}<a href={'/#year-'+event.year}>返回 {event.year} 年时间线 →</a></p>
 </div></div>
 <nav className="dx-pager" aria-label="按时间浏览相邻展品">{previous?<a rel="prev" href={'/exhibits/'+previous.id}><span>← Previous</span><strong>{previous.name}</strong></a>:<div className="dx-edge"><span>START OF THE COLLECTION</span><strong>这是第一件展品</strong></div>}<p className="dx-count">{index+1} / {events.length}<small>按时间顺序</small></p>{next?<a rel="next" href={'/exhibits/'+next.id}><span>Next →</span><strong>{next.name}</strong></a>:<a href="/exhibits"><span>已到最后一件</span><strong>返回全部展品 →</strong></a>}</nav>
 {thread.length?<section className="dx-comments"><p className="dx-kicker">FROM THE COMMENT SECTION · {String(thread.length).padStart(2,'0')}</p><h2>当年评论</h2><p className="comment-disclaimer">以下留言摘编自B站公开视频热评与楼中楼，已匿名化并有删节，我就是时空警察。</p><CommentWall eventId={event.id}/></section>:null}
 </article></div></main>
}
