# STATUS — 进度与交接

> 本文件记录"当前做到哪、接下来做什么"。每次会话结束前更新；新会话先读这里再干活。
> 最后更新：2026-09-30 夜（**补三张站方供图，75/80 件有图；修正 chatgpt-1m 文案**，在分支 `redesign/era-skins`，待站方本地验收后合并）

## 本轮（2026-09-30 夜 · 站方供图三张 + 修正百万用户文案）

- `chatgpt-1m` 文案修正：原写"Altman 在社交媒体晒出增长曲线"不实，原帖只有一句文字；改为引用原帖「ChatGPT 周三上线，今天用户突破 100 万了！」，来源从维基百科换成原帖 https://x.com/sama/status/1599668808285028353 （已用 Techmeme 2022-12-05 存档核对）
- 三张站方供图入库（README「历史图片」第四批已登记）：`chatgpt-1m.png`（Altman 原帖截图）、`meta-muse.jpg`（发布会 Muse 购物功能演示）、`typesafe-jev.jpg`（打孔卡与专利图拼贴）；后两张 PNG 转 JPG 压缩
- meta-muse、typesafe-jev 两张图的出处已按站方说明补上（分别截自 TechCrunch 9/25 报道、TypeSafe 官方博客），README 与 image.sourceUrl 同步
- **展品支持视频**：`ExhibitImage` 新增可选 `video`（public/ 里的 mp4），`src` 放视频的一帧当封面；时间线缩略图显示封面 + 「▶ 视频」角标，详情页直接播放（带控件、不自动播放）。已用临时测试视频验证过渲染
- `chatgpt-100m` 来源链接失效：原路透链接的路径写错了（user-group 应为 user-base），且路透在部分网络下打不开；已换成 Euronews 转载的同一篇路透报道 https://www.euronews.com/next/2023/02/02/openai-chatgpt （已核对：两个月月活破亿、UBS、TikTok 用了九个月）
- opus-55 已接上站方下载的官方发布短片（@claudeai 原帖），转码为 720p 约 4.7MB（原片 1080p 13MB），封面取 17 秒处「Opus 5.5」字幕帧；全站第一件带视频的展品
- 无图展品现为 3 个：chatgpt-100m、bard-fail、nvidia-1t（ChatGPT 展品本身用对话框演示，不算缺图）

## 上一轮（2026-09-30 夜 · 2026 补三件新展品）

- 站方提出补 9 月爆火的三件，均已查一手来源后录入 `lib/museum.ts`（全站 77 → 80 件）：
  - `meta-muse` 2026-09-08 Meta Muse（agents / major）——来源 TechCrunch 9/25 增长报道（上线两周约 280 万下载、登顶美国双商店）；Meta 官方公告 https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/
  - `typesafe-jev` 2026-09-15 TypeSafe Jev（models / major）——来源 TypeSafe 官方博客 Introducing System One Models & Jev
  - `opus-55` 2026-09-22 Claude Opus 5.5（models / minor）——来源 Anthropic 官方发布页（价格各降 20%、典型负载成本约降四成、输出快三成以上）
- tag / line / detail 文案是 Claude 起草的，站方可按自己的语气改
- **三件都还没有配图**（本环境下载不了外站图片），分镜格里暂时显示名称；按插图固定流程补图即可
- README「事件来源」已补三条链接

## 上一轮（2026-09-30 夜 · 2026 换成手绘动画风）

- 站方反馈终端风"看着很累"，参考今年流行的"AI 用代码画动画"风格重做 2026：皮肤名从「现役服」改为「手绘动画」
  - 纸面底 + 淡点阵，限定配色（墨蓝、粉、黄、蓝、绿），粗描边 + 实心投影的剪纸感
  - 整页是一本分镜本：9 件事是 9 格分镜，3 列等大排布，格子编号 #01—#09 即时间顺序，右上角标 SCENE（同一个月是同一场戏）
  - 手绘动画的"沸腾线条"：三张 SVG 扭曲滤镜一拍二地轮换，只在鼠标悬停的分镜格描边和右上角小机器人上用，平时画面是静的
  - 标题下有一笔粉色手写下划线（逐帧画出来）；标题字用 Google Fonts 的站酷快乐体（`app/layout.tsx` 全站加载，失败时回落到系统字体）
  - 主展品 / 事故用贴纸标注；详情页提问改为「画一格：名称」，开屏缩影改成四格分镜
- 只借风格，不用任何 Claude / Anthropic 的品牌元素
- 我这边的环境访问不了 Google Fonts，截图里是回落字体；站方本地看到的才是手写标题字

## 上一轮（2026-09-30 夜 · 五年统一时间线）

