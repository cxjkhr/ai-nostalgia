'use client';
import {useEffect,useRef,useState} from 'react';
import {Archive,ArrowUpRight,Clock3,CornerDownRight,X} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription,DialogClose} from '@/components/ui/dialog';
const eras=[
{year:'2022',title:'一切，从一句你好开始。',subtitle:'我们第一次发现，和电脑聊天，可以不只是聊天。',name:'ChatGPT',date:'2022.11.30',tag:'对话的起点',line:'一个输入框，打开了一个新世界。',detail:'ChatGPT 以研究预览的形式上线。人们开始尝试让它写文章、解释概念和修改代码，同时也遇到它自信却不正确的回答。',source:'https://openai.com/index/chatgpt/',secondary:'Stable Diffusion',secondaryDate:'2022.08.22',secondaryLine:'把一句话，变成一幅画。',secondaryDetail:'Stable Diffusion 公开发布，让更多人能够在自己的设备上探索文字生成图像。展品来自 CompVis 官方仓库，保留原始样貌。',secondarySource:'https://stability.ai/news-updates/stable-diffusion-public-release',note:'当时觉得：能写出一整段像样的话，就已经很厉害了。'},
{year:'2023',title:'从能聊天，到能帮忙。',subtitle:'问题变长了，期待也变高了。我们开始把工作交给它。',name:'GPT-4',date:'2023.03.14',tag:'能力的跃迁',line:'这一次，问题可以再难一点。',detail:'GPT-4 发布，展示了更强的推理与处理复杂指令的能力。它可接受图像和文本输入、输出文本；发布时不同功能的开放范围并不相同。',source:'https://openai.com/index/gpt-4-research/',secondary:'复杂任务',secondaryDate:'2023',secondaryLine:'从一个回答，到一份可以继续修改的草稿。',secondaryDetail:'这一页用编辑式笔记回看使用方式的变化，并非真实聊天记录或模型评测。',secondarySource:'https://openai.com/index/gpt-4-research/',note:'回头看，最先改变的可能不是工作，而是我们提问题的方式。'},
{year:'2024',title:'想象，开始动起来。',subtitle:'文字之外，我们开始期待会动的世界。',name:'Sora',date:'2024.02.15',tag:'视频的新想象',line:'写下一段话，然后看它发生。',detail:'OpenAI 首次展示 Sora，并发布技术报告。这里记录的是研究展示节点，不代表当日已经向所有用户开放。',source:'https://openai.com/index/video-generation-models-as-world-simulators/',secondary:'Sora Turbo',secondaryDate:'2024.12',secondaryLine:'从研究展示，走向产品。',secondaryDetail:'同年 12 月，Sora Turbo 随产品发布。首次展示与产品上线，值得分别留下一张档案卡。',secondarySource:'https://openai.com/index/sora-is-here/',note:'以前问“这张图是真的吗”，后来还得再问一句“这段视频呢”。'},
{year:'2025',title:'答案之前，多了一段思考。',subtitle:'推理模型走进更多人的日常，等待也有了新的意义。',name:'DeepSeek-R1',date:'2025.01.20',tag:'推理的时刻',line:'我们开始看见，答案之前的过程。',detail:'DeepSeek 发布 R1 推理模型，并提供开放权重。数学、代码和推理任务成为这一节点的重要关注点。',source:'https://api-docs.deepseek.com/news/news250120/',secondary:'开放的模型',secondaryDate:'2025.01',secondaryLine:'把探索的机会，交给更多人。',secondaryDetail:'DeepSeek-R1 同时发布了基于 Qwen 与 Llama 的蒸馏模型。不同大小的模型，为研究与本地实验提供了更多选择。',secondarySource:'https://github.com/deepseek-ai/DeepSeek-R1',note:'“稍等，我想一想。”这句话，电脑也开始说了。'}];
function ChatWindow({name='ChatGPT',expanded=false}:{name?:string;expanded?:boolean}){const [q,setQ]=useState(0);const questions=['用简单的话解释什么是人工智能','帮我写一封给未来自己的信','给我的第一个网页起个名字'];const answers=['可以把人工智能想象成一个从大量例子中学习的助手。它能发现规律、生成内容，但也可能犯错，需要我们判断。','亲爱的未来的我：希望你还记得第一次向电脑提问时的好奇。无论工具变得多强，都别忘记自己想创造什么。','不如叫「未来的旧时光」。把今天让你惊讶的东西存下来，留给几年后的自己。'];return <div className={'old-window '+(expanded?'expanded':'')}><div className="window-bar"><span className="dots">● ● ●</span><span>{name} / research preview</span><span>↗</span></div><div className="old-body"><aside><div className="new-chat">＋ New chat</div><span>◷　First conversation</span><small>界面意象 · 非历史截图</small></aside><div className="old-chat"><h3>{name}</h3><div className="chat-label">A little curiosity goes a long way.</div><div className="user-line"><span>YOU</span>{questions[q]}</div><div className="answer-line"><span className="bot-icon">✳</span><p>{answers[q]}<i className="cursor"/></p></div>{expanded&&<div className="sample-actions">{questions.map((s,i)=><button key={s} onClick={()=>setQ(i)} aria-pressed={q===i}>{s}</button>)}</div>}<div className="fake-input">{expanded?'点击上方问题，翻阅演示对话':'Send a message...'}<span>↵</span></div><small>预设演示文字 · 未连接真实模型</small></div></div></div>}

