'use server';
/**
 * @fileOverview This file provides an AI agent that suggests optimal running event dates and times based on real-time weather conditions.
 *
 * - suggestOptimalSchedule - A function that handles the optimal schedule suggestion process.
 * - SuggestOptimalScheduleInput - The input type for the suggestOptimalSchedule function.
 * - SuggestOptimalScheduleOutput - The return type for the suggestOptimalSchedule function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const SuggestOptimalScheduleInputSchema = z.object({
  location: z.string().describe('The location for the running event (e.g., "New York City, NY").'),
  startDate: z.string().datetime().describe('The start date of the desired range for the event (ISO 8601 format, e.g., "2024-08-01T09:00:00Z").'),
  endDate: z.string().datetime().describe('The end date of the desired range for the event (ISO 8601 format, e.g., "2024-08-07T18:00:00Z").'),
  eventDurationHours: z.number().min(1).max(24).describe('The approximate duration of the event in hours.'),
  runnerPreferences: z.string().optional().describe('Any specific preferences runners might have (e.g., "avoid rain," "prefer cooler weather," "prefer morning runs").'),
});
export type SuggestOptimalScheduleInput = z.infer<typeof SuggestOptimalScheduleInputSchema>;

// Output Schema
const SuggestOptimalScheduleOutputSchema = z.object({
  suggestions: z.array(z.object({
    date: z.string().datetime().describe('The suggested date and time for the event (ISO 8601 format).'),
    weatherSummary: z.string().describe('A brief summary of the weather conditions for the suggested time.'),
    rationale: z.string().describe('The reason why this date/time is optimal, considering weather and runner preferences.'),
  })).describe('A list of optimal schedule suggestions.'),
  overallRecommendation: z.string().describe('An overall recommendation or summary regarding the best time to schedule the event.'),
});
export type SuggestOptimalScheduleOutput = z.infer<typeof SuggestOptimalScheduleOutputSchema>;

// Mock Weather Tool
// In a real application, this would call a third-party weather API.
const getWeatherDataTool = ai.defineTool(
  {
    name: 'getWeatherData',
    description: 'Fetches weather forecast for a given location and specific date/time.',
    inputSchema: z.object({
      location: z.string().describe('The location for which to get the weather.'),
      date: z.string().datetime().describe('The specific date and time for the weather forecast (ISO 8601 format).'),
      durationHours: z.number().min(1).max(24).describe('The duration for which the weather is relevant, in hours.'),
    }),
    outputSchema: z.object({
      temperature: z.string().describe('The temperature (e.g., "25°C").'),
      conditions: z.string().describe('General weather conditions (e.g., "Sunny," "Partly Cloudy," "Light Rain").'),
      humidity: z.string().describe('Humidity level (e.g., "60%").'),
      windSpeed: z.string().describe('Wind speed (e.g., "10 km/h").'),
      precipitationChance: z.string().describe('Chance of precipitation (e.g., "10%").'),
      forecastMessage: z.string().describe('A descriptive message about the weather forecast for the specified time.'),
    }),
  },
  async (input) => {
    // Mock weather data for demonstration purposes.
    // In a real app, you'd integrate with a weather API like OpenWeatherMap, AccuWeather, etc.
    const { location, date, durationHours } = input;
    const mockData = {
      '2024-08-01T09:00:00Z': { temperature: '22°C', conditions: 'Sunny', humidity: '55%', windSpeed: '8 km/h', precipitationChance: '5%', forecastMessage: 'Ideal conditions for a run.' },
      '2024-08-01T18:00:00Z': { temperature: '28°C', conditions: 'Partly Cloudy', humidity: '70%', windSpeed: '12 km/h', precipitationChance: '15%', forecastMessage: 'Warmer, but pleasant evening run.' },
      '2024-08-02T08:00:00Z': { temperature: '20°C', conditions: 'Light Rain', humidity: '85%', windSpeed: '15 km/h', precipitationChance: '60%', forecastMessage: 'Chance of light rain, might be wet.' },
      '2024-08-03T07:00:00Z': { temperature: '18°C', conditions: 'Overcast', humidity: '75%', windSpeed: '10 km/h', precipitationChance: '20%', forecastMessage: 'Cool and overcast, good for long distances.' },
      '2024-04-18T09:00:00Z': { temperature: '15°C', conditions: 'Sunny', humidity: '50%', windSpeed: '5 km/h', precipitationChance: '0%', forecastMessage: 'Perfect spring morning for a run.' },
      '2024-04-19T17:00:00Z': { temperature: '12°C', conditions: 'Cloudy', humidity: '70%', windSpeed: '18 km/h', precipitationChance: '30%', forecastMessage: 'Cool with some wind, possibility of light showers.' },
      '2024-04-20T08:30:00Z': { temperature: '10°C', conditions: 'Clear', humidity: '45%', windSpeed: '3 km/h', precipitationChance: '0%', forecastMessage: 'Chilly but clear, good for a brisk run.' },
    };

    // Use input date as key for simplicity in mock,
    // in real scenario, date parsing and range matching would be more complex.
    const mockWeather = mockData[date as keyof typeof mockData];

    if (mockWeather) {
      return {
        ...mockWeather,
        forecastMessage: `Weather in ${location} on ${new Date(date).toLocaleString()} for ${durationHours} hours: ${mockWeather.forecastMessage}`,
      };
    } else {
      // Generate some dynamic mock data for other dates
      const temp = Math.floor(Math.random() * (30 - 10 + 1)) + 10; // 10-30°C
      const conditionsOptions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Overcast'];
      const conditions = conditionsOptions[Math.floor(Math.random() * conditionsOptions.length)];
      const humidity = Math.floor(Math.random() * (90 - 40 + 1)) + 40; // 40-90%
      const windSpeed = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // 5-20 km/h
      const precipitationChance = conditions === 'Light Rain' ? Math.floor(Math.random() * (80 - 40 + 1)) + 40 : Math.floor(Math.random() * 30); // 0-30%
      let forecastMessage = 'Dynamic forecast: ';
      if (temp < 15) forecastMessage += 'Cool. ';
      else if (temp > 25) forecastMessage += 'Warm. ';
      if (conditions.includes('Rain')) forecastMessage += 'Expect some precipitation. ';
      else if (conditions.includes('Cloudy')) forecastMessage += 'Overcast skies. ';
      else forecastMessage += 'Clear skies. ';

      return {
        temperature: `${temp}°C`,
        conditions: conditions,
        humidity: `${humidity}%`,
        windSpeed: `${windSpeed} km/h`,
        precipitationChance: `${precipitationChance}%`,
        forecastMessage: `Weather in ${location} on ${new Date(date).toLocaleString()} for ${durationHours} hours: ${forecastMessage}`,
      };
    }
  }
);

const suggestOptimalSchedulePrompt = ai.definePrompt({
  name: 'suggestOptimalSchedulePrompt',
  input: { schema: SuggestOptimalScheduleInputSchema },
  output: { schema: SuggestOptimalScheduleOutputSchema },
  tools: [getWeatherDataTool],
  prompt: `You are an expert event planner for a running club, specializing in outdoor events.\nYour task is to suggest optimal dates and times for a running event within a given date range, considering weather conditions.\nYou have access to a 'getWeatherData' tool to fetch weather forecasts.\n\nHere's the event information:\nLocation: {{{location}}}\nDesired Date Range Start: {{{startDate}}}\nDesired Date Range End: {{{endDate}}}\nEvent Duration: {{{eventDurationHours}}} hours\nRunner Preferences: {{{runnerPreferences}}}\n\nFollow these steps:\n1. Identify several potential dates and times within the given range (e.g., morning, afternoon/evening on different days).\n2. For each potential date/time, use the 'getWeatherData' tool to fetch the forecast.\n3. Analyze the weather data for each option, taking into account temperature, conditions (rain, sunny, cloudy), humidity, and wind speed.\n4. Consider the 'runnerPreferences' to prioritize certain weather conditions (e.g., avoid rain, prefer cooler temperatures).\n5. Provide a minimum of 3 (if available) and a maximum of 5 distinct suggestions for optimal running times.\n6. For each suggestion, provide the exact date and time (ISO 8601 format), a summary of the weather, and a clear rationale explaining why it's optimal based on weather and preferences.\n7. Conclude with an overall recommendation.\n\nExample of how to call the tool:\n{{call getWeatherData location='New York City, NY' date='2024-08-01T09:00:00Z' durationHours=3}}\n\nConsider these aspects for optimal running conditions:\n- Temperatures: Generally, 10-20°C is ideal. Avoid extreme heat (>25°C) or cold (<5°C).\n- Conditions: Sunny or partly cloudy is preferred. Avoid heavy rain, thunderstorms, or high winds.\n- Humidity: Lower humidity is better for comfort.\n- Wind: Low wind speed is ideal.\n\nIf runner preferences are provided, strongly consider them. For example, if "avoid rain" is mentioned, prioritize dates with 0% precipitation chance. If "prefer cooler weather" is mentioned, prioritize lower temperatures within the ideal range.\n\nIf no suitable dates are found, state that and explain why.\n`
});

const suggestOptimalScheduleFlow = ai.defineFlow(
  {
    name: 'suggestOptimalScheduleFlow',
    inputSchema: SuggestOptimalScheduleInputSchema,
    outputSchema: SuggestOptimalScheduleOutputSchema,
  },
  async (input) => {
    // The prompt internally handles calling the tool and generating the output.
    // We just need to invoke the prompt with the user's input.
    const { output } = await suggestOptimalSchedulePrompt(input);
    return output!;
  }
);

export async function suggestOptimalSchedule(input: SuggestOptimalScheduleInput): Promise<SuggestOptimalScheduleOutput> {
  return suggestOptimalScheduleFlow(input);
}
