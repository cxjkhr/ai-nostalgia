// 开服动画要不要弹：在 <head> 里同步判断，避免开屏先闪一下再盖上动画。
// 只在首页、没有带 #锚点（旧链接跳转）、没看过、也没开"减少动态效果"时弹；
// 弹出的是一道门，要点一下"开服"才播放（浏览器不允许没有点击就出声）。看过一次后不再自动弹，开屏右上角可以重播。
export const introGateScript = `(function(){try{
if(location.pathname!=='/'||location.hash)return;
if(localStorage.getItem('intro-seen'))return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
document.documentElement.dataset.intro='gate';
}catch(_){}})();`;
