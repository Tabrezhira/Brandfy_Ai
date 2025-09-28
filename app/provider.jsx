"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { doc } from "firebase/firestore";
import {  useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "./../config/FirebaseConfig.js";
import { getDoc, setDoc } from "firebase/firestore";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import { DefaultModel } from "@/shared/AiModels";
import { UserDetailContext } from "@/context/UserDetailContext";

function provider({children, ...props}) {
  const {user} = useUser();
  const[aiSelectedModels,setAiSelectedModel]=useState(DefaultModel);
  const[userDetail,setUserDetail]=useState(null);
  
useEffect(() => {
  if(user){
    CreateNewUser();
    console.log("here")
  }
},[user]);
  const CreateNewUser = async() => {
    // If user exist?
      const userRef=doc(db,"users",user?.primaryEmailAddress?.emailAddress);
      const docSnap=await getDoc(userRef);
      
      if(docSnap.exists()){
        console.log("Existing User");
        const userInfo = docSnap.data()
        setAiSelectedModel(userInfo?.SelectedModelsPref);
        setUserDetail(userInfo); // Set user details in context
        console.log("hi",userInfo?.SelectedModelsPref);
        console.log("data",aiSelectedModels)
        return
      }else{
        const userData={
          name:user?.fullName,
          email:user?.primaryEmailAddress?.emailAddress,
          createdAt: new Date(),
          credits:1000, // Paid User
          remainingMsg:5, // only for Free user
          plan:"free"
      }
      await setDoc(userRef,userData);
   
      setUserDetail(userData); // Set user details in context
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
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <AiSelectedModelContext.Provider value={{aiSelectedModels,setAiSelectedModel}}>
      <SidebarProvider>
        <AppSidebar/>
      <div className="w-full">
       <AppHeader/>
      {children}
      </div>

      </SidebarProvider>
      </AiSelectedModelContext.Provider>
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}

export default provider;
