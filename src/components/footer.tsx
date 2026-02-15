import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/inertiarunclub/", name: "Instagram" },
  { icon: Linkedin, href: "https://in.linkedin.com/company/inertia-run-club", name: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Inertia Run Club. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
              <link.icon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
              <span className="sr-only">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
