"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GearIcon, HomeIcon, RocketIcon, VideoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/media-library", label: "Media Library", icon: VideoIcon },
    { href: "/alert-center", label: "Alert Center" },
    { href: "/ai-models", label: "AI Models", icon: RocketIcon },
    { href: "/area-management", label: "Area Management" },
    { href: "/settings", label: "Settings", icon: GearIcon },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Link key={link.href} href={link.href} passHref legacyBehavior>
              <Button
                variant="ghost"
                className={cn(
                  "gap-2 cursor-pointer",
                  pathname === link.href && "bg-accent"
                )}
                asChild
              >
                <div>
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{link.label}</span>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}