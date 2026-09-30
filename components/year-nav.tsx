'use client';
import {useState,useRef,useEffect} from 'react';
import {eras} from '@/lib/museum';
import {skinInfo,skinOf} from '@/components/eras/shared';

// 吸顶的年份切换条：滚到哪一年，切换条就换成那一年的配色。
export default function YearNav(){
  const [year,setYear]=useState(eras[0].year);
  const navRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      const navHeight=navRef.current?.offsetHeight??56;
      document.documentElement.style.setProperty('--timeline-nav-height',navHeight+'px');
      const threshold=navHeight+120;
      let current=eras[0].year;
      for(const e of eras){
        const section=document.getElementById('year-'+e.year);
        if(section&&section.getBoundingClientRect().top<=threshold)current=e.year;
      }
      setYear(current);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    const resize=new ResizeObserver(schedule);
    if(navRef.current)resize.observe(navRef.current);
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    window.addEventListener('hashchange',schedule);
    update();
    return()=>{cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.removeEventListener('hashchange',schedule);document.documentElement.style.removeProperty('--timeline-nav-height')};
  },[]);
  return <nav className="year-nav" data-era={skinOf(year)} ref={navRef} aria-label="按年份跳转"><div className="year-nav-inner">
    <span className="year-nav-label">当前版本</span>
    <div className="year-nav-list">{eras.map(e=><a key={e.year} href={'#year-'+e.year} aria-current={year===e.year?'location':undefined}>{e.year}<small>{skinInfo[skinOf(e.year)].label}</small></a>)}</div>
  </div></nav>;
}
