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
  }],
  notebooklm: [{
    id:'first-audio-overview',title:'两位 AI 主持人，聊起了 NotebookLM',kind:'audio',
    src:'https://storage.googleapis.com/gweb-uniblog-publish-prod/media/final_audio.mp3',
    date:'2024-09-11',provenance:'AI 生成 · Google 官方音频样例',
    description:'Audio Overview 首发公告中的双人播客，约 8 分 26 秒，英语。材料是介绍 NotebookLM 的 Keyword 博文；听到的两位主持人都是 AI 生成的声音。',
    sourceUrl:'https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/',
  }],
};
