import prisma from "@/lib/prisma";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
  })
],
 secret:process.env.NEXTAUTH_SECRET?? "secret",
 callbacks:{
  async signIn(params){
    if(!params.user.email){
      return false
    }
    try{
      await prisma.user.create({
        data:{
          email:params.user.email ??"",
          name:params.user.name,
          provider:"Google"
        }
      })
    }catch(e){
      console.log("there was an error while sign in")
    }

    return true
  }
 }

})

export { handler as GET, handler as POST }