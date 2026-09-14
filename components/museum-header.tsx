'use client';

import {usePathname} from 'next/navigation';
import {categories} from '@/lib/museum';
export default function MuseumHeader(){
 const path=usePathname();
 return <header className="museum-header"><div className="museum-header-inner"><a href="/" className="museum-brand"><strong>AI</strong> Museum<span>人工智能博物馆</span></a><nav aria-label="主导航"><a href="/" aria-current={path==='/'?'page':undefined}>全部展品</a>{categories.map(c=><a key={c.id} href={'/collections/'+c.id} aria-current={path==='/collections/'+c.id?'page':undefined}>{c.name}</a>)}<a href="/history" aria-current={path==='/history'?'page':undefined}>AI 发展史</a></nav></div></header>;
}
