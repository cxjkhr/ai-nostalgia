# AI Museum · AI 怀旧服

交互式视觉 demo：2022—2026 连续时间线、顶部年份锚点跳转、随滚动更新的年份高亮、档案详情、预设聊天示例。共收录 80 个标志性节点（2022 至 2026 年 9 月）；每年主展品置顶打头，其余事件按日期排列，重要事件用大卡片、次要事件用紧凑单行分层呈现。

首页是开屏选服，每个版本（年份）独立成页、按那一年的 AI 界面换皮（2022 研究预览 / 2023 社区频道 / 2024 多模态 / 2025 深度思考 / 2026 手绘动画，只取界面气质，不复刻具体产品），博物馆式信息架构：
- 开屏选服：五个版本并排，每块是那一年界面的缩影，点击进入 /year/2022 等年份页（2022 由 ChatGPT 打头、2026 由 GPT-6 Astra 打头）；年份页顶栏配色跟随当年，页底可换到相邻版本。旧的 /#year-2023 链接会自动跳到对应年份页。
- 全部展品位于 /exhibits；六个分类展区：对话与推理、图像生成、视频生成、声音与音乐、智能体与工具、开源时刻。展品目录按日期从早到晚排列。
- 每件展品有独立详情页，提供日期、介绍、展品、原始资料和 Previous / Next。相邻展品按全站时间顺序浏览。
- 旧路径 /history 重定向到开屏，历史链接不断。
- 首件没有 Previous，末件返回全部展品；未知展品和分类返回 404。

## 内容边界
聊天界面为编辑式重构，回答为预设演示文字，不连接真实模型。手记为原创演示文案，不冒充历史评论。精选节点并非完整年表。详情页预留"当年，人们这么说"评论区入口：仅当展品收录有评论时显示。留言由站方从公开社区收集并匿名化（化名按楼层自动 Alice/Bob/Carol 顺序编排，来源在页内注明）；不收录任何虚构评论。

## 历史图片
以下图片均于 2026-09-18 下载收录；除注明外，来源与许可以 Wikimedia Commons 文件页为准（链接即文件页，含作者与许可标注）。所有生成图仅作历史样例展示，未断言具体 checkpoint 或提示词。

public/stable-diffusion.png 原样下载自 CompVis/stable-diffusion 官方仓库：
https://github.com/CompVis/stable-diffusion/blob/main/assets/stable-samples/txt2img/000002025.png
下载日期：2026-09-10。仅作为原始项目样例展示；未断言具体 checkpoint 或提示词。仓库提供 CreativeML Open RAIL-M 许可；图片未单独列出许可。
public/dalle-2.png 为左右拼图：左图“宇航员骑马（写实风格）”原样取自 OpenAI 官网 DALL·E 2 页面素材（images.ctfassets.net，2026-09-17 下载）；右图“弹电贝斯的北极熊”为站方档案收录的生成图，未断言具体生成模型。两图由站方拼接展示。

