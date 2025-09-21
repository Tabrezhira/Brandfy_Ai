"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Home() {
  const {theme , setTheme } = useTheme();
  return (
   <div>
    <h1>Hello</h1>
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Hello</Button> 
   </div>
  );
}
