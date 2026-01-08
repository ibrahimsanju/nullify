"use client"
import { useRelapseStore } from '@/store/relapseStore';
import { memo, useEffect, useState } from 'react';
import ShadowCard from './ShadowCard';
import { useCounterStore } from '@/store/counterStore';
import { Milestone } from 'lucide-react';
import { DeleteRelapse, postShadowFight } from '../actions/user';

interface MilestonesProps{
    label:number,
    percentage:number
}



const ShadowMode = () => {
    // const [isShadow,setIsShadow] = useState(false)
    const isShadow = useRelapseStore((state)=>state.isShadow)
    const setIsShadow = useRelapseStore((state)=>state.setIsshadow)
    const [milestones,setMilestones] = useState<MilestonesProps[]>([])
    const lastStreak = useRelapseStore((state)=>state.LastStreak)
    const setLastStreak = useRelapseStore((state)=>state.setLastStreak) 
    const Mainpercentage = useCounterStore((state)=>state.Mainpercentage)
    const SetMainPercentage = useCounterStore((state)=>state.SetMainPercentage)
    const counter = useCounterStore((state)=>state.counter)
    const addCounter = useCounterStore((state)=>state.addCounter)
    const SetRelapsetime = useRelapseStore((state)=>state.setRelapseTime)
    // const [Mainpercentage,SetMainPercentage] = useState(0)
    const setToAdd = useCounterStore((state)=>state.setToAdd)
    let percentageTobeCalculated = 0
   
    function divideStreaktoMilestone(lastStreak:number){
        const relapseMilestones = []
        const streakDivisions = Math.round(lastStreak/3)

        let milestone = 1

        while(milestone<lastStreak){
            relapseMilestones.push(milestone)
            milestone = milestone + streakDivisions
        }

        relapseMilestones.push(lastStreak)
        return relapseMilestones
    }

    function calcluateDaysToBeAdded(lastStreak:number,percentage:number){
        const dividedPercentage = percentage/100
        const numberToAdd = Math.round(lastStreak*dividedPercentage)
        return numberToAdd
    }

    function milestoneAndPercentCalc(counter:number,milestones:number[]){
        let i = 0
        let milestonesAndPercentage : MilestonesProps[] = []
        let percentage = 50
        const percentagePieces = percentage/(milestones.length-1)


        for(let i=0;i<milestones.length -1;i++){
            milestonesAndPercentage.push({
                label:milestones[i],
                percentage
            })
            percentage = Math.round(percentage + percentagePieces)
        }
        milestonesAndPercentage.push({
                label:milestones[milestones.length - 1],
                percentage:100
        })


      

        while (counter!=0 && milestonesAndPercentage.length!=0){

            if(milestonesAndPercentage[i].label<=counter){
                
                SetMainPercentage(milestonesAndPercentage[i].percentage)
                percentageTobeCalculated = milestonesAndPercentage[i].percentage
                milestonesAndPercentage.splice(i,1)
               
            }
            else{
                break
            }
           
        }

        for(let i = 0;i<= milestonesAndPercentage.length -1 ;i++){
            milestonesAndPercentage[i].label = milestonesAndPercentage[i].label - counter
        }


        return milestonesAndPercentage
    }

    useEffect(() => {
  if (!isShadow) return

  const run = async () => {
    const dividedMilestones = divideStreaktoMilestone(lastStreak)
    const dividedMilestonesandPercentage =
      milestoneAndPercentCalc(counter, dividedMilestones)

    const DaysToBeAddedToCounter =
      calcluateDaysToBeAdded(lastStreak, percentageTobeCalculated)

    setToAdd(DaysToBeAddedToCounter)
    setMilestones(dividedMilestonesandPercentage)

    if (dividedMilestonesandPercentage.length === 0) {
      await DeleteRelapse()
      SetRelapsetime(null)
      setLastStreak(0) // 👈 this AUTO turns off shadow mode
      await postShadowFight("won")
    }
  }

  run()
}, [isShadow, lastStreak, counter])

    
    
  return (
    
    <div className='flex items-center flex-col'>
        {isShadow &&(
            
            <div className='pb-15'>{Mainpercentage}% regained</div>
    )}
        
        {isShadow &&(
            
            <div className='flex space-x-1'>

                {milestones.map((milestone)=><ShadowCard key={milestone.label} label={milestone.label} percentage={milestone.percentage}></ShadowCard>)}

            </div>
    )}
        
    </div>
  );
};

export default memo(ShadowMode);