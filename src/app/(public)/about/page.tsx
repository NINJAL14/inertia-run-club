import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Zap } from 'lucide-react';

const cards = [
    {
        title: 'MISSION',
        description: "To cultivate Panvel's running culture by celebrating effort over pace. We believe that movement is medicine, and community is the cure. We run to clear our heads, to challenge our limits, and to put Panvel on the running map."
    },
    {
        title: 'VISION',
        description: "To become the heartbeat of the Panvel fitness community. We envision a city connected by footprints, where every intersection in Panvel is a meeting point and every finish line is just a new beginning for our local crew."
    }
];

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
];


export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-extrabold tracking-widest text-primary sm:text-5xl uppercase">
                    The Story
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                    Panvel's homegrown run club. Inertia is the resistance of any physical object to
                    any change in its velocity. Once we start moving, <span className="font-bold text-foreground">we don't stop.</span>
                </p>
            </div>

            <div className="mt-16 mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {cards.map(card => (
                    <Card key={card.title} className="bg-card/50 border-border/40 text-center md:text-left">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold tracking-wider uppercase text-primary">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground">{card.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-24">
                <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
                    <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                        Our Core Values
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We're more than a club; we're a movement. Here's what we're all about.
                    </p>
                </div>
                <div className="mt-12 grid max-w-lg mx-auto gap-10 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                    {values.map((value) => (
                        <div key={value.title} className="flex flex-col items-center text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <value.icon className="h-8 w-8" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                                <p className="mt-2 text-muted-foreground">
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
