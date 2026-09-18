import ChatWindow from '@/components/chat-window';
import {type TimelineEvent} from '@/lib/museum';
export default function ExhibitVisual({event,expanded=false}:{event:TimelineEvent;expanded?:boolean}){
 if(event.visual==='image'){
  const sd=event.id==='stable-diffusion';
  return <img className="museum-original-image" src={sd?'/stable-diffusion.png':'/dalle-2.png'} alt={sd?'CompVis 官方仓库中的 Stable Diffusion 原始生成样例':'宇航员骑马与弹贝斯的北极熊——DALL·E 2 生成样例拼图'} width={sd?1024:1213} height={sd?512:600}/>;
 }
 if(event.visual==='chat')return <ChatWindow expanded={expanded}/>;
 return <div className={'archive-plate plate-'+event.id}><span>AI MUSEUM / {event.year}</span><strong>{event.name}</strong><p>{event.line}</p><small>{event.tag} · 编辑式档案展示</small></div>;
}

