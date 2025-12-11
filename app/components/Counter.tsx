"use client"
import { memo, useEffect, useState } from 'react';
import { getDate } from '../actions/user';
import { useRelapseStore } from '@/store/relapseStore';
import { useCounterStore } from '@/store/counterStore';


const Counter = () => {
  // const [counter,setCounter] = useState(0)
  const counter = useCounterStore((state)=>state.counter) 
  const setCounter = useCounterStore((state)=>state.setCounter) 
  const lastStreak = useRelapseStore((state)=>state.LastStreak)
  const [inDb, setinDb] = useState(false)
  const [startdate,setStartdate] = useState<Date>(new Date())
  const isShadow = useRelapseStore((state)=>state.isShadow)
  const relpaseTime = useRelapseStore((state)=>state.RelapseTime)
  const setLastStreak = useRelapseStore((state)=>state.setLastStreak)
  const toadd = useCounterStore((state)=>state.ToAdd)
  const placeholder = "Press the button to start"
  const Todaydate = new Date()


  function lastStreakcalculation(startdate:Date,relapsetime:Date){
      const last1 = startdate?.getTime() ?? 0
      const last2 = relapsetime?.getTime() ?? 0
      const lastStreakmillis = last2 - last1
      let lastStreak = lastStreakmillis/(1000*60*60*24)
      lastStreak = Math.round(lastStreak)
      setLastStreak(lastStreak)
    }


  useEffect(()=>{
    console.log("Inside the first useeffect in Counter.tsx")
    console.log(isShadow)
    let isMounted = true
    async function fetchDate(){
      let dateAndRelapsedTime = await getDate()
   
      if(isMounted){
        const startdate = dateAndRelapsedTime?.startTime
        if(startdate){
          setStartdate(startdate)
        }
        const relapsetime = dateAndRelapsedTime?.relapseTime
  
        if(relapsetime){
          //relapsestreak calculation
          console.log("Inside the first counter but when its for relapse calculation")
          if(startdate)
          lastStreakcalculation(startdate,relapsetime)

          //new counter calculation after relapse has occured
          const t1 = relapsetime.getTime()
          const t2 = new Date().getTime()
          const newTime = t2 -t1
          let days = newTime/(1000 * 60 * 60 * 24)
          days = Math.round(days)
          setCounter(days)
          setinDb(true)

        }
        else{
          //calculation of counter if no relapseoccured
          const t1 = startdate?.getTime() ?? 0
            if(!startdate){

              setinDb(false)
              setCounter(0)
            }
            else{

              const t2 = Todaydate.getTime()
              const differenceInMillis = t2 - t1
              let days = differenceInMillis / (1000 * 60 *60 * 24)
              days = Math.round(days)
              setCounter(days)
              setinDb(true)
            }    
        }
        
        
      }

    }
    fetchDate()
    return ()=> {
      isMounted=false
    }
  },[lastStreak])


  useEffect(()=>{
    console.log("Inside the second useeffect in Counter.tsx")
    let isMounted = true
    function resetCounterAfterRelpase(){

      lastStreakcalculation(startdate,relpaseTime)

      const t1 = relpaseTime.getTime() 
      const t2 = new Date().getTime()

      const newTime = t2 -t1
      let days = newTime/(1000 * 60 * 60 * 24)
      days = Math.round(days)
      setCounter(days)

    }
    if(relpaseTime){
      resetCounterAfterRelpase()
    }
    
    return ()=>{
      isMounted=false
    }
  },[relpaseTime])



  return (
    <div className=''>
      <p className='text-4xl font-bold text-shadow-='>{inDb? counter+toadd:placeholder}</p>
    </div>
  );
};

export default memo(Counter);