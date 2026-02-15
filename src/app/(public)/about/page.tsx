import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        title: 'GRIT',
        description: 'Embrace the discomfort.',
    },
    {
        title: 'PACE',
        description: 'Yours. Not theirs.',
    },
    {
        title: 'CREW',
        description: 'Leave no one behind.',
    },
    {
        title: 'VIBE',
        description: 'Bring the energy.',
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
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-extrabold tracking-widest text-primary sm:text-4xl uppercase">
                        Club Values
                    </h2>
                </div>
                <div className="mt-12 grid max-w-5xl mx-auto gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((value) => (
                        <Card key={value.title} className="bg-card/50 border-border/40 text-center">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold tracking-wider uppercase text-primary">{value.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg text-muted-foreground">{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
