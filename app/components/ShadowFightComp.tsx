import { memo, ReactNode, useEffect } from 'react';

type ShadowFightCompProps = {
    icon:ReactNode
    tally:number
}


const ShadowFightComp = ({icon,tally}:ShadowFightCompProps) => {
    
  return (
    <section className='flex  border rounded-full p-1'>
        <div >
            {icon}
        </div>
        <div>{tally}</div>
      </section>
  );
};

export default memo(ShadowFightComp);