'use client';

import {useRef,useState} from 'react';
import type {ExhibitWork} from '@/lib/showcase';

const kindNames={image:'图片',video:'视频',audio:'音频',interactive:'交互作品'};

function Work({work}:{work:ExhibitWork}) {
  const [started,setStarted]=useState(false);
  const [failed,setFailed]=useState(false);
  const [run,setRun]=useState(0);
  const dialog=useRef<HTMLDialogElement>(null);
  const opener=useRef<HTMLButtonElement>(null);
  const closeImage=()=>{dialog.current?.close();opener.current?.focus()};
  return <article className="showcase-work">
    <header className="work-heading"><span>{kindNames[work.kind]} / {work.date}</span><h3>{work.title}</h3><span className="work-provenance">{work.provenance}</span></header>
    {work.kind==='image'&&<>
      <button className="work-image-button" ref={opener} onClick={()=>dialog.current?.showModal()} aria-label={'放大查看：'+work.title}><img src={work.src} alt={work.alt??work.title} loading="lazy" decoding="async" onError={()=>setFailed(true)}/><span>点击查看大图 ↗</span></button>
      <dialog ref={dialog} className="work-lightbox" onClose={()=>opener.current?.focus()} aria-label={work.title}><button autoFocus onClick={closeImage}>关闭大图 ×</button><img src={work.src} alt={work.alt??work.title}/></dialog>
    </>}
    {/* 原始影音未附字幕，保留原样；文字描述与发布来源在播放器下方，不编造逐字稿。 */}
    {/* oxlint-disable jsx-a11y/media-has-caption */}
    {work.kind==='video'&&<video src={work.src} controls playsInline preload="none" poster={work.poster} aria-label={work.title} onError={()=>setFailed(true)}>你的浏览器暂不支持播放此视频。</video>}
    {work.kind==='audio'&&<div className="work-audio"><span aria-hidden="true">♫</span><audio src={work.src} controls preload="none" aria-label={work.title} onError={()=>setFailed(true)}>你的浏览器暂不支持播放此音频。</audio></div>}
    {/* oxlint-enable jsx-a11y/media-has-caption */}
    {work.kind==='interactive'&&<div className="work-interactive">
      {started?<><iframe key={run} src={work.src} title={work.title} sandbox="allow-scripts" referrerPolicy="no-referrer"/><div className="work-controls"><button onClick={()=>setRun(n=>n+1)}>重新开始</button><button onClick={()=>setStarted(false)}>收起作品</button></div></>:<div className="work-launch"><span aria-hidden="true">↗</span><p>把当时生成的作品，重新打开。</p><button onClick={()=>setStarted(true)}>玩一下这个游戏</button></div>}
    </div>}
    {failed&&<output className="work-fallback">素材暂时无法加载。可以通过下方来源链接查看原始发布。</output>}
    <p className="work-description">{work.description}</p>
    {work.prompt&&<details><summary>查看原始提示词</summary><p className="work-prompt">{work.prompt}</p></details>}
    {work.transcript&&<details><summary>查看文字内容</summary><p className="work-prompt">{work.transcript}</p></details>}
    <a className="work-source" href={work.sourceUrl} target="_blank" rel="noreferrer">{work.sourceLabel??'查看原始发布'} ↗</a>
  </article>;
}

export default function ExhibitShowcase({works}:{works:ExhibitWork[]}) {
  const [selected,setSelected]=useState(works[0].id);
  const work=works.find(item=>item.id===selected)??works[0];
  return <section className="exhibit-showcase" aria-labelledby="showcase-title">
    <div className="showcase-heading"><div><span className="museum-kicker">IN THE COLLECTION</span><h2 id="showcase-title">展品展示</h2></div><span>{works.length} 件作品</span></div>
    {works.length>1&&<div className="work-picker" aria-label="选择作品">{works.map(item=><button key={item.id} aria-pressed={item.id===work.id} onClick={()=>setSelected(item.id)}>{item.title}</button>)}</div>}
    <Work key={work.id} work={work}/>
  </section>;
}
