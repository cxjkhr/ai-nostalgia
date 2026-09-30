import HistoryTimeline from '@/components/history-timeline';
import VersionSelect from '@/components/version-select';
export default function Home(){return <main className="home"><section className="intro"><div className="intro-copy"><p className="shell-kicker">AI 怀旧服 · 2022—ONGOING</p><h1>才几年，AI 就能开<span>怀旧服</span>了？</h1><p>你还记得你第一次和 AI 讲话吗？</p></div><div className="intro-select"><p className="intro-select-label">选择版本进入 ↓</p><VersionSelect/></div></section><HistoryTimeline/></main>}
