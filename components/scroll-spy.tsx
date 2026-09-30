'use client';
import {useEffect} from 'react';

// 滚到哪件展品，就把带 data-spy="该展品锚点" 的链接标成当前（侧栏目录、全年刻度）。
export default function ScrollSpy({links}:{links:string}){
  useEffect(()=>{
    const els=[...document.querySelectorAll<HTMLElement>(links)];
    const ids=[...new Set(els.map(el=>el.dataset.spy!))];
    const targets=ids.map(id=>document.getElementById(id)).filter((t):t is HTMLElement=>!!t);
    let frame=0;
    const update=()=>{
      frame=0;
      const line=window.innerHeight*.35;
      let current=targets[0]?.id;
      for(const t of targets)if(t.getBoundingClientRect().top<=line)current=t.id;
      for(const el of els){
        if(el.dataset.spy===current){
          el.setAttribute('aria-current','step');
          if(el.closest('aside'))el.scrollIntoView({block:'nearest'});
        }else el.removeAttribute('aria-current');
      }
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    update();
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)};
  },[links]);
  return null;
}
