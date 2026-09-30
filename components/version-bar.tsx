import {eras} from '@/lib/museum';
import {skinOf,skinInfo} from '@/components/eras/shared';

// 年份页和详情页的顶栏：配色跟着当前版本走，随时换服。
export default function VersionBar({year}:{year:string}){
  return <header className="vbar" data-era={skinOf(year)}><div className="vbar-inner">
    <a href="/" className="vbar-brand"><strong>AI 怀旧服</strong><span>换服</span></a>
    <nav className="vbar-years" aria-label="切换版本">{eras.map(e=><a key={e.year} href={'/year/'+e.year} aria-current={e.year===year?'page':undefined}>{e.year}<small>{skinInfo[skinOf(e.year)].label}</small></a>)}</nav>
    <a href="/exhibits" className="vbar-all">全部展品</a>
  </div><span className="vbar-load" aria-hidden="true"/></header>;
}