- 把 2022 的做法推到全部年份，抽成共用部件 `components/eras/timeline.tsx`：
  - `chronological()`：年份页一律按日期排序，本年主展品留在原日期、另作标记（`eventsInYear` 的置顶顺序只在开屏缩影里还在用）
  - `YearRuler`：全年 12 个月刻度，重要节点立名字；按名字估算宽度自动错层，靠两端的名字向里对齐（`width` 参数是刻度大致像素宽）
  - `YearHow`：开篇"怎么看这一页"的一句说明
  - `Thumb`：可点缩略图，点图与点「查看展品」都进详情；无可考原图的展品不放
  - 刻度样式是共用的 `.yr-*`，每年用 `--yr-*` 变量上色（eras.css 顶部）
- 各年的做法：2023 频道按时间发消息 + 按月分隔，主展品置顶样式留在原位，每条带图片附件，右栏加按月目录；2024 改为按月一行、左侧月份竖线，小卡片改成上图下文；2025 每轮前加聊天记录式时间戳（日期 / 月份范围），重要回答右侧缩略图，待办每项带小图；2026 终端日志改为时间正序、最新在最下面，按月插注释行，每条带缩略图
- 验证：tsc 通过；91 路由站内链接 / 锚点 / 图片全可达、无重复 id；77 件展品全部在年份页上，有图的都有缩略图；五年刻度名字零重叠、不出界；桌面、1024、390 宽无横向滚动

## 上一轮（2026-09-30 夜 · 2022 页加时间线）

- 站方反馈：2022 页很像当年，但路人看不懂这是什么。保留视觉特征（灰底、整行一问一答交替、头像），加上时间线结构：
  - 开篇：版本名 + 年份标题 + 全年 12 个月刻度（每件事一个点，重要节点立名字，靠太近的名字自动错层）+ 一段"怎么看这一页"的说明
  - 事件改为**严格按日期排序**（主展品 ChatGPT 回到 11 月的位置，标「本年主展品」），不再置顶打乱顺序；其他年份仍按 `eventsInYear` 置顶
  - 每一轮左侧是日期竖线：日期、标签、节点圆点，按月插入「X 月」分段
  - 侧栏从"会话列表"改为按月分组的目录（日期 + 名称）
  - 每件展品的回答右侧放缩略图（重要节点 340px、其他 240px，完整显示不裁切），点图和点「查看展品」都进详情页；ChatGPT 放一张对话框小样，无图展品不放
  - 新增 `components/scroll-spy.tsx`：滚到哪件，侧栏和刻度上对应的项就高亮（`data-spy` 属性），可复用到其他年份
- 手机上刻度只留点和月份，隐藏名字；日期竖线变窄

## 上一轮（2026-09-30 晚 · 开屏选服）

- 站方反馈：米白标题页和 2022 深色界面放一起很出戏。改为**开屏选服**：`/` 是全屏深色"启动器"，五个版本并排，每块是那一年界面的缩影（取当年真实展品），悬停展开，点击进入 `/year/[year]`
- **每年独立成页**：`app/year/[year]/page.tsx`，顶栏 `components/version-bar.tsx` 配色跟随当年皮肤，随时换服；页底是上一个 / 下一个版本的换服入口，用对方年份的皮肤。原来的连续时间线、米白过场、滚动年份条删除（history-timeline / year-nav / version-select）
- **外壳统一成开屏的深色**（`globals.css` 的 `--shell-*`），列表页、404、页脚都用它；页头页脚不再放在 layout 里，由各页面自己带（年份页和详情页用 VersionBar，其他页用 MuseumHeader）
- **旧链接**：`/#year-2023`、`/#e-gpt-4` 打开开屏时由 `components/hash-redirect.tsx` 转到对应年份页；站内所有"返回时间线"改为回到该年页面并定位到展品（`/year/2023#e-gpt-4`）
- 开屏在 900px 以下改为竖排卡片，缩影只保留上半部分
- 页面切换用了 `@view-transition{navigation:auto}`，支持的浏览器里换页会淡入淡出，不支持的无影响
- 验证同上一轮：静态渲染 91 个路由，站内链接 / 锚点 / 图片全部可达，77 件展品都在年份页上，桌面与 390px 无横向滚动，tsc 通过；仍需站方本地 `npm run dev` + `npm run lint`

## 上一轮（2026-09-30 · 年份皮肤改版）

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

- （分支 `redesign/era-skins`）三张站方供图入库，修正 chatgpt-1m 文案，未合并
- （分支 `redesign/era-skins`）2026 补 Muse / Jev / Opus 5.5，未合并
- （分支 `redesign/era-skins`）2026 换成手绘动画风，未合并
- （分支 `redesign/era-skins`）五个年份页统一时间线结构与缩略图，未合并
- （分支 `redesign/era-skins`）2022 页加时间线结构，未合并
- （分支 `redesign/era-skins`）开屏选服 + 每年独立成页，未合并
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
