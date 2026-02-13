"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Sparkles, Wind, Droplets, Thermometer, CalendarDays, Rss } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { getScheduleSuggestions } from "@/lib/actions";
import type { ScheduleSuggestion } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const scheduleFormSchema = z
  .object({
    location: z.string().min(1, "Location is required."),
    startDate: z.date({ required_error: "Start date is required." }),
    endDate: z.date({ required_error: "End date is required." }),
    eventDurationHours: z.coerce
      .number()
      .min(1, "Duration must be at least 1 hour."),
    runnerPreferences: z.string().optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date.",
    path: ["endDate"],
  });

export function SchedulerForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ScheduleSuggestion | null>(null);

  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      location: "New York City, NY",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      eventDurationHours: 2,
      runnerPreferences: "Prefer cool, sunny mornings. Avoid rain.",
    },
  });

  function onSubmit(values: z.infer<typeof scheduleFormSchema>) {
    setResult(null);
    startTransition(async () => {
      const response = await getScheduleSuggestions(values);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error,
        });
      }
    });
  }

  const renderSuggestions = () => {
    if (isPending) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      );
    }

    if (!result) return null;
    
    if (result.suggestions.length === 0) {
        return (
            <Alert>
                <Rss className="h-4 w-4" />
                <AlertTitle>No Optimal Times Found</AlertTitle>
                <AlertDescription>
                    {result.overallRecommendation || "The AI couldn't find any suitable time slots based on your criteria. Try expanding the date range or adjusting preferences."}
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="space-y-6">
             <Alert className="border-primary/50 bg-primary/10">
                <Sparkles className="h-4 w-4 !text-primary" />
                <AlertTitle className="text-primary">Overall Recommendation</AlertTitle>
                <AlertDescription>
                   {result.overallRecommendation}
                </AlertDescription>
            </Alert>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {result.suggestions.map((suggestion, index) => (
                <Card key={index} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                           <CalendarDays className="h-5 w-5 text-primary"/> Option {index + 1}
                        </CardTitle>
                        <CardDescription>
                            {format(new Date(suggestion.date), "EEEE, MMM d, yyyy 'at' h:mm a")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                        <p className="text-sm text-muted-foreground">{suggestion.rationale}</p>
                        <div className="rounded-md border p-3 text-sm space-y-2">
                           <p className="font-semibold">Weather Summary:</p>
                           <p className="text-muted-foreground">{suggestion.weatherSummary}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
            </div>
        </div>
    );
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDurationHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Duration (hours)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Range (Start)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Range (End)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="runnerPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Runner Preferences</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'avoid rain,' 'prefer cooler weather,' 'prefer morning runs'"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
                <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get Suggestions
                </>
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-8">{renderSuggestions()}</div>
    </div>
  );
}