public/gpt-4.png 出自 GPT-4 技术报告的多模态演示（“移动出租车顶上熨衣服”），OpenAI 发布，CC BY-SA 4.0：
https://commons.wikimedia.org/wiki/File:Gpt-4-visual.png
public/midjourney-beta.jpg 为 2022 年 11 月 Midjourney 用户生成图「恐怖统治时期的宫殿」（Palace during a reign of terror），上传者 Mhatopzz 标注为公有领域，经 960px 缩略图收录：
https://commons.wikimedia.org/wiki/File:Palace_during_a_reign_of_terror_Midjourney.png
public/character-ai.png 为 character.ai 与“维特根斯坦”角色对话的界面截图（2023-07），上传者标注为公有领域：
https://commons.wikimedia.org/wiki/File:Wittgenstein_dialogue_at_character.ai.png
public/lensa.jpg 为 Lensa 魔法头像包（Pack #1: Iridescent）应用截图，图片检索标注来源为 Polygon 对头像热潮的报道（2022-12-20）；原图页面为 JS 渲染，未能直接复核，验收时请留意：
https://www.polygon.com/23513386/ai-art-lensa-magic-avatars-artificial-intelligence-explained-stable-diffusion
public/altman-saga.jpg 为 Sam Altman 与 Ilya Sutskever 2023-06-05 在特拉维夫大学的合影，Eladkarmel 摄，CC BY-SA 4.0（风波两位主角在事发前数月的同框）：
https://commons.wikimedia.org/wiki/File:Ilya_Sutskever_and_Sam_Altman_in_TAU.jpg
public/sora.jpg 为 Sora 官方演示视频「东京漫步」的 Commons 收录版截帧（视频上传者标注为 Sora / OpenAI、公有领域），取自视频缩略帧：
https://commons.wikimedia.org/wiki/File:OpenAI_Sora_in_Action-_Tokyo_Walk.webm
public/ai-nobel.jpg 为 Demis Hassabis 在 2024 年诺贝尔讲座（斯德哥尔摩大学）演讲的照片，Jay Dixit 摄，CC BY-SA 4.0，经 1400px 缩放：
https://commons.wikimedia.org/wiki/File:Demis_Hassabis_at_the_2024_Nobel_Lectures_2.jpg
public/ghibli.jpg 为 GPT-4o 生成的吉卜力风格特朗普肖像（2025-03-28），Commons 上传者标注为公有领域，经 832px 缩放：
https://commons.wikimedia.org/wiki/File:GPT-4o_Studio_Ghibli_portrait_of_Donald_Trump.png
public/deepseek-r1.jpg 为 DeepSeek 登顶美区 App Store 免费榜的手机实拍，图片检索标注来源为 Fortune 报道（2025-01-27）；经 1400px 缩放，验收时请留意：
https://fortune.com/2025/01/27/marc-andreessen-deepseek-ai-sputnik-moment/

—— 以下为 2026-09-18 第二批收录 ——
public/ernie-bot.jpg 为文心一言把成语「车水马龙」按字面生成的画面（2023 年初广泛流传的名场面），Commons 上传者标注为公有领域（可能由文心一言或 Stable Diffusion 生成）：
https://commons.wikimedia.org/wiki/File:文心一言创作的“车水马龙”.jpg
public/new-bing.png 为 Bing Chat 移动端界面截图（2023-11-28），Commons 标注为公有领域：
https://commons.wikimedia.org/wiki/File:Microsoft_Bing_Chat_on_Wikipedia_(28_November_2023)_05.png
public/gemini-1.png 为 Gemini 技术报告中的多模态推理演示图，Gemini Team 原作，CC BY 4.0：
https://commons.wikimedia.org/wiki/File:Gemini_multimodal_AI.png
public/whisper.png 为 Whisper 论文架构图（Figure 1），Radford 等原作，MIT 许可，经 1400px 缩放：
https://commons.wikimedia.org/wiki/File:OpenAI_Whisper_architecture.png
public/llama-2.jpg 为 Meta 官方 Llama 2 发布博客头图（og:image，fbcdn 原链有时效，已存档），经 1600px 缩放：
https://ai.meta.com/blog/llama-2/
public/dalle-3.jpg 为 OpenAI DALL-E 3 公告页官方样例（荔枝特写）：
https://openai.com/index/dall-e-3/
public/gpt-4o.png 为 OpenAI GPT-4o 公告页 og:image：
https://openai.com/index/hello-gpt-4o/
public/claude-3.png 为 Anthropic Claude 3 公告页 og:image（三宝石对应 Opus/Sonnet/Haiku）：
https://www.anthropic.com/news/claude-3-family
public/claude-4.jpg 为 Anthropic Claude 4 公告页头图（粘土手与大脑），经 1400px 缩放：
https://www.anthropic.com/news/claude-4
public/opus-5.jpg 为 Anthropic Claude Opus 5 公告页头图（粘土插画），经 1400px 缩放：
https://www.anthropic.com/news/claude-opus-5
public/gpt-6-astra.png 为 OpenAI GPT-6 Astra 公告页 og:image：
https://openai.com/index/gpt-6-astra/
public/gpt-5.png 为 GPT-5 思维链界面截图（2025-08-08 发布当周，德语界面），Commons 上传者标注公有领域：
https://commons.wikimedia.org/wiki/File:Denkprozess_GPT-5_Screenshot_2025-08-08_214952.png
public/nano-banana.jpg 为 Nano Banana 犀牛一致性测试图（含提示词，蜡笔材质版），Commons 标注公有领域，经 1000px 缩放：
https://commons.wikimedia.org/wiki/File:Nano_Banana_-_Crayon_Rhino.png
public/veo-3.jpg 为 Veo 3 演示视频「视觉系男子喝柠檬水」的 Commons 收录版截帧（上传者 VulcanSphere 标注公有领域）：
https://commons.wikimedia.org/wiki/File:Visual_Kei_Man_Enjoys_Lemonade_(Veo_3).webm
public/sora-2.jpg 为 Sora 2 发布视频「This is Sora 2」的 Commons 收录版截帧（上传者标注 Sora / OpenAI、公有领域）：
https://commons.wikimedia.org/wiki/File:OpenAI_-_This_is_Sora_2.webm
public/flux.jpg 为 Black Forest Labs 官方仓库 README 的样图网格（grid.jpg），经 1400px 缩放：
https://github.com/black-forest-labs/flux

