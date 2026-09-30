import type {Metadata} from 'next';
import './globals.css';
import './eras.css';
export const metadata:Metadata={title:'AI 怀旧服 · AI Museum',description:'2022—2026 年的 AI 标志性节点，每一年按那一年的界面重新搭一遍。',icons:{icon:'/archive.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}
