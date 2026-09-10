import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'AI 怀旧服 · 未来的旧时光',description:'收集 AI 的成长，也留住我们第一次惊讶的瞬间。',icons:{icon:'/archive.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}
