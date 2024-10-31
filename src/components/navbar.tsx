"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { GearIcon, HamburgerMenuIcon, HomeIcon, VideoIcon, RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/media-library", label: "Media Library", icon: VideoIcon },
  { href: "/alert-center", label: "Alert Center" },
  { href: "/settings/demo", label: "Demo", icon: RocketIcon },
  { href: "/area-management", label: "Area Management" },
  { href: "/settings", label: "Settings", icon: GearIcon },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <HamburgerMenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 pt-4">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-2",
                        pathname === link.href && "bg-accent"
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{link.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "gap-2",
                    pathname === link.href && "bg-accent"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span className="hidden lg:inline">{link.label}</span>
                  <span className="md:inline lg:hidden">
                    {link.label.split(" ")[0]}
                  </span>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Right side items - shown on all screens */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            Help
          </Button>
        </div>
      </div>
    </nav>
  );
}
