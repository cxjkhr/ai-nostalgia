import {type Skin,type EraProps} from '@/components/eras/shared';
import Era2022 from '@/components/eras/era-2022';
import Era2023 from '@/components/eras/era-2023';
import Era2024 from '@/components/eras/era-2024';
import Era2025 from '@/components/eras/era-2025';
import Era2026 from '@/components/eras/era-2026';

// 按年份挑出那一年的界面皮肤。
export function EraSkin({skin,...props}:EraProps&{skin:Skin}){
  switch(skin){
    case '2022':return <Era2022 {...props}/>;
    case '2023':return <Era2023 {...props}/>;
    case '2024':return <Era2024 {...props}/>;
    case '2025':return <Era2025 {...props}/>;
    default:return <Era2026 {...props}/>;
  }
}