## 事件来源
- https://openai.com/index/chatgpt/
- https://stability.ai/news-updates/stable-diffusion-public-release
- https://openai.com/index/gpt-4-research/
- https://openai.com/index/video-generation-models-as-world-simulators/
- https://openai.com/index/sora-is-here/
- https://api-docs.deepseek.com/news/news250120/
- https://github.com/deepseek-ai/DeepSeek-R1
- https://www.anthropic.com/news/claude-3-family
- https://openai.com/index/hello-gpt-4o/
- https://techcrunch.com/2026/09/25/meta-is-putting-its-muscle-behind-muse-as-the-ai-app-takes-off/
- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://www.anthropic.com/claude-opus-5-5

## 运行
npm install
npm run dev
npm run build

—— 以下为 2026-09-18 第三批收录（45 张，多来自各官方页 og:image / GitHub 官方仓库预览卡，经浏览器抓取；标注"经图片检索"者为新闻/站点配图，来源链为对应报道页）——
public/github-copilot-ga.jpg 为「github-copilot-ga」展品配图：官方博客配图。来源：https://github.blog/news-insights/company-news/github-copilot-is-generally-available-to-all-developers/
public/ms-openai.png 为「ms-openai-investment」展品配图：官方配图。来源：https://blogs.microsoft.com/blog/2023/01/23/microsoftandopenaiextendpartnership/
public/elevenlabs.png 为「elevenlabs」展品配图：官方品牌图。来源：https://elevenlabs.io
public/llama-leak.png 为「llama-leak」展品配图：官方仓库卡。来源：https://github.com/facebookresearch/llama
public/claude-1.jpg 为「claude-1」展品配图：官方配图。来源：https://www.anthropic.com/news/introducing-claude
public/runway-gen2.png 为「runway-gen2」展品配图：官方品牌卡。来源：https://runwayml.com
public/autogpt.png 为「autogpt」展品配图：官方仓库卡。来源：https://github.com/Significant-Gravitas/AutoGPT
public/xai-grok-1.jpg 为「xai-grok-1」展品配图：官方品牌图。来源：https://x.ai
public/mistral-7b.jpg 为「mistral-7b」展品配图：官方配图。来源：https://mistral.ai/news/announcing-mistral-7b
public/openai-devday.jpg 为「openai-devday」展品配图：报道配图（Business Insider，经图片检索）。来源：https://openai.com/index/openai-devday/
public/mixtral.jpg 为「mixtral」展品配图：官方配图。来源：https://mistral.ai/news/mixtral-of-experts
public/gemini-15.png 为「gemini-15」展品配图：官方视觉图。来源：https://deepmind.google/models/gemini/
public/devin.jpg 为「devin」展品配图：官方配图。来源：https://cognition.com/blog/introducing-devin
public/nvidia-gtc.jpg 为「nvidia-gtc」展品配图：报道配图（Wccftech，经图片检索）。来源：https://www.nvidia.com/en-us/events/gtc/
public/kimi-200w.png 为「kimi-200w」展品配图：宣传图（华军软件园，经图片检索，验收注意）。来源：https://www.moonshot.ai
public/suno-v3.jpg 为「suno-v3」展品配图：官方品牌图。来源：https://suno.com
public/llama-3.png 为「llama-3」展品配图：官方仓库卡。来源：https://github.com/meta-llama/llama3
public/kling.jpg 为「kling」展品配图：官网封面图。来源：https://klingai.com
public/apple-intelligence.png 为「apple-intelligence」展品配图：官方 og 图。来源：https://www.apple.com/apple-intelligence/
public/claude-35.jpg 为「claude-35」展品配图：官方配图。来源：https://www.anthropic.com/news/claude-3-5-sonnet
public/notebooklm.png 为「notebooklm」展品配图：官方主视觉。来源：https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/
public/o1-preview.png 为「o1-preview」展品配图：官方 og 图。来源：https://openai.com/index/introducing-openai-o1-preview/
public/qwen-25.svg 为「qwen-25」展品配图：Commons（CC0）标志。来源：https://commons.wikimedia.org/wiki/File:Qwen_logo.svg
public/computer-use.png 为「computer-use」展品配图：官方仓库卡。来源：https://github.com/anthropics/anthropic-quickstarts
public/chatgpt-search.jpg 为「chatgpt-search」展品配图：报道配图（SE Ranking，经图片检索）。来源：https://openai.com/index/chatgpt-search/
public/openai-12days.jpg 为「openai-12days」展品配图：报道插画（TechCrunch，经图片检索）。来源：https://openai.com/index/12-days-of-openai/
public/sora-turbo.jpg 为「sora-turbo」展品配图：官方 og 图。来源：https://openai.com/index/sora-is-here/
public/deepseek-v3.png 为「deepseek-v3」展品配图：官方仓库卡。来源：https://github.com/deepseek-ai/DeepSeek-V3
public/manus.png 为「manus」展品配图：官方横幅图。来源：https://manus.im
public/llama-4.png 为「llama-4」展品配图：官方 og 图。来源：https://ai.meta.com/llama/
public/codex-cli.png 为「codex-cli」展品配图：官方仓库卡。来源：https://github.com/openai/codex
public/qwen-3.png 为「qwen-3」展品配图：官方仓库卡。来源：https://github.com/QwenLM/Qwen3
public/grok-4.png 为「grok-4」展品配图：官方 og 图。来源：https://x.ai/news/grok-4
public/kimi-k2.png 为「kimi-k2」展品配图：官方仓库卡。来源：https://github.com/MoonshotAI/Kimi-K2
public/chatgpt-agent.png 为「chatgpt-agent」展品配图：官方 og 图。来源：https://openai.com/index/introducing-chatgpt-agent/
public/gpt-51.png 为「gpt-51」展品配图：官方 og 图。来源：https://openai.com/zh-Hans-CN/index/gpt-5-1/
public/gemini-3.jpg 为「gemini-3」展品配图：报道配图（新华社）。来源：http://www.news.cn/tech/20251120/fe871e40a8ae4865b25ed101802d0071/c.html
public/opus-45.jpg 为「opus-45」展品配图：官方配图。来源：https://www.anthropic.com/news/claude-opus-4-5
public/deepseek-v4-open.png 为「deepseek-v4-open」展品配图：报道配图（观察者网）。来源：https://www.guancha.cn/economy/2026_04_24_814797.shtml
public/agent-harness.jpg 为「agent-harness」展品配图：官方博客配图。来源：https://cursor.com/cn/blog/continually-improving-agent-harness
public/glm-52.png 为「glm-52」展品配图：官方仓库卡（GLM-5 前代仓库，验收注意）。来源：https://github.com/zai-org/GLM-5
public/kimi-k3.png 为「kimi-k3」展品配图：官方仓库卡。来源：https://github.com/MoonshotAI/Kimi-K3
public/deepseek-v4-pro.jpg 为「deepseek-v4-pro」展品配图：官方品牌卡。来源：https://api-docs.deepseek.com/zh-cn/news/news260813/
public/gemini-38.png 为「gemini-38」展品配图：官方头图。来源：https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/
public/ai-outage.png 为「ai-outage」展品配图：报道配图（21财经，尺寸较小）。来源：https://m.21jingji.com/article/20260904/herald/4b1de4e859674d1b41efdd1ccbbe4c00_zaker.html

—— 以下为 2026-09-30 第四批收录（站方供图）——
public/chatgpt-1m.png 为「chatgpt-1m」展品配图：Sam Altman 2022-12-05 推文截图（含马斯克回复），站方截取。原帖：https://x.com/sama/status/1599668808285028353
public/meta-muse.jpg 为「meta-muse」展品配图：Meta 发布会上 Muse 购物功能演示的现场画面，站方供图，原始出处待站方补充（PNG 转 JPG 收录）。
public/typesafe-jev.jpg 为「typesafe-jev」展品配图：打孔卡与专利图拼贴插画，站方供图，原始出处待站方补充（PNG 转 JPG 收录）。
