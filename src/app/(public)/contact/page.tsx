import { Instagram, Linkedin, Twitter, Facebook, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/inertiarunclub/", name: "Instagram" },
  { icon: Linkedin, href: "https://in.linkedin.com/company/inertia-run-club", name: "LinkedIn" },
  { icon: Twitter, href: "#", name: "Twitter / X" },
  { icon: Facebook, href: "#", name: "Facebook" },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold uppercase tracking-widest text-foreground sm:text-6xl">
          Stay Connected
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Follow us for daily updates, race results, and serious FOMO.
        </p>
      </div>

      <div className="mt-16 mx-auto max-w-lg space-y-4">
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-between rounded-lg border border-border/40 bg-card/50 p-5 text-card-foreground transition-all hover:border-primary/80 hover:bg-card"
          >
            <div className="flex items-center gap-5">
              <social.icon className="h-7 w-7 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="text-lg font-bold uppercase tracking-wider">{social.name}</span>
            </div>
            <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
