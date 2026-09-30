import {Fragment,type ReactNode} from 'react';
import {type EraProps,exhibitHref,anchorId,dotDate,ExhibitImg} from '@/components/eras/shared';

// 2022：研究预览时代的对话框。灰底、左侧会话列表、一问一答整行交替。
function Row({who,id,children}:{who:'user'|'bot';id?:string;children:ReactNode}){
  return <div className={'s22-row '+who} id={id}><div className="s22-inner"><span className="s22-av" aria-hidden="true">{who==='user'?'你':'✳'}</span><div className="s22-msg">{children}</div></div></div>;
}

export default function Era2022({era,events}:EraProps){
  return <div className="skin s2022"><div className="s22-app">
    <aside className="s22-side" aria-label={era.year+' 年会话列表'}>
      <div className="s22-new">＋ 新对话</div>
      <p className="s22-group">{era.year}</p>
      <ol>{events.map(e=><li key={e.id}><a href={'#'+anchorId(e)}><span aria-hidden="true">▭</span>{e.name}</a></li>)}</ol>
      <p className="s22-side-foot">研究预览 · 免费体验</p>
    </aside>
    <div className="s22-main">
      <p className="s22-model">默认模型 · {era.year} 年</p>
      <Row who="user">你好</Row>
      <Row who="bot"><p className="s22-greet">{era.title}</p><p>{era.subtitle}</p></Row>
      {events.map(e=><Fragment key={e.id}>
        <Row who="user" id={anchorId(e)}>{e.name}<time dateTime={e.date}>{dotDate(e.date)}</time></Row>
        <Row who="bot">
          <p className="s22-lead">{e.line}</p>
          {e.tier==='major'&&<p>{e.detail}</p>}
          {e.tier==='major'&&e.visual==='image'&&<a className="s22-media" href={exhibitHref(e)}><ExhibitImg event={e}/></a>}
          <a className="s22-more" href={exhibitHref(e)}>查看展品 →</a>
        </Row>
      </Fragment>)}
      <div className="s22-dock">
        <div className="s22-input"><span>发送消息……</span><span aria-hidden="true">➤</span></div>
        <p className="s22-note">{era.note}<span>编者手记</span></p>
      </div>
    </div>
  </div></div>;
}
