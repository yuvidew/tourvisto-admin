import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Choose the weights you need
});


export const metadata: Metadata = {
  title: "Tourvisto",
  description:
    "Tourvisto is a travel admin dashboard for tracking users and managing travel plans with ease.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme : light)",
        url: "/assets/icons/logo.svg",
        href: "/assets/icons/logo.svg"
      },
      {
        media: "(prefers-color-scheme : dark)",
        url: "/assets/icons/logo.svg",
        href: "/assets/icons/logo.svg"
      }
    ]
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
