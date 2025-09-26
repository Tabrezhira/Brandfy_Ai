"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoIosSunny } from "react-icons/io";
import { useTheme } from "next-themes";
import React from "react";
import { Bolt, Moon, Sun, User2, Zap } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import UsageCreditProgress from "./UsageCreditProgress";

export function AppSidebar() {
  /* The code snippet you provided is a React functional component named `AppSidebar`. */
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Sidebar>
      <SidebarHeader>
        <div className=" p-3">
          <div className="flex items-center justify-between gap-2">
            <div className=" flex items-center gap-2">
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={60}
                height={60}
                className="w-[40px] h-[40px]"
              />
              <h2 className=" font-bold text-xl">Brandfy AI</h2>
            </div>
            <div>
              {mounted &&
                (theme === "light" ? (
                  <Button
                    variant={"ghost"}
                    onClick={() => setTheme("dark")}
                    aria-label="Toggle theme"
                  >
                    <Sun />
                  </Button>
                ) : (
                  <Button
                    variant={"ghost"}
                    onClick={() => setTheme("light")}
                    aria-label="Toggle theme"
                  >
                    <Moon />
                  </Button>
                ))}
            </div>
          </div>
          <div>
            {user ? (
              <Button className="mt-7 w-full">+ New Chat</Button>
            ) : (
              <SignInButton>
                <Button className="mt-7 w-full">+ New Chat</Button>
              </SignInButton>
            )}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="p-3">
            <h2 className="font-bold text-lg">Chats</h2>
            {!user && (
              <p className="text-sm text-gray-400">
                Sign in to start chatting with multiple AI model
              </p>
            )}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-3  mb-10">
          {!user ? (
            <SignInButton mode="modal">
              <Button className={"w-full"} size={"lg"}>
                Sign in / Sign Up
              </Button>
            </SignInButton>
          ) : (
            <div>
              <UsageCreditProgress />
              <Button className={"w-full mb-3"}>
                <Zap /> Upgrade Plan{" "}
              </Button>
              <Button className="flex w-full" variant={"ghost"}>
                <User2 /> <h2>Settings</h2>
              </Button>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
