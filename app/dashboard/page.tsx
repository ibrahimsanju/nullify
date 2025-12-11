import { memo } from 'react';
import Mainbutton from '../components/Mainbutton';
import Counter from '../components/Counter';
import ShadowMode from '../components/ShadowMode';

const dashbaoard = () => {
  return (
    <div className='flex flex-col items-center min-h-screen justify-center  bg-linear-to-b from-yellow-500 via-yellow- to-transparent bg-black'>
        <div className='pb-30'>
            <Counter></Counter>
        </div>
        
        <div className='pb-30 '>
          <ShadowMode></ShadowMode>
        </div>
        
        
      <Mainbutton></Mainbutton>
    </div>
  );
};

export default memo(dashbaoard);