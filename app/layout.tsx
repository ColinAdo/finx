import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Provider from "@/redux/Provider";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Setup } from "@/components/utils";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { inter } from "./fonts";

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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Setup />
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
