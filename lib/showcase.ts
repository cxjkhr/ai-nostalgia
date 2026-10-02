export type ExhibitWork = {
  id: string;
  title: string;
  kind: 'image' | 'video' | 'audio' | 'interactive';
  src: string;
  poster?: string;
  alt?: string;
  date: string;
  provenance: string;
  description: string;
  prompt?: string;
  sourceUrl: string;
  sourceLabel?: string;
  transcript?: string;
};

// 只收录已核实的文件或官方媒体地址；一条事件可以收录多件作品。
export const showcases: Record<string, ExhibitWork[]> = {
  'dalle-2': [{
    id:'astronaut-horse',title:'宇航员骑马',kind:'image',
    src:'/artifacts/dalle-2-astronaut.jpg',alt:'穿着宇航服的宇航员骑在马背上，照片风格的 DALL·E 2 生成图',
    date:'2022 年发布样例',provenance:'AI 生成 · DALL·E 2 官方样例',
    description:'把两个熟悉的事物放到一起，却得到一张从未被拍摄过的照片。这张官方样例展示了 DALL·E 2 对文字组合的理解。原图保持原样。',
    prompt:'A photorealistic image of an astronaut riding a horse',
    sourceUrl:'https://openai.com/index/dall-e-2/',
  }],
  sora: [{
    id:'tokyo-walk',title:'东京街头漫步',kind:'video',
    src:'https://cdn.openai.com/sora/videos/tokyo-walk.mp4',poster:'/sora.jpg',
    date:'2024-02-15',provenance:'AI 生成 · Sora 官方样片',
    description:'红裙女子走过霓虹灯映照的东京街头。这是 Sora 首次研究展示时的官方视频，约 60 秒；当时尚未向公众开放使用。',
    prompt:'A stylish woman walks down a Tokyo street filled with warm glowing neon and animated city signage. She wears a black leather jacket, a long red dress, and black boots, and carries a black purse. She wears sunglasses and red lipstick. She walks confidently and casually. The street is damp and reflective, creating a mirror effect of the colorful lights. Many pedestrians walk about.',
    sourceUrl:'https://openai.com/index/sora/',
  },{
    id:'ships-in-coffee',title:'咖啡杯里的海盗船',kind:'video',
    src:'https://cdn.openai.com/sora/videos/ships-in-coffee.mp4',
    date:'2024-02-15',provenance:'AI 生成 · Sora 官方样片',
    description:'两条海盗船在一只咖啡杯里开战。Sora 首发样片里传播最广的一条之一，官方 CDN 原片。',
    prompt:'Photorealistic closeup video of two pirate ships battling each other as they sail inside a cup of coffee.',
    sourceUrl:'https://openai.com/index/sora/',
  },{
    id:'mitten-astronaut',title:'红毛线帽宇航员',kind:'video',
    src:'https://cdn.openai.com/sora/videos/mitten-astronaut.mp4',
    date:'2024-02-15',provenance:'AI 生成 · Sora 官方样片',
    description:'预告片质感的宇航员历险：红色毛线编织头盔、盐漠、35mm 胶片色。首发时的官方样片之一。',
    prompt:'A movie trailer featuring the adventures of the 30 year old space man wearing a red wool knitted motorcycle helmet, blue sky, salt desert, cinematic style, shot on 35mm film, vivid colors.',
    sourceUrl:'https://openai.com/index/sora/',
  },{
    id:'gold-rush',title:'淘金热“史料影像”',kind:'video',
    src:'https://cdn.openai.com/sora/videos/gold-rush.mp4',
    date:'2024-02-15',provenance:'AI 生成 · Sora 官方样片',
    description:'一句提示词生成的 19 世纪加州淘金热“历史影像”。Sora 首发时引发“以后连历史录像都不能信”讨论的就是这一条。',
    prompt:'Historical footage of California during the gold rush.',
    sourceUrl:'https://openai.com/index/sora/',
  }],
  notebooklm: [{
    id:'first-audio-overview',title:'两位 AI 主持人，聊起了 NotebookLM',kind:'audio',
    src:'https://storage.googleapis.com/gweb-uniblog-publish-prod/media/final_audio.mp3',
    date:'2024-09-11',provenance:'AI 生成 · Google 官方音频样例',
    description:'Audio Overview 首发公告中的双人播客，约 8 分 26 秒，英语。材料是介绍 NotebookLM 的 Keyword 博文；听到的两位主持人都是 AI 生成的声音。',
    sourceUrl:'https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/',
  }],
  'stable-diffusion': [{
    id:'sketch-mountains',title:'素描变风景',kind:'image',
    src:'https://raw.githubusercontent.com/CompVis/stable-diffusion/main/assets/stable-samples/img2img/mountains-2.png',
    alt:'基于手绘山景素描生成的写实风格群山风景画',
    date:'2022 年开源发布样例',provenance:'AI 生成 · Stable Diffusion 官方仓库样例',
    description:'CompVis 在 GitHub 开源 Stable Diffusion 时给出的 img2img 演示：作者用 Pinta 画了一张山景素描，配合一句提示词，草图变成写实风景（演示强度 0.8）。当年「随手涂鸦变实景」玩法的起点。',
    prompt:'A fantasy landscape, trending on artstation',
    sourceUrl:'https://github.com/CompVis/stable-diffusion#img2img',
  },{
    id:'txt2img-grid',title:'开源发布样例网格',kind:'image',
    src:'https://raw.githubusercontent.com/CompVis/stable-diffusion/main/assets/stable-samples/txt2img/merged-0006.png',
    alt:'Stable Diffusion 首次开源时附带的文生图样例拼图',
    date:'2022 年开源发布样例',provenance:'AI 生成 · Stable Diffusion 官方仓库样例',
    description:'首次开源时仓库 README 开头附带的文生图样例拼图，很多人对 Stable Diffusion 的第一眼来自这类图。',
    sourceUrl:'https://github.com/CompVis/stable-diffusion',
  }],
  'veo-3': [{
    id:'veo3-sailor',title:'官方样例：水手',kind:'video',
    src:'https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/media/veo__veo-3__sailor.webm',
    date:'2025 年 Veo 3 样例',provenance:'AI 生成 · Google DeepMind 官方样片',
    description:'Google DeepMind 官方 Veo 页面在列的 Veo 3 展示样例（原文件名 sailor）。源文件为官方 WebM，约 1.9MB。',
    sourceUrl:'https://deepmind.google/models/veo/',
  },{
    id:'veo3-forest',title:'官方样例：森林',kind:'video',
    src:'https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/media/veo__veo-3__forest.webm',
    date:'2025 年 Veo 3 样例',provenance:'AI 生成 · Google DeepMind 官方样片',
    description:'同一页面的另一条 Veo 3 展示样例（原文件名 forest）。源文件为官方 WebM，约 2.2MB。',
    sourceUrl:'https://deepmind.google/models/veo/',
  }],
  'meta-muse': [{
    id:'muse-sizzle',title:'Muse 发布宣传片',kind:'video',
    src:'https://about.fb.com/wp-content/uploads/2026/09/Introducing-Muse_Sizzle-Video.mp4',
    date:'2026-09-08',provenance:'AI 生成 · Meta 官方发布视频',
    description:'Meta 官方公告页顶部的 Muse 发布宣传片，随发布公告一同上线。',
    sourceUrl:'https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/',
  },{
    id:'muse-shopping',title:'Muse 购物演示',kind:'video',
    src:'https://about.fb.com/wp-content/uploads/2026/09/Muse_Shopping.mp4',
    date:'2026-09-08',provenance:'AI 生成 · Meta 官方发布视频',
    description:'官方公告「隐私与安全」一节里的购物结账演示片段，展示 Muse 替用户完成下单的流程。',
    sourceUrl:'https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/',
  }],
  'nano-banana': [{
    id:'tea-party',title:'和童年的自己喝下午茶',kind:'image',
    src:'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Tea_party.width-2000.format-webp.webp',
    alt:'左：成年女性的照片；右：成年女性与童年版本的自己一起喝下午茶的合影',
    date:'2025-08-26 官方示例',provenance:'AI 生成 · Google 官方博客演示图',
    description:'官方博客「Nano Banana 十个示例」之一：把用户上传的童年照片与现在的自己合成到同一场景。这种「和过去的自己合影」是 Nano Banana 出圈期最普遍的玩法。',
    sourceUrl:'https://blog.google/products-and-platforms/products/gemini/gemini-nano-banana-examples/',
  },{
    id:'dog-figurine',title:'狗狗变手办',kind:'image',
    src:'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/DogFigurine.width-2000.format-webp.webp',
    alt:'左：一只趴着的骑士查理王小猎犬；右：桌面上未拆封礼物盒里的狗狗 3D 手办',
    date:'2025-08-26 官方示例',provenance:'AI 生成 · Google 官方博客演示图',
    description:'同一篇官方博客的示例：把宠物照片变成桌上 3D 手办。「万物皆可手办化」是当时社交网络的另一波跟拍热潮。',
    sourceUrl:'https://blog.google/products-and-platforms/products/gemini/gemini-nano-banana-examples/',
  }],
  'opus-5': [{
    id:'opus5-aeolus',title:'风洞：会转的气流演示',kind:'interactive',
    src:'https://assets.claude.ai/brand/artifacts/blog/opus/5-aeolus-demo.html',
    date:'2026-07-24 官方演示',provenance:'AI 生成 · Anthropic 官方交互演示',
    description:'Opus 5 发布公告里的官方 artifact：一辆红色跑车在 3D 风洞里，拉动滑杆改变风速、转动车身看气流变化。这个演示本身就是 Opus 5 写出来的。已验证可在本站沙箱中运行。',
    sourceUrl:'https://www.anthropic.com/news/claude-opus-5',
    sourceLabel:'查看发布公告',
  }],
  'runway-gen2': [{
    id:'spaghetti-benchmark',title:'威尔·史密斯吃意面',kind:'video',
    src:'https://upload.wikimedia.org/wikipedia/commons/6/65/Will_Smith_Eating_Spaghetti_Original.webm',
    date:'2023-03-27',provenance:'AI 生成 · ModelScope 文生视频 · u/chaindrop（维基共享资源 PD 收录）',
    description:'2023 年 3 月 AI 视频的「拉跨基准」：Reddit 用户用 ModelScope 文生视频生成的这段鬼畜画面疯传后，成了大家衡量 AI 视频进步的固定考题——之后每家新模型发布，都有人让 AI 再吃一遍意面。注意：这是同期的 ModelScope 作品而非 Runway Gen-2，收录在此代表当月的文生视频水平。Wikipedia 有专门词条记录这段历史；原文件以公有领域（PD-algorithm）收录于维基共享资源。',
    sourceUrl:'https://en.wikipedia.org/wiki/Will_Smith_Eating_Spaghetti_test',
    sourceLabel:'查看这段历史（Wikipedia）',
  }],
  flux: [{
    id:'flux-grid',title:'官方样例网格',kind:'image',
    src:'https://raw.githubusercontent.com/black-forest-labs/flux/main/assets/grid.jpg',
    alt:'FLUX.1 官方九宫格样例：藤蔓覆盖的卧室传送门、飞过城市的鲸鱼、海边戴墨镜的老人、老电视上的 FLUX 字样、在黑板写诗的机器人、霓虹侧脸、喷出照片的宝丽来相机',
    date:'2024-08-01 开源发布样例',provenance:'AI 生成 · Black Forest Labs 官方仓库样例',
    description:'FLUX.1 开源时官方仓库 README 顶部的九宫格样例：写诗句的机器人、藤蔓之门、飞鲸掠过城市天际线……当年开源模型里文字渲染与画面叙事能力的代表展示。',
    sourceUrl:'https://github.com/black-forest-labs/flux',
  }],
};
