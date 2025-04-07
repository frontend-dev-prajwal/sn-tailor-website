import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "./cursor/Cursor";
import Navs from "./components/header/page";
import ThemeProvider from "./toggle/page";
import { AuthProvider } from "./context/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SN Tailor",
  description: "Tailoring made smart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <AuthProvider>            
            {children}
            <Cursor />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
