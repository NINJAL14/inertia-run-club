import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Target, Users, Zap } from 'lucide-react';

const values = [
    {
        icon: Users,
        title: 'Community',
        description: 'We foster a welcoming and inclusive environment for runners of all levels.',
    },
    {
        icon: Zap,
        title: 'Performance',
        description: 'We support each other in achieving personal fitness goals, from 5ks to marathons.',
    },
    {
        icon: Target,
        title: 'Persistence',
        description: 'We believe in the power of consistency and the mental strength built through running.',
    }
]

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(p => p.id === 'about');

    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                    More Than Just a Run
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                    Inertia Run Club was founded in 2018 with a simple mission: to bring together students who share a passion for running. We believe that running is not just a sport, but a way to build character, forge friendships, and explore the world around us.
                </p>
            </div>

            <div className="mt-12 grid items-center gap-8 md:grid-cols-2 lg:gap-16">
                <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
                    {aboutImage && (
                        <Image
                            src={aboutImage.imageUrl}
                            alt={aboutImage.description}
                            data-ai-hint={aboutImage.imageHint}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
                <div className="space-y-6">
                    {values.map(value => (
                         <div key={value.title} className="flex items-start gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <value.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{value.title}</h3>
                                <p className="mt-1 text-muted-foreground">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
