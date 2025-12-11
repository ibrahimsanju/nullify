"use client"
import { useEffect, useRef, useState } from "react";
import { memo } from 'react';
import { DeleteRelapse, getDate, getIsStart, getRelapselist, postRelapse, postStartDate } from "../actions/user";
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
  
 
  const defaultList = [
    "Turn off the phone",
    "Drink water",
    "Meditate",
    "Apply 5 min rule"
  ]

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

  const LONG_PRESS_TIME = 500; 

  const handlePressStart = () => {
    setIsLongPress(false);

    timerRef.current = setTimeout(() => {
      setIsLongPress(true);
      console.log("LONG PRESS triggered");
      longPressAction();
    }, LONG_PRESS_TIME);
    
  };

  const handlePressEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!isLongPress) {
      console.log("SHORT PRESS triggered");
      shortPressAction();
    }
  };

  const shortPressAction = async () => {
    if(!isStart){
      const today = new Date();
      console.log("Short press date:", today);
      
      await fetch(`/api/user`, {
        method: "POST",
        body: JSON.stringify({ date: today }),
      });

      setIsStart(!isStart)
    }
    
  };

  const longPressAction = async () => {
    if(!isshadow){
      const today = new Date();
      console.log("Long press date:", today);
      const updated = [...relapselist,today]
      setRelapselist(updated)
      setRelapsetime(today)
      const relapseinDb = await postRelapse(updated,today)
      console.log(relapseinDb)
      setSheetOpen(true)
    }else{
      const dates = await getDate()
      let startdate = dates?.startTime
      let startdateInMilliseconds = startdate?.getTime() ?? 0
      let toaddinMilliseconds = toadd * 24 * 60 * 60 * 1000
      let lastStreakinMilliseconds = lastStreak * 24 *60 *60 * 1000
      let newDaysToAddInMilliseconds = lastStreakinMilliseconds - toaddinMilliseconds
      let newStartDateinMilliseconds = startdateInMilliseconds  + newDaysToAddInMilliseconds
      const newStartDate = new Date(newStartDateinMilliseconds)
      console.log(newStartDate)
      await postStartDate(newStartDate)
      await DeleteRelapse()
      setRelapsetime(null)
      console.log("successfully added new start date")
    }
    
  };
  useEffect(() => {
  console.log("Relapse list updated:", relapselist);
}, [relapselist]);

  return (
    <div>
      <Sheet open={sheetopen} onOpenChange={setSheetOpen}>
        <button className='bg-amber-400 w-50 h-50 rounded-full hover:bg-amber-500 '
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
      >habit button</button>
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