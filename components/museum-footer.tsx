
import {categories,eras} from '@/lib/museum';
export default function MuseumFooter(){return <footer className="museum-footer"><div className="museum-footer-grid"><div><h3>AI Museum</h3><p>保存当时的惊讶。<br/>收集人工智能的模型、界面与共同记忆。</p></div><div><h3>探索展品</h3><a href="/exhibits">全部展品</a>{categories.map(c=><a href={'/collections/'+c.id} key={c.id}>{c.name}</a>)}</div><div><h3>时间线年份</h3>{eras.map(e=><a key={e.year} href={'/#year-'+e.year}>{e.year}</a>)}</div><div><h3>关于这些档案</h3><p>精选历史节点，非完整年表。原始图片标注来源；重构界面、预设对话和编者手记均明确区分。</p></div></div><div className="museum-colophon">AI Museum · AI 怀旧服<span>历史素材版权归各自权利人所有。</span></div></footer>}

