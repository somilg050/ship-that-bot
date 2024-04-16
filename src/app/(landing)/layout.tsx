import { Suspense } from "react";
import Navbar from "@/src/components/layout/NavBar";
import { SiteFooter } from "@/src/components/layout/Footer";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
