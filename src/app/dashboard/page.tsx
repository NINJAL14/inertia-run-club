import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { events, weeklyUpdates, galleryImages } from "@/lib/data";
import { Calendar, Newspaper, Image as ImageIcon, Users } from "lucide-react";

const stats = [
  {
    title: "Upcoming Events",
    value: events.length,
    icon: Calendar,
  },
  {
    title: "Weekly Updates",
    value: weeklyUpdates.length,
    icon: Newspaper,
  },
  {
    title: "Gallery Photos",
    value: galleryImages.length,
    icon: ImageIcon,
  },
    {
    title: "Active Members",
    value: "150+", // static for now
    icon: Users,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back, Admin!</h1>
        <p className="text-muted-foreground">
          Here's a quick overview of your club's status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump right into managing your club's content.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {/* In a real app, these would be links to creation forms */}
            <div className="flex flex-wrap gap-4">
                <button className="text-primary hover:underline">Add New Event</button>
                <button className="text-primary hover:underline">Post Weekly Update</button>
                <button className="text-primary hover:underline">Upload to Gallery</button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
