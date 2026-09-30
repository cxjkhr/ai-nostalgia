import {eras,eventsInYear} from '@/lib/museum';
import {skinOf,skinInfo} from '@/components/eras/shared';

// 首页开场的"选择版本"：每个年份一块小屏，画的是那一年界面的缩略样子。
function Mini({skin}:{skin:string}){
  return <span className={'vmini m'+skin} aria-hidden="true"><span className="vm-a"/><span className="vm-b"/><span className="vm-c"/><span className="vm-d"/><span className="vm-e"/></span>;
}

export default function VersionSelect(){
  return <ol className="version-select">{eras.map(e=>{const skin=skinOf(e.year);return <li key={e.year}>
    <a href={'#year-'+e.year} className={'vtile v'+skin}>
      <Mini skin={skin}/>
      <span className="vtile-copy"><strong>{e.year}</strong><span>{skinInfo[skin].label}</span><small>{e.tag} · {eventsInYear(e.year).length} 件</small></span>
    </a>
  </li>})}</ol>;
}
