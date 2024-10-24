"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HomeIcon, GearIcon, VideoIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/media-library", label: "Media Library", icon: VideoIcon },
    { href: "/area-management", label: "Area Management" },
    { href: "/settings", label: "Settings", icon: GearIcon },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Button
              key={link.href}
              variant="ghost"
              className={cn(
                "gap-2",
                pathname === link.href && "bg-accent"
              )}
              onClick={() => router.push(link.href)}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{link.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}