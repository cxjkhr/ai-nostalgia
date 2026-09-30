
import {notFound} from 'next/navigation';
import {categories,events} from '@/lib/museum';
import ExhibitGrid from '@/components/exhibit-grid';
export function generateStaticParams(){return categories.map(c=>({category:c.id}))}
export async function generateMetadata({params}:{params:Promise<{category:string}>}){const {category}=await params;const c=categories.find(c=>c.id===category);return {title:c?c.name+' · AI Museum':'展区未找到 · AI Museum'}}
export default async function Collection({params}:{params:Promise<{category:string}>}){const {category}=await params;const selected=categories.find(c=>c.id===category);if(!selected)notFound();const items=events.filter(e=>e.category===category);return <main className="shell-main"><nav className="breadcrumbs" aria-label="面包屑"><a href="/">首页</a><span>›</span><span>{selected.name}</span></nav><section className="collection-heading"><span className="shell-kicker">COLLECTION / {String(items.length).padStart(2,'0')}</span><h1>{selected.name}</h1><p>{selected.description}</p></section><nav className="collection-bar" aria-label="展品分类"><a href="/exhibits">全部展品</a>{categories.map(c=><a key={c.id} href={'/collections/'+c.id} aria-current={c.id===category?'page':undefined}>{c.name}</a>)}</nav><ExhibitGrid items={items}/></main>}

