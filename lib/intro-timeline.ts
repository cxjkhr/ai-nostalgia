// 开场动画的时间轴（单位：秒）。画面和配乐共用这一份：打字出现的时刻同时就是键盘声的时刻。
// 节拍 120 BPM，一小节 2 秒；每个年份 5 小节（10 秒），开头 2 小节、结尾 4 小节，共 62 秒。
// 文案里的事件与日期均取自 lib/museum.ts 的展品，不另编事实。
export const BEAT = 0.5;
export const BAR = 2;
export const FILM_LEN = 62;

export type FilmEra = {year: string; from: number; to: number; skin: string; server: string};
export const filmEras: FilmEra[] = [
  {year: '2022', from: 4, to: 14, skin: '研究预览', server: '怀旧服'},
  {year: '2023', from: 14, to: 24, skin: '社区频道', server: '怀旧服'},
  {year: '2024', from: 24, to: 34, skin: '多模态', server: '怀旧服'},
  {year: '2025', from: 34, to: 44, skin: '深度思考', server: '怀旧服'},
  {year: '2026', from: 44, to: 54, skin: '手绘动画', server: '正式服'},
];
export const FINALE = 54;
// 黑色星期四：画面黑一拍，音乐断一拍
export const OUTAGE: [number, number] = [48, 49];

// 逐字打出来的文本。tick：配乐里要不要给每个字配一下键盘声。
export type TypeCue = {id: string; at: number; cps: number; text: string; tick?: 'key' | 'soft'};
export const typeCues: TypeCue[] = [
  {id: 'hello', at: 0.5, cps: 11, text: '你还记得，你第一次和 AI 讲话吗？', tick: 'key'},
  {id: 'u1', at: 4.9, cps: 9, text: '你好，你是谁？', tick: 'key'},
  {id: 'a1', at: 6.1, cps: 18, text: '你好！我是一个 AI 语言模型，可以回答问题、写文章，也可以陪你聊天。', tick: 'soft'},
  {id: 'u2', at: 8.7, cps: 10, text: '那你猜猜，今年世界杯谁夺冠？', tick: 'key'},
  {id: 'a2', at: 10.4, cps: 18, text: '抱歉，我的知识截止于 2021 年，无法得知之后发生的事情……', tick: 'soft'},
  {id: 'q25', at: 34.5, cps: 12, text: '这四年，AI 到底变了多少？', tick: 'key'},
  {id: 't1', at: 35.5, cps: 30, text: '先回到 2022：那时它连今年是哪一年都不知道……'},
  {id: 't2', at: 36.5, cps: 30, text: '2023 年，它学会了看图，也学会了一本正经地胡说……'},
  {id: 't3', at: 37.5, cps: 30, text: '2024 年，画面动了起来，它还长出了耳朵……'},
  {id: 't4', at: 38.5, cps: 30, text: '所以，答案应该是——'},
];
export const typeEnd = (c: TypeCue) => c.at + [...c.text].length / c.cps;

// 每一幕依次出现的条目：[出现时刻, 日期, 标题, 一句话]
export type Beat = [number, string, string, string];
export const beats2023: Beat[] = [
  [14.6, '02.08', 'Bard 首秀翻车', '一张宣传图里的天文错误，蒸发了千亿市值'],
  [15.8, '03.14', 'GPT-4', '这一次，问题可以再难一点'],
  [17.0, '03.16', '文心一言发布', '中国大模型的春天，从一场发布会开始'],
  [18.2, '03.27', '史密斯嗦面', '面条一会儿进嘴，一会儿出嘴'],
  [19.4, '05.09', 'AI 孙燕姿刷屏', '冷门歌手孙燕姿，热门歌手 AI 孙燕姿'],
  [20.6, '11.17', 'Altman 解雇风波', '周五被解雇，周三回来上班'],
];
export const beats2024: Beat[] = [
  [24.8, '02.15', 'Sora', '写下一段话，然后看它发生'],
  [26.4, '05.13', 'GPT-4o', '对话，从文字走向声音与画面'],
  [28.0, '06.20', 'Claude 3.5 Sonnet', '聊天框里，第一次长出了画布'],
  [29.6, '10.08', '诺奖之夜', '物理奖、化学奖，连中两元'],
  [31.2, '11.25', 'MCP', '给所有 AI 发了一根 USB-C'],
];
export const beats2025: Beat[] = [
  [39.6, '01.20', 'DeepSeek-R1', '我们开始看见，答案之前的过程'],
  [40.4, '03.25', '吉卜力狂潮', '全网都在吉卜力'],
  [41.2, '04.16', 'Claude Code', '命令行里，住进了一位同事'],
  [42.0, '08.07', 'GPT-5', '传闻了两年，它终于来了'],
  [42.8, '08.26', 'Nano Banana', '一根香蕉，统治了图表'],
];
export const beats2026: Beat[] = [
  [44.6, '07.16', 'Kimi K3', '2.8 万亿参数，直接开源'],
  [45.8, '09.03', 'GPT-6 Astra', '第一个被称作 Critical 的模型'],
  [47.0, '09.03', '黑色星期四', '同一个下午，三家一起挂了'],
  [49.2, '09.08', 'Meta Muse', '关掉 App，它还在替你干活'],
  [50.3, '09.15', 'TypeSafe Jev', '不写句子，只给选项和概率'],
  [51.4, '09.22', 'Claude Opus 5.5', '正式服 · 当前版本'],
];
// 2026 每格分镜落笔的时刻，配乐里配一下铅笔声
export const sketchAt = beats2026.map(b => b[0]);
