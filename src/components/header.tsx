"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/firebase";
import { UserButton } from "@/components/auth/user-button";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/events", label: "ACTIVITIES" },
  { href: "/gallery", label: "TEAM" },
  { href: "/contact", label: "SOCIALS" },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const { user, isUserLoading } = useUser();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://media.licdn.com/dms/image/v2/D4D0BAQGO94jx0uVImA/company-logo_100_100/B4DZqLRmjEHsAQ-/0/1763273239179?e=1772668800&v=beta&t=tRfiSuv_SzsLW9ABtMhtdnLFvl76jtXvXUuxfXu8HXM"
            alt="Inertia Run Club Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="hidden sm:inline font-logo text-xl uppercase tracking-wider">Inertia Run Club</span>
        </Link>
        
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary pb-1 uppercase",
                  pathname === item.href
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground/70"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {isMounted && (
                user ? (
                <UserButton />
                ) : (
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
                )
            )}
           </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
            {isMounted && (
              <>
                <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                    <Link href="/" className="mr-6 flex items-center gap-3">
                         <Image
                            src="https://media.licdn.com/dms/image/v2/D4D0BAQGO94jx0uVImA/company-logo_100_100/B4DZqLRmjEHsAQ-/0/1763273239179?e=1772668800&v=beta&t=tRfiSuv_SzsLW9ABtMhtdnLFvl76jtXvXUuxfXu8HXM"
                            alt="Inertia Run Club Logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <span className="font-logo text-xl uppercase tracking-wider">Inertia Run Club</span>
                    </Link>
                    <div className="my-8 flex flex-col space-y-5 pl-6">
                        {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSheetOpen(false)}
                            className={cn(
                                "text-xl font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary" : "text-foreground/70"
                            )}
                        >
                            {item.label}
                        </Link>
                        ))}
                        <div className="mt-4">
                           {user ? (
                               <UserButton />
                            ) : (
                              <Button asChild>
                                <Link href="/login" onClick={() => setSheetOpen(false)}>Login</Link>
                              </Button>
                            )}
                        </div>
                    </div>
                    </SheetContent>
                </Sheet>
                {user && <UserButton />}
              </>
            )}
        </div>
      </div>
    </header>
  );
}
