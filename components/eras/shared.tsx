import {type TimelineEvent,type CategoryId,eras,categories} from '@/lib/museum';

// 每一年一套"那年的界面"皮肤；新增年份没有专属皮肤时，沿用最新一套。
export const skins=['2022','2023','2024','2025','2026'] as const;
export type Skin=(typeof skins)[number];
export function skinOf(year:string):Skin{return (skins as readonly string[]).includes(year)?year as Skin:skins[skins.length-1]}

// 皮肤名只描述那一年界面的共同气质，不指向、不复刻任何具体产品。
export const skinInfo:Record<Skin,{label:string;hint:string}>={
  '2022':{label:'研究预览',hint:'灰底对话框，一问一答'},
  '2023':{label:'社区频道',hint:'机器人在频道里发公告'},
  '2024':{label:'多模态',hint:'渐变、语音、会动的画面'},
  '2025':{label:'深度思考',hint:'答案之前，先想一想'},
  '2026':{label:'手绘动画',hint:'AI 用代码一笔一笔画出来的分镜本'},
};

export type Era=(typeof eras)[number];
export type EraProps={era:Era;events:TimelineEvent[]};

export const exhibitHref=(e:TimelineEvent)=>'/exhibits/'+e.id;
export const anchorId=(e:TimelineEvent)=>'e-'+e.id;
export const dotDate=(d:string)=>d.replaceAll('-','.');
export const monthDay=(d:string)=>d.slice(5).replace('-','.');
export const categoryName=(id:CategoryId)=>categories.find(c=>c.id===id)?.name??'';

// 事件落在当年的第几天，用来画 2024 播放器的进度条。
export function yearProgress(date:string){
  const d=new Date(date+'T00:00:00Z'),start=Date.UTC(d.getUTCFullYear(),0,1),end=Date.UTC(d.getUTCFullYear()+1,0,1);
  return Math.round((d.getTime()-start)/(end-start)*1000)/10;
}

// 展品图：一律完整显示（contain），不裁切官方横幅和论文插图。
export function ExhibitImg({event,className='exhibit-img'}:{event:TimelineEvent;className?:string}){
  if(!event.image)return null;
  const {src,alt,width,height}=event.image;
  return <img className={className} src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async"/>;
}
