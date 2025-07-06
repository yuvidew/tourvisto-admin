import z from "zod";

export const createTripValidator = z.object({
    userId: z.number().min(1, "User ID is required"),
    country: z.string().trim().min(1, "Country is required"),
    duration: z.string().trim().min(1, "Duration is required"),
    group_type: z.string().trim().min(1, "Group type is required"),
    travel_style: z.string().trim().min(1, "Travel style is required"),
    interests: z.string().trim().min(1, "Interests are required"),
    budget_estimate: z.string().trim().min(1, "Budget estimate is required"),
    images: z.string().trim().min(1, "Images are required"),
    result: z.string().trim().min(1, "Result is required"),
})