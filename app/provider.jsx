"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { doc } from "firebase/firestore";
import {  useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { db } from "./../config/FirebaseConfig.js";
import { getDoc, setDoc } from "firebase/firestore";

function provider({children, ...props}) {
  const {user} = useUser();
useEffect(() => {
  if(user){
    CreateNewUser();
  }
},[user]);
  const CreateNewUser = async() => {
    // If user exist?
      const userRef=doc(db,"users",user?.primaryEmailAddress?.emailAddress);
      const docSnap=await getDoc(userRef);
      
      if(docSnap.exists()){
        console.log("Existing User");
        return
      }else{
        const userData={
          name:user?.fullName,
          email:user?.primaryEmailAddress?.emailAddress,
          createdAt: new Date(),
          credits:1000, // Paid User
          remainingMsg:5, // onnly for Free user
          plan:"free"
      }
      await setDoc(userRef,userData);
      console.log("New User Created");
      }
      
    }
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <SidebarProvider>
        <AppSidebar/>
      <div className="w-full">
       <AppHeader/>
      {children}
      </div>

      </SidebarProvider>
    </NextThemesProvider>
  );
}

export default provider;
