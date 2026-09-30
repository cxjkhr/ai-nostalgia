import {type TimelineEvent,eras,eventsInYear} from '@/lib/museum';
import {skinOf,skinInfo,type Skin,type Era} from '@/components/eras/shared';

// 开屏的"选服"列表：每个版本一条竖屏，里面是那一年界面的缩影（取当年真实展品）。
function Preview({skin,era,list}:{skin:Skin;era:Era;list:TimelineEvent[]}){
  const [top,second]=list,minors=list.filter(e=>e.tier==='minor').slice(0,3);
  switch(skin){
    case '2022':return <span className="pv pv22">
      <span className="pv22-row user"><i>你</i>你好</span>
      <span className="pv22-row bot"><i>✳</i><b>{era.title}</b></span>
      <span className="pv22-row user"><i>你</i>{top?.name}</span>
      <span className="pv22-row bot"><i>✳</i><span>{top?.line}</span></span>
      <span className="pv22-row user"><i>你</i>{second?.name}</span>
      <span className="pv22-row bot"><i>✳</i><span>{second?.line}<u/></span></span>
      <span className="pv22-input">发送消息……</span>
    </span>;
    case '2023':return <span className="pv pv23">
      <span className="pv23-head"># {era.year}-大事记</span>
      <span className="pv23-msg"><i>档</i><span><b>档案馆</b><em>机器人</em><br/>{top?.line}</span></span>
      <span className="pv23-embed"><b>{top?.name}</b><span>{top?.detail}</span></span>
      <span className="pv23-input">在 #{era.year}-大事记 里说点什么</span>
    </span>;
    case '2024':return <span className="pv pv24">
      <span className="pv24-orb"/>
      <b className="pv24-title">{era.title}</b>
      <span className="pv24-prompt">描述你想看到的画面……<i>↑</i></span>
      <span className="pv24-player"><span className="pv24-play">▶</span><span className="pv24-scrub"><span/></span></span>
    </span>;
    case '2025':return <span className="pv pv25">
      <b className="pv25-title">{era.title}</b>
      <span className="pv25-user">{top?.name}</span>
      <span className="pv25-think">已思考片刻 ▾</span>
      <span className="pv25-line">{top?.line}</span>
      <span className="pv25-tasks"><em>待办 · {minors.length} 项已完成</em>{minors.map(e=><span key={e.id}><i>✓</i>{e.name}</span>)}</span>
      <span className="pv25-composer">给 AI 发送消息<i>↑</i></span>
    </span>;
    default:{
      const colors=['#ffd23f','#ff5fa2','#2f63d6','#1fa56b'];
      return <span className="pv pv26">
        <span className="pv26-kicker">分镜本 · {era.year}</span>
        <b className="pv26-title">{era.title}</b>
        <span className="pv26-grid">{list.slice(0,4).map((e,k)=><span key={e.id} className="pv26-cell"><span style={{'--c':colors[k]} as React.CSSProperties}/><em>#{String(k+1).padStart(2,'0')}</em><b>{e.name}</b></span>)}</span>
      </span>;
    }
  }
}

export default function ServerList(){
  return <ol className="servers">{eras.map((era,i)=>{
    const skin=skinOf(era.year),list=eventsInYear(era.year),live=i===eras.length-1;
    return <li key={era.year} style={{'--i':i} as React.CSSProperties}><a href={'/year/'+era.year} className={'server skin s'+skin}>
      <span className="server-screen" aria-hidden="true"><Preview skin={skin} era={era} list={list}/></span>
      <span className="server-info">
        <span className="server-status"><i/>{live?'正式服 · 当前版本':'怀旧服'}</span>
        <strong className="server-year">{era.year}</strong>
        <span className="server-name">{skinInfo[skin].label}</span>
        <span className="server-meta">{era.tag} · {list.length} 件展品</span>
        <span className="server-enter">进入 {era.year} →</span>
      </span>
    </a></li>})}</ol>;
}
