'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {categories} from '@/lib/museum';
export default function MuseumHeader(){
 const path=usePathname();
 return <header className="museum-header"><div className="museum-header-inner"><Link href="/" className="museum-brand"><strong>AI</strong> Museum<span>人工智能博物馆</span></Link><nav aria-label="主导航"><Link href="/" aria-current={path==='/'?'page':undefined}>全部展品</Link>{categories.map(c=><Link key={c.id} href={'/collections/'+c.id} aria-current={path==='/collections/'+c.id?'page':undefined}>{c.name}</Link>)}<Link href="/history" aria-current={path==='/history'?'page':undefined}>AI 发展史</Link></nav></div></header>;
}
