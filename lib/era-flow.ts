// 年份页展品条目的流动展开：条目在 SSR 里就带 flow-wait（配合 globals.css 藏住），
// 这段脚本在 DOM 就绪后用 IntersectionObserver 分批放出来——首批等全年刻度到位后按顺序进场
//（延时从文档起点折算，和 CSS 的标题/刻度入场动画对齐），之后的批次随滚动到哪浮到哪。
// 放在 head 里随页加载、不依赖 React hydration：开了「减少动态效果」或没有 IntersectionObserver
// 的环境直接全部放行；完全不跑脚本的环境由 layout 里的 <noscript> 样式兜底显示。
export const eraFlowScript = `(function(){
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn)}
ready(function(){
  var page=document.querySelector('.year-page');if(!page)return;
  var items=[].slice.call(page.querySelectorAll('.flow-wait'));if(!items.length)return;
  var revealAll=function(){for(var i=0;i<items.length;i++){items[i].classList.remove('flow-wait');items[i].classList.add('flow-in')}};
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){revealAll();return}
  var elapsed=performance.now()/1000,first=true;
  var io=new IntersectionObserver(function(entries){
    var k=0;
    for(var i=0;i<entries.length;i++){
      var t=entries[i];if(!t.isIntersecting)continue;
      io.unobserve(t.target);
      t.target.style.transitionDelay=(first?Math.max(.15,.92-elapsed)+k*.08:k*.07)+'s';
      t.target.classList.remove('flow-wait');t.target.classList.add('flow-in');
      k++;
    }
    if(k)first=false;
  },{rootMargin:'0px 0px -10% 0px'});
  for(var j=0;j<items.length;j++)io.observe(items[j]);
});
})();`;
