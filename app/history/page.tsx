import {redirect} from 'next/navigation';
// 时间线已并入首页；保留旧路径跳转，避免历史链接 404。
export default function History(){redirect('/')}
