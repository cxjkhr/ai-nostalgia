# STATUS — 进度与交接

> 本文件记录"当前做到哪、接下来做什么"。每次会话结束前更新；新会话先读这里再干活。
> 最后更新：2026-09-30（**全站改版：每一年按那一年的 AI 界面换皮**，在分支 `redesign/era-skins`，待站方本地验收后合并）

## 本轮（2026-09-30 · 年份皮肤改版）

- **方向**：站方选定"每年长成那年的 AI 界面"，全站重做。首页、全部展品、分类展区、详情页、评论区都换皮；只取那一年的界面气质（配色、布局、交互习惯），不复刻任何产品的标志和具体界面
- **五套皮肤**（`components/eras/era-20xx.tsx` + `app/eras.css`）：
  - 2022 研究预览：灰底对话框、左侧会话列表、一问一答整行交替、吸底输入框
  - 2023 社区频道：服务器栏（年份跳转）+ 频道栏（链到分类展区）+ 机器人公告，主展品置顶、按月分隔，编者手记放在右侧"置顶"
  - 2024 多模态：柔和渐变、语音光球、大展品做成播放器（进度条 = 事件在当年的位置）
  - 2025 深度思考：居中单栏，答案前有可折叠的"已思考片刻"（模板化文字，非模型真实输出），零碎消息收进待办清单
  - 2026 现役服：终端发布日志 + 顶部滚动条；`museum.ts` 新增可选字段 `incident`（目前只有 ai-outage），终端里按 ALERT 标红
- **外壳**：首页开场改为"选择版本"五块小屏；年份切换条吸顶、配色跟随当前年份；年份之间是"正在载入某年界面"的过场。页头页脚沿用米白纸色，品牌名改为「AI 怀旧服」
- **CSS 重写**：`globals.css` 只留外壳和通用部分（清掉了 masthead、years、archive-dialog 等旧版废样式），`museum.css` 删除，年份皮肤全部在 `eras.css`；一条规则一行。字体改为系统无衬线（苹方 / 微软雅黑）做正文与界面，宋体只留在标题，解决了小字发虚
- **图片**：一律 `object-fit:contain` 完整显示，不再裁切官方横幅和论文插图
- **本轮验证方式**：会话环境装不了 npm 依赖（registry 403），`npm run dev` / `lint` 没跑成。改用本机 react + tsx 把真实组件渲染成静态页、用 Chrome 截图逐页核对（桌面 1440 / 手机 390，无横向滚动），并用宽松类型桩跑过 tsc；77 件展品在时间线和目录都在，站内链接、锚点、图片全部可达
- **待站方做**：本地 `npm install && npm run dev` 看一遍，再 `npm run lint`（新增的原生 `<a>`/`<img>` 会让 `no-html-link-for-pages` / `no-img-element` 告警数量上升，属同类既有告警）；没问题再合并到 main

## 当前状态快照

- 本轮改动已全部提交（`974b49e`：代码 3 文件 + README + 本文件 + `public/` 70 图，三波：9 + 16 + 45）；tsc 干净、lint 基线不变、dev + 浏览器验证通过；本地领先 origin/main 4 个提交未 push
- **无图展品仅剩 4 个**：chatgpt-1m、chatgpt-100m、bard-fail、nvidia-1t（均无来源可考的图，勿硬凑）
- dev 服务器：本会话起在 **3000 端口**（端口不固定，以启动输出为准）
- lint 基线：11 个既有告警（`no-html-link-for-pages` / `no-img-element`，作者有意保留原生链接，勿"修复"）

## 上上轮（详情页插图窗口）落地了什么

- **图片接线数据化**：`lib/museum.ts` 新增 `ExhibitImage` 类型（`src/width/height/alt/note/sourceUrl?`），挂在事件的 `image` 字段；`visual:'image'` 时必填。`exhibit-visual.tsx` 与详情页图注、「原始图片 ↗」链接全部改为读数据，删掉了原先对 stable-diffusion / dalle-2 的硬编码特判
- **首批 9 张展品图入库**（均 2026-09-18 下载，来源/许可见 README「历史图片」）：
  - `gpt-4.png` GPT-4 技术报告「出租车顶熨衣服」多模态演示（Commons，CC BY-SA，OpenAI）
  - `midjourney-beta.jpg` 2022-11 用户生成「恐怖统治宫殿」（Commons，PD）
  - `character-ai.png` 与「维特根斯坦」对话界面实录（Commons，PD）
  - `lensa.jpg` 魔法头像包 Iridescent 截图（**弱来源：图片检索标注 Polygon，未能从原文直接复核，验收注意**）
  - `altman-saga.jpg` Altman 与 Sutskever 2023-06 合影（Commons，CC BY-SA）
  - `sora.jpg` 「东京漫步」官方演示截帧（Commons 收录视频的缩略帧，PD）
  - `ai-nobel.jpg` Hassabis 诺贝尔讲座演讲照（Commons，CC BY-SA，1400px 缩放）
  - `deepseek-r1.jpg` 登顶美区 App Store 实拍（**弱来源：图片检索标注 Fortune，验收注意**）
  - `ghibli.jpg` GPT-4o 吉卜力风特朗普肖像（Commons，PD，832px 缩放）
