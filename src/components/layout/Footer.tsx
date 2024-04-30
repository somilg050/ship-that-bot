"use client";

import * as React from "react";
import Link from "next/link";
import { Icons } from "@/src/components/shared/Icons";
import { siteConfig } from "@/src/config/site";
import { useColorMode } from "@chakra-ui/react";

export function SiteFooter() {
  const { colorMode } = useColorMode();
  return (
    <footer
      className={colorMode === "light" ? "border-t bg-gray-100" : "border-t"}
    >
      <div className="px-20 py-4">
        <div className="container flex items-center justify-between">
          <p className="text-muted-foreground text-left text-sm">
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
