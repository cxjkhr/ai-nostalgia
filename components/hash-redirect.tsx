'use client';
import {useEffect} from 'react';

// 首页以前就是时间线；旧链接 /#year-2023、/#e-gpt-4 打开开屏时，转到对应的年份页。
export default function HashRedirect({years}:{years:Record<string,string>}){
  useEffect(()=>{
    const hash=decodeURIComponent(location.hash.slice(1));
    const year=hash.startsWith('year-')?hash.slice(5):hash.startsWith('e-')?years[hash.slice(2)]:undefined;
    if(year&&Object.values(years).includes(year))location.replace('/year/'+year+(hash.startsWith('e-')?'#'+hash:''));
  },[years]);
  return null;
}