- **候选过审但放弃**：bard-fail（新闻配图皆为事后摆拍或 JWST 本体照，无可考原图）；notebooklm（Commons 截图为法语界面且展示聊天而非「音频概览」，与展品错位）；autogpt（仅官方 logo，黑底与米白站不搭）；Sparks-of-AGI 独角兽迭代图（1134×278 太扁，卡片展示效果差，GPT-4 已用更合适的技术报告演示图）

## 第三波（+45 张，覆盖到 73/77）落地了什么

- **来源三类**：① GitHub 官方仓库预览卡 11 张（AutoGPT/Codex/Mistral 系列/Qwen3/Kimi K2 K3/DeepSeek-V3/llama 系列/computer-use/GLM-5——注意 `opengraph.github.com` 大多返回占位图，真卡要从仓库页 HTML 里的 `opengraph.githubassets.com` 链接拿）；② 各官方页 og:image/头图 24 张（OpenAI/Anthropic/xAI/Apple/Google/微软/Mistral/Meta/Cognition/ElevenLabs/Suno/可灵/Manus/Runway/Cursor/DeepSeek 文档站）；③ 报道配图 10 张（新华社、观察者网、21 财经、BI/TechCrunch/Wccftech/SE Ranking 等经图片检索，README 有标注）
- **接线脚本化**：manifest.json（id/文件/尺寸/图注/来源）→ Python 脚本批量插入 museum.ts → 自动校验（tsc + 文件存在性 + 页面渲染）。**坑：脚本曾漏了 src 的前导斜杠导致相对路径破图，已修**——以后批量接线后必须跑「文件存在性 + `src="/`」双校验
- qwen-25 用了 Commons 的 Qwen 方形 SVG 标志（200×200，正方形裁切安全）；glm-52 用的是前代 GLM-5 仓库卡；deepseek-v4-pro 用 DeepSeek 官方品牌卡；这三处 README 已注明，验收时留意
- 45 张全部经拼图网格（PIL 拼接 + 视觉模型逐格核验）验真内容；AI outage 那张 414×393 偏小，README 已注明
- **找不到可考图片的 4 个**：chatgpt-1m / chatgpt-100m（用户增长图表，UBS/路透版权且抓不到）、bard-fail（原始出错 GIF 无可考版本）、nvidia-1t（市值事件无对应实物图）

## 第二波（+16 张）落地了什么

- **Commons 补充 8 张**：`ernie-bot.jpg`（车水马龙名场面，PD）、`new-bing.png`（Bing Chat 界面实录 2023-11，PD）、`gemini-1.png`（Gemini 技术报告多模态演示，CC BY 4.0）、`whisper.png`（论文架构图 Figure 1，MIT）、`veo-3.jpg`（「视觉系男子喝柠檬水」演示截帧，PD）、`sora-2.jpg`（This is Sora 2 发布视频截帧，PD）、`gpt-5.png`（思维链界面实录 2025-08-08，德语 UI，PD）、`nano-banana.jpg`（犀牛换材质一致性测试，PD）
- **浏览器抓官方 og:image / 头图 8 张**：`claude-3.png`（三宝石官宣图）、`claude-4.jpg`（粘土手脑）、`opus-5.jpg`（粘土插画）、`gpt-4o.png`、`gpt-6-astra.png`、`llama-2.jpg`（Meta 博客头图，fbcdn 原链有时效）、`dalle-3.jpg`（公告页官方荔枝样例）、`flux.jpg`（BFL 仓库 README 网格）
- **第二波毙掉**：Kimi K2 截图（画面无品牌无法确证）、Grok 聊天截图（实为 Grok 3 非当前展品）、Epoch 算力-准确率图表（讲训练算力，与 o1 推理主题不符）、Apple Genmoji/Siri（图库贴图或过小）、gemini-3（新华社页与 tmtpost 均无可用 og:image）、logo 类（Grok/Qwen/Copilot 字标，缩略图裁切效果差，暂不上）
- 浏览器抓官方图的套路：开公告页 → 等 4s → 滚动触发懒加载 → evaluate 提取 og:image 与页面 img（ctfassets / www-cdn.anthropic / fbcdn）→ curl 下载。OpenAI 页面必须滚一下否则图片列表为空
- **此后给展品插图的固定流程**：① 图片文件放 `public/`；② `museum.ts` 该展品加 `visual:'image'` + `image:{...}`；③ README「历史图片」登记来源与下载日期（红线：不虚构来源，未断言 checkpoint/提示词）；④ `npm run lint` + dev 看一眼详情页
- major 展品的图会同步出现在时间线大卡片与 /exhibits 缩略（object-fit:cover 裁切），minor 展品的图仅在详情页与 /exhibits 缩略出现

## 上一轮（评论系统 + 视觉迭代）要点备忘

