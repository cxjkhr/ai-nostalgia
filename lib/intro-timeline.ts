// 开场动画的时间轴（单位：秒）。画面和配乐共用这一份：打字出现的时刻同时就是键盘声的时刻。
// 节拍 120 BPM，一小节 2 秒；每个年份 5 小节（10 秒），开头 2 小节、结尾 4 小节，共 62 秒。
// 每一年只讲一件和那年界面气质对得上的事，并把它讲完整：
// 2022 一个输入框里的第一次对话 → 2023 在频道里念咒画画 → 2024 能听、能看、还能把画面变成视频
// → 2025 先想再答：当年难倒 AI 的两道老题 → 2026 一句话，AI 用代码把动画画出来。
export const BEAT = 0.5;
export const BAR = 2;
export const FILM_LEN = 62;

export type FilmEra = {year: string; from: number; to: number; skin: string; server: string; caption: string};
export const filmEras: FilmEra[] = [
  {year: '2022', from: 4, to: 14, skin: '研究预览', server: '怀旧服', caption: '一个输入框，打开了一个新世界。'},
  {year: '2023', from: 14, to: 24, skin: '社区频道', server: '怀旧服', caption: '那一年，画画要去频道里念咒。'},
  {year: '2024', from: 24, to: 34, skin: '多模态', server: '怀旧服', caption: '它开始能听、能看，还能让画面动起来。'},
  {year: '2025', from: 34, to: 44, skin: '深度思考', server: '怀旧服', caption: '答案之前，多了一段思考。'},
  {year: '2026', from: 44, to: 54, skin: '手绘动画', server: '正式服', caption: '现在，一句话，它就能把动画画出来。'},
];
export const FINALE = 54;
// 2026 的第四格：画好的小机器人"活过来"，配乐在这里敲一下
export const ALIVE = 48;

// 逐字打出来的文本。tick：配乐里要不要给每个字配一下键盘声。
export type TypeCue = {id: string; at: number; cps: number; text: string; tick?: 'key' | 'soft'};
export const typeCues: TypeCue[] = [
  {id: 'hello', at: 0.5, cps: 11, text: '你还记得，你第一次和 AI 讲话吗？', tick: 'key'},
  // 2022
  {id: 'u1', at: 4.9, cps: 9, text: '你好，你是谁？', tick: 'key'},
  {id: 'a1', at: 6.1, cps: 18, text: '你好！我是一个 AI 语言模型，可以回答问题、写文章，也可以陪你聊天。', tick: 'soft'},
  {id: 'u2', at: 8.7, cps: 10, text: '那你猜猜，今年世界杯谁夺冠？', tick: 'key'},
  {id: 'a2', at: 10.4, cps: 18, text: '抱歉，我的知识截止于 2021 年，无法得知之后发生的事情……', tick: 'soft'},
  // 2023
  {id: 'cmd', at: 14.8, cps: 18, text: '/画 一双张开的手，masterpiece，best quality，8k', tick: 'key'},
  {id: 'neg', at: 21.4, cps: 20, text: '/画 再来一张，bad hands，extra fingers，模糊，低质量', tick: 'key'},
  // 2024
  {id: 'v1', at: 24.9, cps: 10, text: '嘿，你看得见我手里拿的是什么吗？'},
  {id: 'v2', at: 27.6, cps: 11, text: '一杯拿铁，拉花是一片叶子。要我教你怎么拉吗？'},
  {id: 'v3', at: 29.9, cps: 10, text: '那把它变成一段视频吧。'},
  // 2025：两道当年的"翻车题"，这回先想再答
  {id: 'q', at: 34.5, cps: 12, text: '9.11 和 9.9，哪个大？', tick: 'key'},
  {id: 't1', at: 35.4, cps: 24, text: '嗯，用户问 9.11 和 9.9 哪个大。'},
  {id: 't2', at: 36.3, cps: 24, text: '9.11 的小数位更多，看起来好像更大……'},
  {id: 't3', at: 37.2, cps: 24, text: '等等，先比十分位：1 比 9 小。'},
  {id: 't4', at: 38.1, cps: 24, text: '所以应该是 9.9 更大。'},
  {id: 'q2', at: 40.9, cps: 14, text: '那 strawberry 里有几个 r？', tick: 'key'},
  {id: 't5', at: 42.3, cps: 30, text: 'st-r-awbe-r-r-y，数一下……'},
  // 2026
  {id: 'code', at: 44.5, cps: 36, text: '<svg viewBox="0 0 120 80">\n  <path d="M44 14h32v32H44z"/>\n  <animate attributeName="d"\n    dur="1s" repeatCount="indefinite"/>', tick: 'soft'},
];
export const typeEnd = (c: TypeCue) => c.at + [...c.text].length / c.cps;

// 2025：两次思考的起止、两个答案出现的时刻
export const think25: [number, number][] = [[35.2, 39.2], [42.1, 43.2]];
export const answer25: [number, number] = [39.5, 43.4];
// 2026：一格一格的分镜 [出现时刻, 标题, 一句话]
export const panels26: [number, string, string][] = [
  [44.3, '写代码', '一句话，变成一屏代码'],
  [45.6, '起稿', '一笔一笔，描出线稿'],
  [46.9, '上色', '填上颜色'],
  [ALIVE, '动起来', '它活过来了'],
  [49.3, '配乐', '音乐也是代码写的'],
  [50.6, 'Claude Opus 5.5', '正式服 · 当前版本'],
];
// 分镜落笔的时刻，配乐里配一下铅笔声
export const sketchAt = panels26.map(p => p[0]);
