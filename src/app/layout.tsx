import "@/src/app/ui/globals.css";

import { Metadata } from "next";
import { Providers } from "@/src/app/providers";
import { fontHeading, fontSans, fontUrban } from "@/src/assets/fonts";
import { Toaster } from "@/src/components/ui/Toaster";
import { siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "ShipThatBot",
  description: "Create your chat bot with ease.",
  authors: [
    {
      name: "somilg050",
    },
  ],
  creator: "somilg050",
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@somilg050",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
        )}
      >
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
