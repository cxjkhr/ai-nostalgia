export const eras=[
{year:'2022',title:'一切，从一句你好开始。',subtitle:'我们第一次发现，和电脑聊天，可以不只是聊天。',name:'ChatGPT',date:'2022.11.30',tag:'对话的起点',line:'一个输入框，打开了一个新世界。',detail:'ChatGPT 以研究预览的形式上线。人们开始尝试让它写文章、解释概念和修改代码，同时也遇到它自信却不正确的回答。',source:'https://openai.com/index/chatgpt/',secondary:'Stable Diffusion',secondaryDate:'2022.08.22',secondaryLine:'把一句话，变成一幅画。',secondaryDetail:'Stable Diffusion 公开发布，让更多人能够在自己的设备上探索文字生成图像。展品来自 CompVis 官方仓库，保留原始样貌。',secondarySource:'https://stability.ai/news-updates/stable-diffusion-public-release',note:'当时觉得：能写出一整段像样的话，就已经很厉害了。'},
{year:'2023',title:'从能聊天，到能帮忙。',subtitle:'问题变长了，期待也变高了。我们开始把工作交给它。',name:'GPT-4',date:'2023.03.14',tag:'能力的跃迁',line:'这一次，问题可以再难一点。',detail:'GPT-4 发布，展示了更强的推理与处理复杂指令的能力。它可接受图像和文本输入、输出文本；发布时不同功能的开放范围并不相同。',source:'https://openai.com/index/gpt-4-research/',secondary:'复杂任务',secondaryDate:'2023',secondaryLine:'从一个回答，到一份可以继续修改的草稿。',secondaryDetail:'这一页用编辑式笔记回看使用方式的变化，并非真实聊天记录或模型评测。',secondarySource:'https://openai.com/index/gpt-4-research/',note:'回头看，最先改变的可能不是工作，而是我们提问题的方式。'},
{year:'2024',title:'想象，开始动起来。',subtitle:'文字之外，我们开始期待会动的世界。',name:'Sora',date:'2024.02.15',tag:'视频的新想象',line:'写下一段话，然后看它发生。',detail:'OpenAI 首次展示 Sora，并发布技术报告。这里记录的是研究展示节点，不代表当日已经向所有用户开放。',source:'https://openai.com/index/video-generation-models-as-world-simulators/',secondary:'Sora Turbo',secondaryDate:'2024.12',secondaryLine:'从研究展示，走向产品。',secondaryDetail:'同年 12 月，Sora Turbo 随产品发布。首次展示与产品上线，值得分别留下一张档案卡。',secondarySource:'https://openai.com/index/sora-is-here/',note:'以前问“这张图是真的吗”，后来还得再问一句“这段视频呢”。'},
{year:'2025',title:'答案之前，多了一段思考。',subtitle:'推理模型走进更多人的日常，等待也有了新的意义。',name:'DeepSeek-R1',date:'2025.01.20',tag:'推理的时刻',line:'我们开始看见，答案之前的过程。',detail:'DeepSeek 发布 R1 推理模型，并提供开放权重。数学、代码和推理任务成为这一节点的重要关注点。',source:'https://api-docs.deepseek.com/news/news250120/',secondary:'开放的模型',secondaryDate:'2025.01',secondaryLine:'把探索的机会，交给更多人。',secondaryDetail:'DeepSeek-R1 同时发布了基于 Qwen 与 Llama 的蒸馏模型。不同大小的模型，为研究与本地实验提供了更多选择。',secondarySource:'https://github.com/deepseek-ai/DeepSeek-R1',note:'“稍等，我想一想。”这句话，电脑也开始说了。'}];
export type TimelineEvent = { id: string; year: string; date: string; name: string; tag: string; line: string; detail: string; source: string; visual?: 'chat' | 'image' };
export const events: TimelineEvent[] = [
  {id:'stable-diffusion',year:'2022',date:'2022-08-22',name:eras[0].secondary,tag:'图像生成',line:eras[0].secondaryLine,detail:eras[0].secondaryDetail,source:eras[0].secondarySource,visual:'image'},
  ...eras.map((e,i)=>({id:['chatgpt','gpt-4','sora','deepseek-r1'][i],year:e.year,date:e.date.replaceAll('.','-'),name:e.name,tag:e.tag,line:e.line,detail:e.detail,source:e.source,visual:i===0?'chat' as const:undefined})),
  {id:'claude-3',year:'2024',date:'2024-03-04',name:'Claude 3',tag:'模型家族',line:'不同大小的模型，开始分工。',detail:'Anthropic 发布 Claude 3 家族：Haiku、Sonnet 和 Opus。发布当天 Sonnet 与 Opus 开放使用，Haiku 随后推出。',source:'https://www.anthropic.com/news/claude-3-family'},
  {id:'gpt-4o',year:'2024',date:'2024-05-13',name:'GPT-4o',tag:'多模态',line:'对话，从文字走向声音与画面。',detail:'OpenAI 发布 GPT-4o，展示了跨文本、音频与图像的实时交互方向。各项功能分阶段开放，发布演示不等于所有功能当天可用。',source:'https://openai.com/index/hello-gpt-4o/'},
  {id:'sora-turbo',year:'2024',date:'2024-12-09',name:'Sora Turbo',tag:'产品上线',line:eras[2].secondaryLine,detail:eras[2].secondaryDetail,source:eras[2].secondarySource},
] satisfies TimelineEvent[];
events.sort((a,b)=>a.date.localeCompare(b.date));


export const categories = [
 {id:'models',name:'对话与推理',description:'从第一句你好，到更复杂的问题。'},
 {id:'images',name:'图像生成',description:'把一句话变成图像，保存最初的想象。'},
 {id:'video',name:'视频生成',description:'当静止的画面开始拥有时间。'},
];
export function categoryFor(event: TimelineEvent) { return event.id==='stable-diffusion'?'images':event.id.startsWith('sora')?'video':'models'; }
export function dateLabel(date:string) { const [y,m,d]=date.split('-');return y+' 年 '+Number(m)+' 月 '+Number(d)+' 日'; }

