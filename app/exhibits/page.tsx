
import type {Metadata} from 'next';
import {events,categories} from '@/lib/museum';
import ExhibitGrid from '@/components/exhibit-grid';
export const metadata:Metadata={title:'全部展品 · AI Museum'};
export default function Exhibits(){return <main className="shell-main"><nav className="breadcrumbs" aria-label="面包屑"><a href="/">首页</a><span>›</span><span>全部展品</span></nav><section className="collection-heading"><span className="shell-kicker">ALL EXHIBITS / {String(events.length).padStart(2,'0')}</span><h1>全部展品</h1><p>按时间顺序，浏览档案馆里的每一件收藏。</p></section><nav className="collection-bar" aria-label="展品分类"><span className="current">全部展品</span>{categories.map(c=><a key={c.id} href={'/collections/'+c.id}>{c.name}</a>)}</nav><ExhibitGrid items={events}/></main>}
