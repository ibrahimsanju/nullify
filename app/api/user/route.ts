

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest){
    const session  = await getServerSession()
    const datas = await req.json()
    const date = datas.date

    const user = await prisma.user.findFirst({
        where:{
            email:session?.user?.email ?? ""
        }
    })

    if(!user){
        return NextResponse.json({
            message:"unauthorized"
        },{
            status:403
        })
    }

    try{
        await prisma.counter.create({
        data:{
            useremail:session?.user?.email ?? "",
            startTime:date
        }
    })

    console.log("Successfully added starttime")
    return NextResponse.json({
        message:"startTime was successfully added"
    })

    }catch(e){
        return NextResponse.json({
            message:"There was a problem putting user Start Time"
        })
    }
    
}