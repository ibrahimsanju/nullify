"use client"
import { memo, useEffect,useState } from 'react';
import ShadowFightComp from './ShadowFightComp';
import { gettally } from '../actions/user';


const Appbar = () => {
    const [shadawwon,setShadowWon] = useState(0)
    const [shadawlost,setShadowLost] = useState(0)

    useEffect(()=>{
        let isMounted = true
        const run = async()=>{
            const data = await gettally()
            if(isMounted){
                setShadowWon(data?.shadowon || 0)
                setShadowLost(data?.shadowlost || 0)
            }
        }
        run()

        return ()=>{
            isMounted = false
        }
    },[])
  return (
    <div className='mb-15 border w-full max-w-3xs mx-auto flex justify-between px-5 rounded-2xl'>
      <ShadowFightComp icon={<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
      />
    </svg>} tally={shadawwon}></ShadowFightComp>
    <ShadowFightComp icon={<svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="size-6">
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
        </svg>
} tally={shadawlost}></ShadowFightComp>
      
    </div>
  );
};

export default memo(Appbar);