"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export function Login(){
    const session = useSession()
    return(
        <section>
                {session.data?.user && <button onClick={()=> signOut()} className="bg-blue-500" >signOut</button>}
                {!session.data?.user && <button onClick={()=> signIn()} className="bg-blue-500" >signin</button>}
        </section>
    )
}