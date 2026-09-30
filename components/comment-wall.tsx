'use client';

import { useState } from 'react';
import { comments, realSources, countComments, type MuseumComment } from '@/lib/comments';

// 楼层化名池：渲染时按 深度优先（主楼→楼中楼→下一主楼）顺序自动分配
const NAMES = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Helen',
  'Ivan', 'Judy', 'Kevin', 'Luna', 'Mona', 'Nathan', 'Olivia', 'Peter',
  'Quinn', 'Rita', 'Sam', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xavier', 'Yuki', 'Zoe'];

function withFloorNames(list: MuseumComment[]): MuseumComment[] {
  let i = 0;
  const walk = (items: MuseumComment[]): MuseumComment[] =>
    items.map((c) => ({
      ...c,
      name: NAMES[i] ? NAMES[i++] : '访客 ' + (++i),
      replies: c.replies?.length ? walk(c.replies) : undefined,
    }));
  return walk(list);
}

function CommentItem({ c }: { c: MuseumComment }) {
  return (
    <li className="comment-item">
      <span className="comment-avatar" aria-hidden="true">
        {c.name[0]}
      </span>
      <div className="comment-main">
        <div className="comment-head">
          <strong>{c.name}</strong>
          <time>{c.date}</time>
        </div>
        <p>{c.text}</p>
        {c.sourceUrl&&<a className="comment-origin" href={c.sourceUrl} target="_blank" rel="noreferrer">原始留言 ↗</a>}
        {c.replies?.length ? (
          <ul className="comment-sublist">
            {c.replies.map((r, i) => (
              <CommentItem key={r.date + r.name + i} c={r} />
            ))}
          </ul>
        ) : null}
      </div>
      {c.likes > 0 && (
        <span className="comment-likes">
          ♥ {c.likes >= 10000 ? (c.likes / 10000).toFixed(1) + 'w' : c.likes}
        </span>
      )}
    </li>
  );
}

export default function CommentWall({ eventId }: { eventId: string }) {
  const raw = comments[eventId] ?? [];
  const list = raw.length ? withFloorNames(raw) : [];
  const [sort, setSort] = useState<'floor' | 'hot' | 'new'>('floor');
  if (!list.length) return null;
  const sorted =
    sort === 'floor'
      ? list
      : [...list].sort((a, b) =>
          sort === 'hot' ? b.likes - a.likes : b.date.localeCompare(a.date)
        );
  const source = realSources[eventId];
  return (
    <div className="comment-wall">
      <div className="comment-toolbar">
        <div className="comment-tabs" aria-label="评论排序">
          <button onClick={() => setSort('floor')} aria-pressed={sort === 'floor'}>
            楼层
          </button>
          <button onClick={() => setSort('hot')} aria-pressed={sort === 'hot'}>
            最热
          </button>
          <button onClick={() => setSort('new')} aria-pressed={sort === 'new'}>
            最新
          </button>
        </div>
        <span className="comment-count">{list.length} 个讨论 · {countComments(list)} 条留言</span>
      </div>
      <ul className="comment-list">
        {sorted.map((c, i) => (
          <CommentItem key={c.date + c.name + i} c={c} />
        ))}
      </ul>
      {source && (
        <p className="comment-source">
          留言摘编自B站公开视频热评（已匿名化、有删节）：
          <a href={source} target="_blank" rel="noreferrer">
            来源视频 ↗
          </a>
        </p>
      )}
      {!source&&raw.some(c=>!c.sourceUrl)&&<p className="comment-source">留言由馆主提供并匿名摘编；部分原始链接待补。</p>}
    </div>
  );
}
