# 展品展示：收录与维护

基于 GitHub main `402f2b3` 的年份皮肤改版。详情页使用 `lib/showcase.ts` 的 `showcases[事件id]`，在原档案配图下方增加真实媒体或交互产物。原配图、视频、年份皮肤和 data-ex 图像转场保持不变；新展示区继承 --sk-* 皮肤变量。

支持 image / video / audio / interactive，一件事件可挂多件作品。每件至少填：唯一 id、标题、类型、src、日期、来源类别、说明、sourceUrl。图片可加 alt；视频可加 poster；提示词和文字稿按证据填写，不推测、不编造。

## 首批收录（2026-09-30）

| 事件 | 作品 | 来源与证据 | 展示 |
| --- | --- | --- | --- |
| dalle-2 | 宇航员骑马 | https://openai.com/index/dall-e-2/ 官方页面对应图片及提示词 | 本地原图，可放大 |
| sora | 东京街头漫步 | https://openai.com/index/sora/ 与 2024-02-15 技术报告；媒体 Last-Modified 2024-02-15，H.264 1920×1080，59.967 秒 | 官方远程 MP4，点击加载 |
| notebooklm | 首发 Audio Overview | https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/ 的 source 标签；发布日期与媒体 Last-Modified 均 2024-09-11，505.92 秒 | 官方远程 MP3，点击加载 |
| codex-cli | NEON RUSH | 馆主桌面赛车合集；同目录「两个版本说明.txt」标为 Codex霓虹版 | 2026 馆主作品，非 2025 首发样例 |

媒体地址：

- 图片原样下载：`https://images.ctfassets.net/kftzwdyauwt9/6Hpmny9K2Z8Xxget5bmlWa/66634b4c69faef5600e5ea48f499ba5e/Anastronautridingahorseinaphotorealisticstyle6.jpg`。2024 的服务器迁移时间不等于生成时间。当前官网提示词：`A photorealistic image of an astronaut riding a horse`。
- 视频：`https://cdn.openai.com/sora/videos/tokyo-walk.mp4`，48,439,249 字节。
- 音频：`https://storage.googleapis.com/gweb-uniblog-publish-prod/media/final_audio.mp3`，2,024,108 字节。

官方资料的公开可访问性不代表开放版权许可。保留作者、来源和官方样例标识，不宣称为本站自有作品。视频和音频不下载入库，不自动播放；源站失效时显示回退提示和来源链接。原始英文播客未提供逐字稿，当前无字幕，不自动编造转写。

## 交互作品边界

iframe 仅 `sandbox="allow-scripts"`，不开放 same-origin、弹窗、表单、顶层导航。NEON RUSH 展示副本增加 CSP 禁止联网；成绩存储改为本次试玩内存，防止隔离环境访问 localStorage 报错。玩法不改。

`public/artifacts/neon-rush/original.html` 保留原始字节；`index.html` 是兼容展示副本；说明与 SHA-256 同目录。新作品需要逐件核对可运行性与来源；不要向隔离作品传递站点凭据。不要将任意陌生远程 HTML 直接加入 allow-same-origin iframe。

## 缩略图与评论

- `py -3.13 scripts/build-thumbnails.py` 重建 720px 上限的 WebP 列表副本，原图不覆盖；依赖 Pillow。SVG 直接保留。
- `lib/image-thumbnails.json` 按原图 URL 索引，未生成缩略图的新配图回退到原图，不破图。
- 78 张图片合计从 18,669,412 字节降为 1,806,231 字节，约减少 90.3%；保留 Claude 版已有的延迟加载。详情继续用原图。
- 评论新增逐楼 `sourceUrl` 字段；没有来源时明确显示待补，禁止编造视频链接。当前 4 个主楼、17 条回复，共 21 条，所有原始链接待馆主补充。
- lint 对 `nextjs/no-html-link-for-pages`、`nextjs/no-img-element` 关闭：本项目为解决 Vinext 生产导航问题保留原生链接，并自行提供图片缩略图与延迟加载。`nextjs/no-page-custom-font` 不适用于当前 App Router 根布局字体写法，也关闭。原片无字幕时只对对应媒体行排除字幕规则，其他检查继续生效。年份刻度字宽改用 Intl.Segmenter，避免拆散组合字符。

## 待办

- 补四个主楼的真实来源链接。
- 增加更多发布期的可核实原作；当前赛车只作为交互形式与馆主作品示范。
- 为英文音频补可靠逐字稿与中文辅助内容；未完成前不宣称有字幕。
