import ChatWindow from '@/components/chat-window';
import {type TimelineEvent} from '@/lib/museum';
export default function ExhibitVisual({event,expanded=false}:{event:TimelineEvent;expanded?:boolean}){
 if(event.visual==='image'&&event.image)return <img className="museum-original-image" src={event.image.src} alt={event.image.alt} width={event.image.width} height={event.image.height}/>;
 if(event.visual==='chat')return <ChatWindow expanded={expanded}/>;
 return <div className={'archive-plate plate-'+event.id}><span>AI MUSEUM / {event.year}</span><strong>{event.name}</strong><p>{event.line}</p><small>{event.tag} · 编辑式档案展示</small></div>;
}

