import { Mail, Phone, MapPin, Twitter, Instagram, Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const contactDetails = [
  { icon: Mail, text: 'contact@inertia.university', href: 'mailto:contact@inertia.university' },
  { icon: Phone, text: '(123) 456-7890', href: 'tel:123-456-7890' },
  { icon: MapPin, text: '123 University Ave, Student Union Bldg', href: '#' },
];

const socialLinks = [
  { icon: Twitter, href: "#", name: "Twitter" },
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Facebook, href: "#", name: "Facebook" },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Have questions or want to get involved? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactDetails.map((detail, index) => (
              <a
                key={index}
                href={detail.href}
                className="flex items-center gap-4 text-muted-foreground transition-colors hover:text-primary"
              >
                <detail.icon className="h-6 w-6" />
                <span>{detail.text}</span>
              </a>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Follow Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <p className="text-muted-foreground">Stay connected with our community on social media for the latest updates, event photos, and more.</p>
             <div className="flex space-x-4">
                {socialLinks.map((social) => (
                     <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary">
                        <social.icon className="h-8 w-8" />
                        <span className="sr-only">{social.name}</span>
                     </Link>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
