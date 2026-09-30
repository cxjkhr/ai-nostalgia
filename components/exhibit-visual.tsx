import ChatWindow from '@/components/chat-window';
import {type TimelineEvent} from '@/lib/museum';
import {ExhibitImg,ExhibitVideo} from '@/components/eras/shared';
export default function ExhibitVisual({event,expanded=false}:{event:TimelineEvent;expanded?:boolean}){
 if(event.visual==='image'&&event.image)return expanded&&event.image.video?<ExhibitVideo event={event}/>:<ExhibitImg event={event}/>;
 if(event.visual==='chat')return <ChatWindow expanded={expanded}/>;
 return <div className="exhibit-plate"><span>{event.year} · 档案</span><strong>{event.name}</strong><small>暂无可考的原始图片</small></div>;
}
