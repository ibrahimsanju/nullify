import {create} from "zustand"

interface counterStore{
    RelapseTime:Date,
    Relapserecord:Date[],
    LastStreak:number,
    isShadow:boolean,
    setIsshadow:(shadow:boolean)=>void
    setLastStreak:(streak:number)=>void
    setRelapseTime:(relapsetime:Date | null)=>void,
    setRelapseRecord:(datelist:Date[])=>void,
    addRelapseRecord:(date:Date)=>void
}

export const useRelapseStore = create<counterStore>((set)=>({
    Relapserecord:[],
    RelapseTime: new Date(),
    LastStreak:0,
    isShadow:false,
    setIsshadow:(newshadow)=>{
        set(()=>({
            isShadow:newshadow
        }))
    },
    setLastStreak: (streak) =>
  set(() => ({
    LastStreak: streak,
    isShadow: streak > 0
  })),
    setRelapseTime:(relapseTime)=>
        set(()=>({
            RelapseTime:relapseTime ?? undefined
        })),
    setRelapseRecord:(datelist) =>{
        set((state)=>({
            Relapserecord:[...state.Relapserecord,...datelist]
            
        }))},
    addRelapseRecord:(date)=>{
        set((state)=>({
            Relapserecord:[...state.Relapserecord,date]
        }))
    }
        
    
    
}))

