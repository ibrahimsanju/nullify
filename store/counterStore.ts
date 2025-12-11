import { count } from "console";
import { create } from "zustand";


interface counterStore{
    counter:number,
    Mainpercentage:number,
    ToAdd:number,
    setToAdd:(toaddnumber:number)=>void,
    SetMainPercentage:(percentage:number)=>void,
    setCounter:(count:number)=>void,
    addCounter:(added:number)=>void
}

export const useCounterStore = create<counterStore>((set)=>({
    counter:0,
    Mainpercentage:0,
    ToAdd:0,
    setToAdd:(toaddnumber)=>{
        set(()=>({
            ToAdd:toaddnumber
        }))
    },
    setCounter:(count)=>{
        set(()=>({
            counter:count
        }))
    },
    addCounter:(added)=>{
        set((state)=>({
            counter:state.counter+added
        }))
    },
    SetMainPercentage:(percentage)=>{
        set(()=>({
            Mainpercentage:percentage
        }))
    }
}))