type TimelineEvent = { id: string; year: string; date: string; name: string; tag: string; line: string; detail: string; source: string; visual?: 'chat' | 'image' };
const events: TimelineEvent[] = [
  {id:'stable-diffusion',year:'2022',date:'2022-08-22',name:eras[0].secondary,tag:'图像生成',line:eras[0].secondaryLine,detail:eras[0].secondaryDetail,source:eras[0].secondarySource,visual:'image'},
  ...eras.map((e,i)=>({id:['chatgpt','gpt-4','sora','deepseek-r1'][i],year:e.year,date:e.date.replaceAll('.','-'),name:e.name,tag:e.tag,line:e.line,detail:e.detail,source:e.source,visual:i===0?'chat' as const:undefined})),
  {id:'claude-3',year:'2024',date:'2024-03-04',name:'Claude 3',tag:'模型家族',line:'不同大小的模型，开始分工。',detail:'Anthropic 发布 Claude 3 家族：Haiku、Sonnet 和 Opus。发布当天 Sonnet 与 Opus 开放使用，Haiku 随后推出。',source:'https://www.anthropic.com/news/claude-3-family'},
  {id:'gpt-4o',year:'2024',date:'2024-05-13',name:'GPT-4o',tag:'多模态',line:'对话，从文字走向声音与画面。',detail:'OpenAI 发布 GPT-4o，展示了跨文本、音频与图像的实时交互方向。各项功能分阶段开放，发布演示不等于所有功能当天可用。',source:'https://openai.com/index/hello-gpt-4o/'},
  {id:'sora-turbo',year:'2024',date:'2024-12-09',name:'Sora Turbo',tag:'产品上线',line:eras[2].secondaryLine,detail:eras[2].secondaryDetail,source:eras[2].secondarySource},
] satisfies TimelineEvent[];
events.sort((a,b)=>a.date.localeCompare(b.date));

