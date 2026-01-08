import { memo } from 'react';
import Mainbutton from '../components/Mainbutton';
import Counter from '../components/Counter';
import ShadowMode from '../components/ShadowMode';
import Appbar from '../components/Appbar';

const dashbaoard = () => {
  return (
    <div className='flex flex-col items-center min-h-screen justify-center  bg-radial-[at_50%_5%] from-cyan-400 via-blue-900  to-slate-900 to-92%'>
        <div className='pb-20 '>
            <Counter></Counter>
        </div>
        
        <div className='pb-20 '>
          <ShadowMode></ShadowMode>
        </div>
        
        
      <Mainbutton></Mainbutton>
    </div>
  );
};

export default memo(dashbaoard);