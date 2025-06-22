import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { NextResponse } from "next/server";
import axios from "axios";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || ""
});

const unsplashApiKey = process.env.UNSPLASH_API_KEY

export async function POST(request: Request) {
    const {
        country,
        duration,
        group_type,
        travel_style,
        interests,
        budget_estimate
    } = await request.json();


    const response = await generateText({
        model: google("gemini-1.5-flash"),
        prompt: `Generate a ${duration}-day travel itinerary for ${country} based on the following user information:

        Budget: '${budget_estimate}'
        Interests: '${interests}'
        TravelStyle: '${travel_style}'
        GroupType: '${group_type}'

        Return only valid JSON (do not include markdown or prose). The output must strictly follow this structure and syntax:

        {
        "name": "A descriptive title for the trip",
        "description": "A brief description of the trip and its highlights not exceeding 100 words",
        "estimatedPrice": "Lowest average price for the trip in USD, e.g. $8000",
        "duration": ${duration},
        "budget": "${budget_estimate}",
        "travelStyle": "${travel_style}",
        "country": "${country}",
        "interests": "${interests}",
        "groupType": "${group_type}",
        "bestTimeToVisit": [
            "🌸 Season (from month to month): reason to visit",
            "☀️ Season (from month to month): reason to visit",
            "🍁 Season (from month to month): reason to visit",
            "❄️ Season (from month to month): reason to visit"
        ],
        "weatherInfo": [
            "☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
            "🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
            "🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
            "❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)"
        ],
        "location": {
            "city": "name of the city or region",
            "coordinates": [latitude, longitude],
            "openStreetMap": "https://www.openstreetmap.org/#map=6/latitude/longitude"
        },
        "itinerary": [
            {
            "day": 1,
            "location": "City/Region Name",
            "activities": [
                {
                "time": "Morning",
                "description": "🏰 Visit the local historic castle and enjoy a scenic walk"
                },
                {
                "time": "Afternoon",
                "description": "🖼️ Explore a famous art museum with a guided tour"
                },
                {
                "time": "Evening",
                "description": "🍷 Dine at a rooftop restaurant with local wine"
                }
            ]
            }
            // repeat for each day
        ]
        }

        Important:
        - All objects must use double quotes for keys and string values.
        - Each activity must include both a "time" and a "description" key.
        - Never use the "time" as a key directly (e.g., avoid { "Evening": "..." }).
        - The JSON must be valid and parseable with JSON.parse().
        `
    });


    const imgResponse = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
            query: `${country} ${interests} ${travel_style}`,
            client_id: unsplashApiKey
        }
    });

    const imageUrls = imgResponse.data.results.slice(0, 3).map((result: { urls: { regular: string } }) => result.urls?.regular || null);
    // return imageUrls;

    if (!response.text) {
        return NextResponse.json({
            result: "No trip generate",
            status: 400
        })
    }

    return NextResponse.json({
        result: response.text,
        images: imageUrls,
        status: 200
    })
}