export default function Home(){
  const [year,setYear]=useState('2022');
  const [opened,setOpened]=useState<TimelineEvent|null>(null);
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
    timeline.querySelectorAll('.event-card').forEach(element=>observer.observe(element));
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
  return <main id="top">
    <header className="masthead"><a className="brand" href="#top"><Archive size={23} strokeWidth={1.5}/><strong>AI 怀旧服</strong><span className="brand-en">THE AI ARCHIVE</span></a><div className="head-right"><span className="live-dot"/>一份持续更新的记忆<span className="demo-label">DEMO 02</span></div></header>
    <div className="page-wrap">
      <section className="intro"><div><p className="eyebrow">A SHORT HISTORY OF OUR FUTURE</p><h1>未来，已经有了<span>旧时光。</span></h1><p className="intro-copy">那些刚发生不久，就已经值得怀念的未来。<br/>沿着时间往下走，重逢第一次惊讶的瞬间。</p></div><div className="archive-seal"><span>私人数字档案</span><strong>2022—<br/>ONGOING</strong><span>模型 / 界面 / 共同记忆</span></div></section>
      <nav className="year-bar timeline-nav" ref={navRef} aria-label="按年份跳转"><span className="year-label"><Clock3 size={15}/>时间坐标</span><div className="year-anchors">{eras.map(e=><a key={e.year} href={'#year-'+e.year} aria-current={year===e.year?'location':undefined}>{e.year}<span>↓</span></a>)}</div><span className="continuing">顺着往下看 ↓</span></nav>
      <div className="continuous-timeline" ref={timelineRef}>
        {eras.map((e,i)=><section id={'year-'+e.year} className="timeline-year" key={e.year} aria-labelledby={'heading-'+e.year}>
          <header className="era-heading"><div className="year-number">{e.year}<span>VOL. 0{i+1}</span></div><div><p className="eyebrow">{e.tag}</p><h2 id={'heading-'+e.year}>{e.title}</h2><p>{e.subtitle}</p></div><div className="item-count">精选节点<br/><b>{String(events.filter(v=>v.year===e.year).length).padStart(2,'0')}</b> 份档案</div></header>
          <ol className="event-list">{events.filter(v=>v.year===e.year).map(event=><li className="event-row" key={event.id}>
            <div className="event-date"><time dateTime={event.date}>{event.date.slice(5).replace('-',' / ')}</time><span>{event.tag}</span></div>
            <article className={'event-card '+(event.visual?'has-visual':'')}>
              <div className="event-copy"><span className="eyebrow">ARCHIVE / {event.date.replaceAll('-','.')} </span><h3>{event.name}</h3><p className="event-line">{event.line}</p><p className="event-detail">{event.detail}</p><div className="event-actions"><button className="text-link" onClick={()=>setOpened(event)} aria-label={'打开'+event.name+'档案'}>翻开档案<ArrowUpRight size={17}/></button><a className="event-source" href={event.source} target="_blank" rel="noreferrer">原始资料 ↗</a></div></div>
              {event.visual==='image'&&<figure className="timeline-image"><img src="/stable-diffusion.png" alt="CompVis 官方仓库的 Stable Diffusion 原始生成样例" width={1024} height={512}/><figcaption>CompVis / 原始样例</figcaption></figure>}
              {event.visual==='chat'&&<div className="timeline-chat"><ChatWindow/></div>}
            </article>
          </li>)}</ol>
          <div className="year-note"><CornerDownRight size={17}/><p>{e.note}</p><span>编者手记</span></div>
        </section>)}
        <div className="timeline-end"><span className="end-dot"/><p>故事，还在往下写。</p><span>TO BE CONTINUED</span></div>
      </div>
      <footer><div><Archive size={18}/><span>保存当时的惊讶。</span></div><span>精选节点，非完整年表 · 界面与手记为演示创作</span><a href="#top">回到顶部 ↑</a></footer>
    </div>
    <Dialog open={opened!==null} onOpenChange={o=>{if(!o)setOpened(null)}}><DialogContent className="archive-dialog" showCloseButton={false}>
      <div className="dialog-bar"><span><Archive size={16}/>ARCHIVE / {opened?.year}</span><DialogClose className="close-window" aria-label="关闭档案"><X size={20}/></DialogClose></div>
      <div className="dialog-inner"><p className="eyebrow">{opened?.date.replaceAll('-','.')}</p><DialogTitle className="dialog-title">{opened?.name}</DialogTitle><DialogDescription className="dialog-description">{opened?.detail}</DialogDescription>
      {opened?.visual==='chat'&&<ChatWindow expanded/>}
      {opened?.visual==='image'&&<figure className="full-image"><img src="/stable-diffusion.png" alt="Stable Diffusion 原始生成样例"/><figcaption>来源：CompVis / stable-diffusion 官方仓库。未修复、未重新生成。</figcaption></figure>}
      <a className="source-link" href={opened?.source} target="_blank" rel="noreferrer">阅读原始发布资料<ArrowUpRight size={17}/></a>
      {opened?.visual==='image'&&<a className="source-link" target="_blank" rel="noreferrer" href="https://github.com/CompVis/stable-diffusion">查看图片来源<ArrowUpRight size={17}/></a>}
      </div>
    </DialogContent></Dialog>
  </main>;
}


