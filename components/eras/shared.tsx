import {type TimelineEvent,type CategoryId,eras,categories} from '@/lib/museum';
import thumbnailFiles from '@/lib/image-thumbnails.json';

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

// 展品图：一律完整显示（contain），不裁切官方横幅和论文插图。有视频的展品在缩略图上标一个"视频"角标。
// data-ex 给转场脚本找图用；named 表示这是详情页的主图，固定起转场名，缩略图飞进来时落在它上面。
const vtName=(event:TimelineEvent,named:boolean)=>named?{viewTransitionName:'ex-'+event.id}:undefined;
export function ExhibitImg({event,className='exhibit-img',named=false}:{event:TimelineEvent;className?:string;named?:boolean}){
  if(!event.image)return null;
  const {src,alt,width,height,video}=event.image;
  const img=<img className={className} src={named?src:(thumbnailFiles as Record<string,string>)[src]??src} alt={alt} width={width} height={height} loading={named?'eager':'lazy'} decoding="async" data-ex={event.id} style={vtName(event,named)}/>;
  return video?<>{img}<span className="video-badge" aria-label="视频">▶ 视频</span></>:img;
}

// 详情页：有视频就直接放视频，封面用同一帧。
export function ExhibitVideo({event}:{event:TimelineEvent}){
  if(!event.image?.video)return null;
  const {src,video,width,height,alt}=event.image;
  // 官方原片未附字幕；保留原片，不编造字幕轨。
  // oxlint-disable-next-line jsx-a11y/media-has-caption
  return <video className="exhibit-img exhibit-video" src={video} poster={src} width={width} height={height} controls playsInline preload="metadata" aria-label={alt} data-ex={event.id} style={vtName(event,true)}/>;
}
