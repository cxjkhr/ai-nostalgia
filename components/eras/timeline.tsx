import {type TimelineEvent} from '@/lib/museum';
import {type Era,anchorId,monthDay,yearProgress,exhibitHref,ExhibitImg} from '@/components/eras/shared';

// 每个年份页共用的时间线部件：全年刻度、"怎么看这一页"、按日期排序、缩略图。
// 配色由各年皮肤的 --yr-* 变量决定（见 eras.css）。

export const monthOf=(d:string)=>Number(d.slice(5,7));
export const isNewMonth=(list:TimelineEvent[],i:number)=>i===0||monthOf(list[i-1].date)!==monthOf(list[i].date);

// 时间线一律按日期排；本年主展品（eventsInYear 的第一件）留在它自己的日期上，另作标记。
export function chronological(events:TimelineEvent[]){
  return {list:[...events].sort((a,b)=>a.date.localeCompare(b.date)),anchor:events[0]};
}

// 点都落在轴上；重要节点的名字立在轴的上下两侧。两侧各自按名字的大致宽度避让，撞上就往自己那侧再错一层；
// 新名字优先放目前层数少的一侧，持平就换到上一条的另一侧，于是名字上下交替，不会全堆在轴上方。
// width 是刻度大致的像素宽，只用来估算名字占多少百分比。
const graphemes=new Intl.Segmenter('zh-CN',{granularity:'grapheme'});
const textWidth=(t:string)=>Array.from(graphemes.segment(t),x=>x.segment).reduce((w,c)=>w+(c.charCodeAt(0)>0x2e80?13:7.5),0)+10;
function marks(list:TimelineEvent[],width:number){
  const sides:{from:number;to:number}[][][]=[[],[]]; // [上侧各层, 下侧各层]
  let prev=1; // 上一条放的侧（0 上 / 1 下）；先给 1，让第一条名字落在上方
  return list.map(e=>{
    const x=yearProgress(e.date);
    if(e.tier!=='major')return {e,x,lane:-1,side:0,edge:''};
    const w=textWidth(e.name)/width*100;
    // 靠两端的名字不居中，改成向里对齐，免得伸出刻度。
    const edge=x-w/2<0?'l':x+w/2>100?'r':'';
    const from=edge==='l'?x-1:edge==='r'?x-w+1:x-w/2,to=from+w;
    const side=sides[0].length!==sides[1].length?(sides[0].length<sides[1].length?0:1):1-prev;
    let lane=0;while(sides[side][lane]?.some(r=>from<r.to&&to>r.from))lane++;
    (sides[side][lane]??=[]).push({from,to});
    prev=side;
    return {e,x,lane,side,edge};
  });
}

export function YearRuler({list,anchor,width=900}:{list:TimelineEvent[];anchor?:TimelineEvent;width?:number}){
  const m=marks(list,width);
  const n=Math.max(0,...m.map(k=>k.side===0?k.lane:-1))+1;   // 上侧层数
  const dn=Math.max(0,...m.map(k=>k.side===1?k.lane:-1))+1;  // 下侧层数
  return <div className="yr" data-ent="ruler" style={{'--lanes':n,'--dn-lanes':dn} as React.CSSProperties}>
    {m.map(({e,x,lane,side,edge})=><a key={e.id} href={'#'+anchorId(e)} aria-label={e.name+' · '+monthDay(e.date)} data-spy={anchorId(e)} className={'yr-dot'+(lane>=0?' major':'')+(side===1?' dn':'')+(edge?' '+edge:'')+(e.id===anchor?.id?' anchor':'')} style={{left:x+'%','--x':Math.round(x),'--lane':Math.max(lane,0)} as React.CSSProperties}><i aria-hidden="true"/><b>{e.name}<small>{monthDay(e.date)}</small></b></a>)}
    <div className="yr-track" aria-hidden="true">{Array.from({length:12},(_,i)=><span key={i}>{i+1}月</span>)}</div>
  </div>;
}

// "怎么看这一页"：先说这一年的界面长什么样，再说怎么读。
export function YearHow({era,unit,anchor,className='yr-how'}:{era:Era;unit:string;anchor?:TimelineEvent;className?:string}){
  return <p className={className} data-ent="how">这一页是 {era.year} 年的样子：{unit}按时间从上往下排，上面刻度里大一点的点是重要节点{anchor&&<>，最重要的是 <a href={'#'+anchorId(anchor)}>{anchor.name}（{monthDay(anchor.date)}）</a></>}。点图片或「查看展品」进入详情。</p>;
}

// 可点的缩略图：点图和点"查看展品"一样进详情页；没有可考原图的展品不放。
export function Thumb({e,className}:{e:TimelineEvent;className:string}){
  if(!(e.visual==='image'&&e.image))return null;
  return <a className={className} href={exhibitHref(e)} aria-label={'查看展品：'+e.name}><ExhibitImg event={e}/><span aria-hidden="true">查看展品 →</span></a>;
}
