import Link from 'next/link';
import {notFound} from 'next/navigation';
import {categories,events,categoryFor} from '@/lib/museum';
import ExhibitGrid from '@/components/exhibit-grid';
export function generateStaticParams(){return categories.map(c=>({category:c.id}))}
export async function generateMetadata({params}:{params:Promise<{category:string}>}){const {category}=await params;const c=categories.find(c=>c.id===category);return {title:c?c.name+' · AI Museum':'展区未找到 · AI Museum'}}
export default async function Collection({params}:{params:Promise<{category:string}>}){const {category}=await params;const selected=categories.find(c=>c.id===category);if(!selected)notFound();const items=events.filter(e=>categoryFor(e)===category);return <main className="museum-main"><nav className="breadcrumbs" aria-label="面包屑"><Link href="/">首页</Link><span>›</span><span>{selected.name}</span></nav><section className="collection-heading"><span className="museum-kicker">COLLECTION / {String(items.length).padStart(2,'0')}</span><h1>{selected.name}</h1><p>{selected.description}</p></section><nav className="collection-bar" aria-label="展品分类"><Link href="/">全部展品</Link>{categories.map(c=><Link key={c.id} href={'/collections/'+c.id} aria-current={c.id===category?'page':undefined}>{c.name}</Link>)}</nav><ExhibitGrid items={items}/></main>}

