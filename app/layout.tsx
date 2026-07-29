import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "@/context/RoleContext";
import { UIProvider } from "@/context/UIContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "UGC Studio — Dashboard",
  description: "UGC Studio management and creator dashboard.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${poppins.variable}`} style={{ margin: 0, padding: 0 }}>
        <UIProvider>
          <RoleProvider role="admin" userType="creator">
            {children}
          </RoleProvider>
        </UIProvider>
      </body>
    </html>
  );
}
