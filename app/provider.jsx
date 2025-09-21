"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function provider({children, ...props}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export default provider;
