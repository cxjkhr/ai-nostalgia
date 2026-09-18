# AI Museum · AI 怀旧服

交互式视觉 demo：2022—2026 连续时间线、顶部年份锚点跳转、随滚动更新的年份高亮、档案详情、预设聊天示例。共收录 77 个标志性节点（2022 至 2026 年 9 月）；每年主展品置顶打头，其余事件按日期排列，重要事件用大卡片、次要事件用紧凑单行分层呈现。

沿用米白、墨绿档案馆外观，博物馆式信息架构：
- 首页即时间线：开场导语后直接进入 2022—2026 连续时间线（2022 由 ChatGPT 打头、2026 由 GPT-6 Astra 打头），保留年份锚点和卡片从右侧淡入。
- 全部展品位于 /exhibits；六个分类展区：对话与推理、图像生成、视频生成、声音与音乐、智能体与工具、开源时刻。展品目录按日期从早到晚排列。
- 每件展品有独立详情页，提供日期、介绍、展品、原始资料和 Previous / Next。相邻展品按全站时间顺序浏览。
- 旧路径 /history 重定向到首页，历史链接不断。
- 首件没有 Previous，末件返回全部展品；未知展品和分类返回 404。

## 内容边界
聊天界面为编辑式重构，回答为预设演示文字，不连接真实模型。手记为原创演示文案，不冒充历史评论。精选节点并非完整年表。详情页预留"当年，人们这么说"评论区入口：仅当展品收录有评论时显示。留言由站方从公开社区收集并匿名化（化名按楼层自动 Alice/Bob/Carol 顺序编排，来源在页内注明）；不收录任何虚构评论。

## 历史图片
public/stable-diffusion.png 原样下载自 CompVis/stable-diffusion 官方仓库：
https://github.com/CompVis/stable-diffusion/blob/main/assets/stable-samples/txt2img/000002025.png
下载日期：2026-09-10。仅作为原始项目样例展示；未断言具体 checkpoint 或提示词。仓库提供 CreativeML Open RAIL-M 许可；图片未单独列出许可。
public/dalle-2.png 为左右拼图：左图“宇航员骑马（写实风格）”原样取自 OpenAI 官网 DALL·E 2 页面素材（images.ctfassets.net，2026-09-17 下载）；右图“弹电贝斯的北极熊”为站方档案收录的生成图，未断言具体生成模型。两图由站方拼接展示。

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

## 运行
npm install
npm run dev
npm run build
