import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Provider from "@/redux/Provider";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Navbar, Footer } from "@/components/common";
import { Setup } from "@/components/utils";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Finx",
  description: "Finx social app like any other social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Setup />
            {/* <Navbar /> */}
            {/* <div className="mx-auto max-h-7xl px-2 sm:px-6 lg:px-8 my-8"> */}
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            <Toaster position="top-center" richColors />
            {/* </div> */}
            {/* <Footer /> */}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
