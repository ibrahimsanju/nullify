"use server"
import prisma from "@/lib/prisma"
import { time } from "console"
import { getServerSession } from "next-auth"

export async function getIsStart(){
    const session = await getServerSession()
    
    if (!session?.user?.email){
        throw new Error("user not authenticated")
    }

    const isStart = await prisma.counter.findFirst({
        where:{useremail:session?.user?.email }
    })

    if (!isStart){
        return false
    }
    else{
        return true
    }


}

export async function getDate(){
    const session = await getServerSession()
    
    if (!session?.user?.email){
        throw new Error("user not authenticated")
    }

    

    const date = await prisma.counter.findFirst({
        where:{
            useremail:session.user.email
        },
        select:{
            startTime:true,
            relapseTime:true
        }
    })

    console.log(date)
    console.log(session.user.email)
    return date

}

export async function postStartDate(newStartDate:Date){
    const session = await getServerSession()
    
    if (!session?.user?.email){
        throw new Error("user not authenticated")
    }

    try{
        await prisma.counter.update({
        where:{
            useremail:session.user.email
        },
        data:{
            startTime:newStartDate
        }
    })
    }catch(e){
        console.error("There was a problem updating startdate",e)
    }

    
}

export async function postRelapse(relapseRecord:Date[],relapseTime:Date){
    const session = await getServerSession()
    console.log(relapseRecord,relapseTime)
    
    if (!session?.user?.email){
        throw new Error("user not authenticated")
    }

    const user = await prisma.counter.findFirst({
        where:{useremail:session?.user?.email }
    })

    if (!user){
        return {
            message:"user not available"
        }
    }

    try{
        await prisma.counter.update({
            where:{
                useremail:session?.user?.email 
            },
            data:{
                relapseRecord,
                relapseTime
            }
        })
        return 
    }catch(e){
        console.error(`There was an error updating relapserecord`,e)
    }


}

export async function DeleteRelapse(){
    const session = await getServerSession()
    
    if (!session?.user?.email){
        throw new Error("user not authenticated")
    }

    const user = await prisma.counter.findFirst({
        where:{useremail:session?.user?.email }
    })

    if (!user){
        return {
            message:"user not available"
        }
    }

    try{
        await prisma.counter.update({
            where:{
                useremail:session?.user?.email 
            },
            data:{
                relapseTime:null
            }
        })
        return 
    }catch(e){
        console.error(`There was an error updating relapserecord`,e)
    }


}

export async function getRelapselist(){
    const session = await getServerSession()

    if (!session?.user?.email){
        throw new Error("user not authenticated")
    }

    const user = prisma.user.findUnique({
        where:{
            email:session.user.email
        }
    })

    if(!user){
        return {
            message:"user not found"
        }
    }

    try{
        const relapseRecord = await prisma.counter.findUnique({
            where:{
                useremail:session.user.email
            },
            select:{
                relapseRecord:true
            }
        })

        return relapseRecord?.relapseRecord
    }catch(e){
        console.log("there was an error getting relapserecord")
    }
}
