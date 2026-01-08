"use client"
import { useEffect, useRef, useState } from "react";
import { memo } from 'react';
import { DeleteRelapse, getDate, getIsStart, getRelapselist, postRelapse, postShadowFight, postStartDate } from "../actions/user";
import { Button } from "@/components/ui/button"
import Todo from "./Todo";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { useRelapseStore } from "@/store/relapseStore";
import { useCounterStore } from "@/store/counterStore";




const Mainbutton = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);
  const isshadow = useRelapseStore((state)=>state.isShadow)
  const setIsShadow = useRelapseStore((state)=>state.setIsshadow)
  const setLastStreak = useRelapseStore((state)=>state.setLastStreak)
  const toadd = useCounterStore((state)=>state.ToAdd)
  const lastStreak = useRelapseStore((state)=>state.LastStreak)
  const [isStart,setIsStart] = useState(false)
  const [sheetopen,setSheetOpen] = useState(false)
  const [relapselist,setRelapselist] = useState<Date[]>([])
  // const relapselist = useRelapseStore((state)=>state.Relapserecord)
  // const setRelapselist = useRelapseStore((state)=>state.setRelapseRecord)
  // const addRelapselist = useRelapseStore((state)=>state.addRelapseRecord)
  // const relapsetime = useRelapseStore((state)=>state.RelapseTime)
  const setRelapsetime = useRelapseStore((state)=>state.setRelapseTime)
  const setCounter = useCounterStore((state)=>state.setCounter)
  const holdStartRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const LONG_PRESS_TIME = 500; 
  
  const defaultList = [
    "Turn off the phone",
    "Drink water",
    "Meditate",
    "Apply 5 min rule"
  ]

  const handlePressStart = ()=>{
    setIsLongPress(false)

    holdStartRef.current = performance.now()

    const updateprogress = ()=>{
      if(!holdStartRef.current) return;
      const elapsed = performance.now() - holdStartRef.current
      const percent = Math.min((elapsed/LONG_PRESS_TIME)*100,100)
      
      setProgress(percent)

      if(percent<100){
        frameRef.current = requestAnimationFrame(updateprogress)
      }else{
        setIsLongPress(true)
        longPressAction()
      }
    }
    frameRef.current = requestAnimationFrame(updateprogress)
  }

  useEffect(()=>{
    let isMounted = true

    async function fetchCounter(){
      let isStart = await getIsStart()
      if (isMounted) setIsStart(isStart)
    }
    
    fetchCounter()

    return () => {isMounted=false}
  },[])

  useEffect(()=>{
    let isMounted = true
    async function fetchlist() {
      const getRelapserecord = await getRelapselist()

      if (isMounted && Array.isArray(getRelapserecord)) setRelapselist([...getRelapserecord])
      else console.log("empty")
    }
  fetchlist()
  return ()=> {isMounted=false}
    
  },[])

  

  // const handlePressStart = () => {
  //   setIsLongPress(false);

  //   timerRef.current = setTimeout(() => {
  //     setIsLongPress(true);
  //     console.log("LONG PRESS triggered");
  //     longPressAction(); 
  //   }, LONG_PRESS_TIME);

  
    
  // };

  const handlePressEnd = ()=>{
    holdStartRef.current = null
    cancelAnimationFrame(frameRef.current!)
    setProgress(0)

    if (!isLongPress) {
      console.log("SHORT PRESS triggered");
      shortPressAction()
    }
  }

  // const handlePressEnd = () => {
  //   if (timerRef.current) clearTimeout(timerRef.current);

  //   if (!isLongPress) {
  //     console.log("SHORT PRESS triggered");
  //     shortPressAction();
  //   }
  // };

  const shortPressAction = async () => {
    if(!isStart){
      const today = new Date();
      setIsStart(true)
      setCounter(0)
      
      await fetch(`/api/user`, {
        method: "POST",
        body: JSON.stringify({ date: today }),
      });

      setIsStart(!isStart)
    }
    
  };

  const longPressAction = async () => {
  if (!isshadow) {
    const today = new Date()
    const updated = [...relapselist, today]

    setRelapselist(updated)
    setRelapsetime(today)
    await postRelapse(updated, today)

    setSheetOpen(true)
  } else {
    const dates = await getDate()
    const start = dates?.startTime?.getTime() ?? 0

    const lostMs = lastStreak * 24 * 60 * 60 * 1000
    const regainMs = toadd * 24 * 60 * 60 * 1000

    const newStartDate = new Date(start + (lostMs - regainMs))

    await postStartDate(newStartDate)
    await DeleteRelapse()
    setRelapsetime(null)
    setLastStreak(0) // THIS alone exits shadow mode
    await postShadowFight("lost")
  }
}


  const bgStyle = {
  background: `conic-gradient(
    rgba(234, 179, 8, 1) ${progress}%,     /* amber-500 filled portion */
    rgba(250, 204, 21, 1) ${progress}%     /* amber-400 remaining */
  )`
};
  useEffect(() => {
  console.log("Relapse list updated:", relapselist);
}, [relapselist]);

  return (
    <div>
      <Sheet open={sheetopen} onOpenChange={setSheetOpen}>
        <div className="w-50 h-50 transition bg-yellow-500 flex items-center justify-center rounded-full hover:bg-yellow-600 " style={bgStyle}>
          <button className='bg-amber-400   w-40 h-40 rounded-full hover:bg-amber-500 font-bold text-2xl shadow-lg flex justify-center items-center'
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
      >{isshadow?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-red-600 size-16 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
          </svg>
          :<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" text-red-600 size-16">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
          </svg>
          }</button>
        </div>
        
      <SheetContent side="bottom" className="bg-green-400">
        <SheetHeader>
          <SheetTitle>Your relapse todo</SheetTitle>
          <SheetDescription>
            It happens for the best of us now follow these todos and start to regain your streak
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <ul className="space-y-1">
            {defaultList.map((todo)=><Todo label={todo}></Todo>)}
          </ul>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
      
    </div>
  );
};

export default memo(Mainbutton);