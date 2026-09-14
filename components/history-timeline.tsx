'use client';
import {useState,useRef,useEffect} from 'react';

import {eras,eventsInYear} from '@/lib/museum';
import ExhibitVisual from '@/components/exhibit-visual';
export default function HistoryTimeline(){
 const [year,setYear]=useState('2022');
  const navRef=useRef<HTMLElement>(null);
  const timelineRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const timeline=timelineRef.current;
    if(!timeline || !('IntersectionObserver' in window)) return;
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations=new Set<Animation>();
    const stopAnimations=()=>{animations.forEach(animation=>animation.cancel());animations.clear()};
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if(reducedMotion.matches || entry.target.contains(document.activeElement)) continue;
        const animation=entry.target.animate(
          [{opacity:0,transform:'translateX(28px)'},{opacity:1,transform:'translateX(0)'}],
          {duration:600,easing:'cubic-bezier(0.22, 1, 0.36, 1)'}
        );
        animations.add(animation);
        animation.onfinish=()=>animations.delete(animation);
        animation.oncancel=()=>animations.delete(animation);
      }
    },{threshold:0,rootMargin:'0px 0px -24px 0px'});
    timeline.querySelectorAll('.event-card,.minor-card').forEach(element=>observer.observe(element));
    // Focused controls and reduced-motion preferences always take priority.
    timeline.addEventListener('focusin',stopAnimations);
    reducedMotion.addEventListener('change',stopAnimations);
    return()=>{observer.disconnect();stopAnimations();timeline.removeEventListener('focusin',stopAnimations);reducedMotion.removeEventListener('change',stopAnimations)};
  },[]);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      const navHeight=navRef.current?.offsetHeight??74;
      document.documentElement.style.setProperty('--timeline-nav-height',navHeight+'px');
      const threshold=navHeight+85;
      let current=eras[0].year;
      for(const e of eras){
        const section=document.getElementById('year-'+e.year);
        if(section && section.getBoundingClientRect().top<=threshold) current=e.year;
      }
      if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-8) current=eras[eras.length-1].year;
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

 return <><nav className="year-bar timeline-nav" ref={navRef} aria-label="按年份跳转"><span className="year-label">跳转年份</span><div className="year-anchors">{eras.map(e=><a key={e.year} href={'#year-'+e.year} aria-current={year===e.year?'location':undefined}>{e.year}<span>↓</span></a>)}</div><span className="continuing">顺着往下看 ↓</span></nav><div className="continuous-timeline" ref={timelineRef}>{eras.map(e=><section key={e.year} id={'year-'+e.year} className="timeline-year" aria-labelledby={'heading-'+e.year}><header className="era-heading"><div className="year-number">{e.year}</div><div><p className="eyebrow">{e.tag}</p><h2 id={'heading-'+e.year}>{e.title}</h2><p>{e.subtitle}</p></div></header><ol className="event-list">{eventsInYear(e.year).map(event=>event.tier==='minor'?<li className="event-row minor" key={event.id}><div className="event-date"><time dateTime={event.date}>{event.date.slice(5).replace('-',' / ')}</time><span>{event.tag}</span></div><div className="minor-card"><a className="minor-name" href={'/exhibits/'+event.id}>{event.name}</a><p>{event.line}</p><a className="minor-more" href={'/exhibits/'+event.id} aria-label={'查看 '+event.name}>→</a></div></li>:<li className="event-row" key={event.id}><div className="event-date"><time dateTime={event.date}>{event.date.slice(5).replace('-',' / ')}</time><span>{event.tag}</span></div><article className={'event-card '+(event.visual?'has-visual':'')}><div className="event-copy"><span className="eyebrow">{event.date.replaceAll('-','.')}</span><h3><a href={'/exhibits/'+event.id}>{event.name}</a></h3><p className="event-line">{event.line}</p><p className="event-detail">{event.detail}</p><a className="event-detail-link" href={'/exhibits/'+event.id}>查看展品 →</a></div>{event.visual&&<a className="history-visual" href={'/exhibits/'+event.id} aria-label={'查看'+event.name}><ExhibitVisual event={event}/></a>}</article></li>)}</ol><div className="year-note"><p>{e.note}</p><span>编者手记</span></div></section>)}<div className="timeline-end"><span className="end-dot"/><p>故事，还在往下写。</p><span>TO BE CONTINUED</span></div></div></>;
}

