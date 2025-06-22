"use client";
import { baseUrl } from "@/lib/utils";
import { TravelPlan } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook to fetch a single trip by ID.
 *
 * @param {string} id - The ID of the trip to fetch.
 * @returns {Object} Contains:
 *  - `trip`: The trip data.
 *  - `loading`: Loading state.
 *  - `getTripById`: Function to manually re-fetch trip data by ID.
 */

export const useGetTripById = (
    id: string
): {
    trip: TravelPlan | undefined;
    loading: boolean;
    getTripById: (id: string) => Promise<void>;
} => {
    const [trip, setTrip] = useState<TravelPlan>();
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Fetches trip details by ID.
     *
     * @param {string} tripId - Trip ID to fetch.
     * @returns {Promise<void>}
     */

    const getTripById = async (id: string): Promise<void> => {
        if (!id) {
            toast.error("Trip ID is required");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl.get_trip_id}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("tourvisto-token")}`,
                },
            });

            if (res.status !== 200) {
                toast.error("Failed to fetch trip details");
                return;
            }

            setTrip(res.data.trip);
        } catch (error) {
            console.error("Error fetching trip by ID:", error);
            toast.error("Failed to fetch trip details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTripById(id);
    }, [id]);

    return {
        trip,
        loading,
        getTripById,
    };
};
