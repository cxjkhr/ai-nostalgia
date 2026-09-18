# AGENTS.md — 本仓库的持久约定

任何会话开始做任务前：先读 `docs/STATUS.md` 了解当前进度与未提交改动，再看 `git log --oneline -10`。会话结束前若产生了实质进展，更新 `docs/STATUS.md`。

## 项目是什么

「AI Museum · AI 怀旧服」：交互式视觉 demo，收录 2022—2026 年 77 个 AI 标志性事件，按博物馆式信息架构呈现（时间线首页 / 分类展区 / 展品详情 / 预设聊天演示 / 当年评论区）。米白、墨绿档案馆视觉风格。

## 技术栈（重要：不是标准 Next.js）

- **vinext 1.0.0-beta.5**：提供 Next.js 风格的 `app/` 路由与 RSC，但底层是 **Vite 8**。遇到构建或路由行为差异时先怀疑这层，不要按 Next.js 的经验直接下结论。
- React 19.2（Server Components）、TypeScript 5.9、Tailwind CSS 4
- 部署目标 Cloudflare（wrangler + @cloudflare/vite-plugin + @openai/sites-vite-plugin）
- Node >= 22.13；格式化/检查用 oxfmt + oxlint（不是 prettier/eslint）

## 常用命令

```
npm run dev      # 本地开发（vinext dev）
npm run build    # 构建
npm run start    # wrangler dev 跑构建产物
npm run lint     # oxlint
npm run format   # oxfmt
```

改完代码跑 `npm run lint`，动了样式或路由记得本地起 dev 验证。

## 架构与数据流

```
lib/museum.ts    全站展品的唯一数据源（events: TimelineEvent[]，约 77 条）
lib/comments.ts  「当年评论区」数据（Record<展品id, MuseumComment[]>）
app/             路由：/ 时间线首页；/exhibits 全部展品；/exhibits/[slug] 详情；
                 /collections/[category] 六个分类展区；/history 重定向到 /；not-found 兜底
components/      8 个展示组件（timeline / grid / chat-window / comment-wall 等）
public/          静态资源（图片需登记来源，见下）
```

加内容通常只改 `lib/museum.ts`（或 `comments.ts`），页面自动跟随；不要在组件里硬编码事件数据。

## 数据约定（lib/museum.ts）

- `id`：小写中划线式（`stable-diffusion`），是详情页 slug 和评论数据的关联键，不可随意改动
- `date` 用 ISO 格式（`2022-08-22`），展示格式由 `dateLabel` 等工具函数负责
- `category`：`models` | `images` | `video` | `audio` | `agents` | `open` 六选一
- `tier`：`major` = 时间线大卡片；`minor` = 紧凑单行。每年主展品置顶
- `source` 必须是真实可考的来源链接

## 内容红线

- **不虚构评论**：comments 只收录真实公开社区的留言，匿名化后使用；化名由组件按楼层自动分配 Alice/Bob/Carol（深度优先），数据里 name 留空
- 聊天界面是编辑式重构的预设演示文字，**不连接真实模型**，也不要引入真实模型调用
- 图片需在 README「历史图片」一节登记来源与下载日期；未断言 checkpoint / 提示词

## 代码风格

- 站点文案与代码注释用中文；既有代码的注释密度不高，仅在约定不明显处注释
- 视觉风格延续米白底、墨绿档案馆外观；新页面先看 `app/museum.css` 和既有页面的写法再动手
- 展品导航用原生链接，保证生产环境可用（见 git 历史「Fix production exhibit navigation」）
