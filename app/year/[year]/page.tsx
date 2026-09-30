
import {notFound} from 'next/navigation';
import {eras,eventsInYear} from '@/lib/museum';
import {skinOf,skinInfo} from '@/components/eras/shared';
import {EraSkin} from '@/components/eras';
import VersionBar from '@/components/version-bar';
import MuseumFooter from '@/components/museum-footer';
export function generateStaticParams(){return eras.map(e=>({year:e.year}))}
export async function generateMetadata({params}:{params:Promise<{year:string}>}){const {year}=await params;const era=eras.find(e=>e.year===year);return {title:era?era.year+' · '+skinInfo[skinOf(year)].label+' · AI 怀旧服':'版本未找到 · AI 怀旧服',description:era?.subtitle}}
// 一个版本一页：顶栏、界面、底部换服都用那一年的皮肤。
export default async function YearPage({params}:{params:Promise<{year:string}>}){
 const {year}=await params;const i=eras.findIndex(e=>e.year===year);if(i<0)notFound();
 const era=eras[i],skin=skinOf(year),prev=eras[i-1],next=eras[i+1];
 return <><VersionBar year={year}/><main className="year-page"><h1 className="visually-hidden">{era.year} · {era.title}</h1><EraSkin skin={skin} era={era} events={eventsInYear(year)}/>
 <nav className="handoff" aria-label="切换版本">
  {prev?<a className={'handoff-prev skin s'+skinOf(prev.year)} href={'/year/'+prev.year}><small>← 上一个版本</small><strong>{prev.year} · {skinInfo[skinOf(prev.year)].label}</strong></a>:<a className="handoff-prev handoff-home" href="/"><small>← 回到开屏</small><strong>重新选服</strong></a>}
  {next?<a className={'handoff-next skin s'+skinOf(next.year)} href={'/year/'+next.year}><small>下一个版本 →</small><strong>{next.year} · {skinInfo[skinOf(next.year)].label}</strong><span>{next.title}</span></a>:<a className="handoff-next handoff-end" href="/"><small>TO BE CONTINUED</small><strong>故事，还在往下写。</strong><span>回到开屏 →</span></a>}
 </nav></main><MuseumFooter/></>
}
