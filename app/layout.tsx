import type {Metadata} from 'next';
import './globals.css';
import './eras.css';
import './showcase.css';
import {transitionScript} from '@/lib/transitions';
import {eraFlowScript} from '@/lib/era-flow';
export const metadata:Metadata={title:'AI 怀旧服 · AI Museum',description:'2022—2026 年的 AI 标志性节点，每一年按那一年的界面重新搭一遍。',icons:{icon:'/archive.svg'}};
// 2026 手绘动画皮肤的标题字（站酷快乐体）；加载失败时回落到系统字体。
// noscript：不跑脚本的环境里，年份页的展品条目不再等流动展开，直接显示。
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><head><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap"/><script dangerouslySetInnerHTML={{__html:transitionScript}}/><script dangerouslySetInnerHTML={{__html:eraFlowScript}}/></head><body><noscript><style>{'.year-page .flow-wait{opacity:1;transform:none}'}</style></noscript>{children}</body></html>}
