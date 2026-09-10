import Link from 'next/link';
import {events,categories} from '@/lib/museum';
import ExhibitGrid from '@/components/exhibit-grid';
export default function Home(){return <main className="museum-main"><section className="intro"><div><p className="eyebrow">A SHORT HISTORY OF OUR FUTURE</p><h1>未来，已经有了<span>旧时光。</span></h1><p className="intro-copy">那些刚发生不久，就已经值得怀念的未来。<br/>收集 AI 的成长，也留住我们第一次惊讶的瞬间。<br/><Link href="/history">沿着时间线，开始探索 →</Link></p></div><div className="archive-seal"><span>私人数字档案</span><strong>2022—<br/>ONGOING</strong><span>模型 / 界面 / 共同记忆</span></div></section><nav className="collection-bar" aria-label="展品分类"><span className="current">全部展品</span>{categories.map(c=><Link key={c.id} href={'/collections/'+c.id}>{c.name}</Link>)}</nav><ExhibitGrid items={events}/></main>}
