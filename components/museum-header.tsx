'use client';

import {usePathname} from 'next/navigation';
import {categories} from '@/lib/museum';
export default function MuseumHeader(){
 const path=usePathname();
 return <header className="shell-header"><div className="shell-header-inner"><a href="/" className="shell-brand"><strong>AI 怀旧服</strong><span>AI Museum · 2022—2026</span></a><nav aria-label="主导航"><a href="/" aria-current={path==='/'?'page':undefined}>时间线</a><a href="/exhibits" aria-current={path==='/exhibits'?'page':undefined}>全部展品</a>{categories.map(c=><a key={c.id} href={'/collections/'+c.id} aria-current={path==='/collections/'+c.id?'page':undefined}>{c.name}</a>)}</nav></div></header>;
}
