import Image from "next/image";
import { teamMembers } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Our Team
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          The driving force behind Inertia Run Club.
        </p>
      </div>

      <div className="mt-12 grid max-w-5xl mx-auto gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="relative h-96 w-full">
                <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4 text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-md text-primary font-semibold">{member.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
