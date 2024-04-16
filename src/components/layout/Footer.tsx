import * as React from "react";
import Link from "next/link";

import { siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";

import { Icons } from "@/src/components/shared/Icons";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t", className)}>
      <div className="py-4">
        <div className="container flex items-center justify-between">
          <p className="text-left text-sm text-muted-foreground">
            Made with ❤️ by{" "}
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Somil Gupta
            </Link>
            . Hosted on{" "}
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </Link>
            .
          </p>

          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              <Icons.gitHub className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
