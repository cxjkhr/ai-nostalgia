import MuseumHeader from '@/components/museum-header';
import MuseumFooter from '@/components/museum-footer';
export default function NotFound(){return <><MuseumHeader/><main className="shell-main not-found"><span className="shell-kicker">404</span><h1>这份档案还未收录。</h1><p>可以回到开屏，重新选一个版本。</p><a className="return-button" href="/">回到开屏 →</a></main><MuseumFooter/></>}
