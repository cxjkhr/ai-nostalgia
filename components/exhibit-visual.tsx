import ChatWindow from '@/components/chat-window';
import {type TimelineEvent} from '@/lib/museum';
export default function ExhibitVisual({event,expanded=false}:{event:TimelineEvent;expanded?:boolean}){
 if(event.visual==='image')return <img className="museum-original-image" src="/stable-diffusion.png" alt="CompVis 官方仓库中的 Stable Diffusion 原始生成样例" width={1024} height={512}/>;
 if(event.visual==='chat')return <ChatWindow expanded={expanded}/>;
 return <div className={'archive-plate plate-'+event.id}><span>AI MUSEUM / {event.year}</span><strong>{event.name}</strong><p>{event.line}</p><small>{event.tag} · 编辑式档案展示</small></div>;
}

