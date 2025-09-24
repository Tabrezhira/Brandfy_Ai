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
import { Moon, Sun } from "lucide-react";

export function AppSidebar() {
/* The code snippet you provided is a React functional component named `AppSidebar`. */
  const { theme, setTheme } = useTheme();
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
            <Button className="mt-7 w-full">+ New Chat</Button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup  >
          <div className="p-3">
                      <h2 className="font-bold text-lg">Chats</h2>
          <p className="text-sm text-gray-400">Sign in to start chatting with multiple AI model</p>
          </div>

        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        <div className="p-3 ">
          <Button className={"w-full"} size={"lg"}>Sign in / Sign Up</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
