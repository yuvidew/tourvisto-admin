"use client"

import { baseUrl } from '@/lib/utils';
import { TravelPlan } from '@/types/type';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

/**
 * Custom React hook to fetch all travel trips from the server.
 *
 * @returns {Object} An object containing:
 * - `loading`: A boolean indicating if the request is in progress.
 * - `allTrips`: An array of `TravelPlan` objects.
 */

export const useGetTrips = () : {loading : boolean , allTrips : TravelPlan[]} => {
    const [loading, setLoading] = useState(false);
    const [allTrips, setAllTrips] = useState<TravelPlan[]>([]);

    /**
   * Fetches all trips from the API and updates state.
   *
   * @async
   * @returns {Promise<void>}
   */

    const getAllTrips = async (): Promise<void> => {
        setLoading(true);
        try {
            const token = localStorage.getItem("tourvisto-token");

            const response = await axios.get(baseUrl.get_trip, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status !== 200) {
                toast.error("Failed to fetch trips");
                return;
            }

            setAllTrips(response.data.trips);


        } catch (error) {
            console.log("Error fetching trips:", error);
            toast.error("Failed to fetch trips");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllTrips();
    } , [])

    return { loading, allTrips}
}
