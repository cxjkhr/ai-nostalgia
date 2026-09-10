import type {Metadata} from 'next';
import './globals.css';
import './museum.css';
import MuseumHeader from '@/components/museum-header';
import MuseumFooter from '@/components/museum-footer';
export const metadata:Metadata={title:'AI Museum · 人工智能博物馆',description:'浏览 AI 历史展品、模型与界面，沿时间线探索人工智能的发展。',icons:{icon:'/archive.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body><MuseumHeader/>{children}<MuseumFooter/></body></html>}
