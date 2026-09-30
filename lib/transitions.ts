// 页面转场脚本：放在 <head> 里同步执行，跨页 View Transitions 需要在新页面首帧前就位。
// 不支持的浏览器（没有 pagereveal）直接跳过，页面照常跳转。
//  · 开屏点某个版本：新页面从被点的那张卡片的位置展开
//  · 年份之间切换：按年份先后左右滑
//  · 点缩略图进详情：那张图飞到详情页大图的位置；从详情页回去时再飞回来
// 只给这一次转场要用的那张图临时起名（view-transition-name），不给整页几十张图都起名，省得截图开销。
export const transitionScript = `(function(){
if(!('onpagereveal' in window))return;
var K='vt-nav',reduce=matchMedia('(prefers-reduced-motion: reduce)');
function yearOf(p){var m=/^\\/year\\/(\\d{4})/.exec(p);return m?+m[1]:0}
function exOf(p){var m=/^\\/exhibits\\/([^\\/?#]+)/.exec(p);return m?decodeURIComponent(m[1]):''}
function nameImg(scope,id){var el=(scope||document).querySelector('[data-ex="'+id+'"]');if(el)el.style.viewTransitionName='ex-'+id;return el}
addEventListener('click',function(e){
  if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  var a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target)return;
  var u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname===location.pathname)return;
  var card=a.closest('.server'),r=(card||a).getBoundingClientRect(),id=exOf(u.pathname);
  if(id)nameImg(a,id)||nameImg(document,id);
  try{sessionStorage.setItem(K,JSON.stringify({from:location.pathname,card:!!card,r:[r.top,r.right,r.bottom,r.left],w:innerWidth,h:innerHeight}))}catch(_){}
},true);
addEventListener('pagereveal',function(e){
  var vt=e.viewTransition,d=null;
  try{d=JSON.parse(sessionStorage.getItem(K)||'null');sessionStorage.removeItem(K)}catch(_){}
  if(!vt)return;
  if(reduce.matches){vt.skipTransition();return}
  var to=location.pathname,from=d?d.from:'',fy=yearOf(from),ty=yearOf(to),types=vt.types;
  function add(t){if(types)types.add(t)}
  var back=exOf(from);if(back&&!exOf(to))nameImg(document,back);
  if(d&&d.card&&ty){
    add('enter');
    vt.ready.then(function(){var r=d.r;document.documentElement.animate({clipPath:['inset('+r[0]+'px '+(d.w-r[1])+'px '+(d.h-r[2])+'px '+r[3]+'px round 16px)','inset(0px 0px 0px 0px round 0px)']},{duration:700,easing:'cubic-bezier(.2,.8,.2,1)',pseudoElement:'::view-transition-new(root)'})});
  }else if(fy&&ty&&fy!==ty)add(ty>fy?'forward':'back');
  else if(exOf(to))add('detail');
});
})();`;
