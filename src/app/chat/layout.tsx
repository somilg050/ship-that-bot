import { Suspense } from "react";
import Navbar from "@/src/components/layout/NavBar";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: LandingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
    </div>
  );
}
