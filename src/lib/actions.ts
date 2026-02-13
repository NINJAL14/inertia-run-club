"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  suggestOptimalSchedule,
  type SuggestOptimalScheduleInput,
} from "@/ai/flows/suggest-optimal-schedule";

// --- Authentication Actions ---

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required."),
});

export async function login(values: z.infer<typeof loginSchema>) {
  // In a real application, you would validate the credentials against a database.
  // Here, we're using a simple check for demonstration purposes.
  if (
    values.email === "admin@inertia.com" &&
    values.password === "password123"
  ) {
    cookies().set("inertia-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid email or password." };
}

export async function logout() {
  cookies().delete("inertia-auth");
  redirect("/login");
}


// --- AI Scheduler Actions ---

const scheduleFormSchema = z.object({
  location: z.string().min(1, "Location is required."),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  eventDurationHours: z.coerce.number().min(1, "Duration must be at least 1 hour."),
  runnerPreferences: z.string().optional(),
});

export async function getScheduleSuggestions(values: z.infer<typeof scheduleFormSchema>) {
  try {
    const validatedInput: SuggestOptimalScheduleInput = {
      ...values,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
    };
    
    // Artificial delay to demonstrate loading states
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = await suggestOptimalSchedule(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting schedule suggestions:", error);
    return { success: false, error: "Failed to get suggestions. Please try again." };
  }
}