- **当年评论区**：`lib/comments.ts`（数据）+ `components/comment-wall.tsx`（渲染）。仅当展品收录有评论时显示；化名由组件按楼层深度优先自动分配（Alice/Bob/Carol…），数据里 name 留空即可；楼中楼用 `replies` 嵌套；点赞 0 不显示赞数；长文本 `white-space:pre-line` 保留分段
- **评论数据原则**：只收真实公开社区留言（站方供料，匿名化、可有删节），不写虚构评论——曾经整批生成过 329 条后按站方要求全部删除，勿再生成
- 目前只有 `chatgpt` 展品有评论（三个主楼：我妈问亲戚 6778 赞 / hatgpt 热度分析 / 积木程序员辩护；二楼为跨三年挖坟打脸楼）
- **DALL-E 2 展品图**：`public/dalle-2.png` 为拼图（左：OpenAI 官网"宇航员骑马"素材；右：站方档案"北极熊弹贝斯"），来源口径见 README「历史图片」
- **详情页布局**：绿色悬浮 Next 按钮已删；Previous/Next 翻页栏移到 展品图→翻页栏→评论区
- **全站字体**：统一宋体衬线（`'STSong','Songti SC','SimSun',Georgia,serif`）；首页大标题缩小为 `clamp(26px,3vw,44px)` 且整句加粗（700），"怀旧服"仅绿色区分

## 下一步（按优先级）

1. **站方验收三波共 70 张图**：重点过一遍弱来源/弱尺寸项（lensa、deepseek-r1、kimi-200w、ai-outage、openai-12days、chatgpt-search、openai-devday、nvidia-gtc 等报道配图，及 glm-52 前代仓库卡）；不合适的删图 + 撤数据即可
2. 剩余 4 个无图展品（chatgpt-1m / chatgpt-100m / bard-fail / nvidia-1t）确无可考图片，除非站方供料否则保持无图
3. 继续为其他展品补充真实评论（站方会陆续供料，格式随意：展品+日期+内容+赞数，`└` 表示楼中楼）
4. README「事件来源」与新增展品保持同步
3. 继续为其他展品补充真实评论（站方会陆续供料，格式随意：展品+日期+内容+赞数，`└` 表示楼中楼）
4. README「事件来源」与新增展品保持同步

## 已完成（按提交倒序）

- （分支 `redesign/era-skins`）全站年份皮肤改版，未合并
- `974b49e` 展品图三波入库（70 图）+ 图片接线数据化，73/77 展品有视觉
- `ea1b2da` 评论区系统 + DALL-E 2 拼图 + 翻页栏移位 + 全站宋体
- `e7afc89` 时间线改为首页，档案扩充到 77 个展品
- `4b135d7` 清理无用 UI 组件、依赖与模板残留
- `5e42751` 修复生产环境展品导航（原生链接），恢复侧边 Next 定位
- `af7b896` 明确博物馆导航的点击热区
- `0d3853f` 增加分类展区和展品详情页，保持原始视觉风格
- `3f96ed8` `ead03d2` `7723aab` 时间线演进：年份页签 → 连续时间线 → 一次性滚动显现
- `945ed1f` 初始 demo

## 已知注意点 / 坑

- **别跑 `npm run format`**：当前 oxfmt 输出（printWidth 80、展开写法）与仓库现有紧凑风格不一致，一跑就全仓重排 3000+ 行；改完代码只跑 `npm run lint`，新代码手写对齐现有紧凑风格
- 本项目是 **vinext**（Vite 上的 Next.js 兼容层，beta 版），不是标准 Next.js——构建/路由行为有差异时先查这层
- 展品导航曾因客户端路由在生产环境出过问题，修复方案是原生链接；改动导航相关代码时留意
- `dalle-2.png` 是左右拼图，右半图的许可口径与左半（OpenAI 官网素材）不同，README 已分别注明
- 宋体（SimSun）无真粗体字重：500 渲染为常规、600/700 为伪加粗——新增样式只用 400/700 两档，避免粗细不均
- 往 `lib/comments.ts` 加数据建议整段重写展品数组，勿做行内锚点插入（曾把新主楼错插进上一楼的 replies）
- 跨会话遗留的 dev 服务器可能僵死（页面全 500 "fetch failed"），`taskkill /PID <pid> /F` 后重启即可；dev 端口不固定，看启动输出
- 从 Wikimedia Commons 批量下图易触发 429 限流：用 `Special:FilePath/<文件名>` 或 API 生成的缩略图地址（thumb.wikimedia.org），请求间加延时；OpenAI/Anthropic/新闻站公告页多为 JS 渲染，curl 抓不到图片 URL，需浏览器

## 给下一个会话的开场建议

```
先读 AGENTS.md 和 docs/STATUS.md，git status 和 git log --oneline -10 确认现场。
站方供图时按 STATUS「本轮」的插图固定流程录入（public/ + museum.ts image 字段 + README 登记）；
供评论料时按「上一轮」的数据原则录入；其余按「下一步」推进。勿跑 npm run format。
```
