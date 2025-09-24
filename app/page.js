"use client";

import { useTheme } from "next-themes";
import ChatinputBox from "./_components/ChatinputBox";

/**
 * The Home component renders a greeting message and a button that toggles between dark and light
 * themes when clicked.
 * @returns The Home component is being returned. It contains a heading "Hello" and a Button component
 * that toggles the theme between "dark" and "light" when clicked.
 */
export default function Home() {
  const {theme , setTheme } = useTheme();
  return (
   <div>
    <ChatinputBox/>
   </div>
  );
}
