# AGENTS.md — 本仓库的持久约定

任何会话开始做任务前：先读 `docs/STATUS.md` 了解当前进度与未提交改动，再看 `git log --oneline -10`。会话结束前若产生了实质进展，更新 `docs/STATUS.md`。

## 项目是什么

「AI Museum · AI 怀旧服」：交互式视觉 demo，收录 2022—2026 年 80 个 AI 标志性事件，按博物馆式信息架构呈现（时间线首页 / 分类展区 / 展品详情 / 预设聊天演示 / 当年评论区）。首页是开屏选服，每个版本（年份）独立成页，按那一年的 AI 界面换皮（2022 研究预览 / 2023 社区频道 / 2024 多模态 / 2025 深度思考 / 2026 手绘动画）。

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
lib/museum.ts    全站展品的唯一数据源（events: TimelineEvent[]，约 80 条）
lib/comments.ts  「当年评论区」数据（Record<展品id, MuseumComment[]>）
lib/showcase.ts  详情页展品作品（image / video / audio / interactive），来源和年代逐项留证
lib/image-thumbnails.json 列表缩略图映射；原图保留，新图无映射时回退原图
lib/transitions.ts 页面转场脚本（head 内联，配合 globals.css 里的 View Transitions 样式）
app/             路由：/ 开屏选服；/year/[year] 各年份页；/exhibits 全部展品；/exhibits/[slug] 详情；
                 /collections/[category] 六个分类展区；/history 重定向到 /；not-found 兜底
components/      展示组件（server-list 开屏 / version-bar 年份顶栏 / grid / chat-window / comment-wall 等）
components/eras/ 五套年份皮肤；shared.tsx 放皮肤名、日期工具和展品图组件；timeline.tsx 放各年共用的全年刻度、开篇说明、按日期排序和缩略图
app/eras.css     年份皮肤样式、皮肤变量、开屏缩影；app/globals.css 放深色外壳和通用部分
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
- 展品展示收录流程见 `docs/SHOWCASE.md`。馆主作品、历史复现和发布期原作明确区分；交互 iframe 只允许脚本，禁止 same-origin；不把现代生成物冒充历史原作。

## 代码风格

- 站点文案与代码注释用中文；既有代码的注释密度不高，仅在约定不明显处注释
- 外壳是开屏的深色启动器配色（`--shell-*`）；年份界面只取那一年的界面气质，不复刻任何产品的标志与具体界面。新页面先看 `app/globals.css`、`app/eras.css` 和既有页面的写法再动手
- 新增年份没有专属皮肤时自动沿用最新一套（`skinOf`）；要加新皮肤，在 `components/eras/` 加组件、在 `eras.css` 加皮肤变量、样式和开屏缩影（`server-list.tsx` 的 Preview）
- 展品导航用原生链接，保证生产环境可用（见 git 历史「Fix production exhibit navigation」）
