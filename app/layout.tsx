import type {Metadata} from 'next';
import './globals.css';
import './eras.css';
export const metadata:Metadata={title:'AI 怀旧服 · AI Museum',description:'2022—2026 年的 AI 标志性节点，每一年按那一年的界面重新搭一遍。',icons:{icon:'/archive.svg'}};
// 2026 手绘动画皮肤的标题字（站酷快乐体）；加载失败时回落到系统字体。
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><head><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap"/></head><body>{children}</body></html>}
