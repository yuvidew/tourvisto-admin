"use client";

import { baseUrl } from '@/lib/utils';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';


/**
 * Custom hook for deleting a travel trip by ID.
 *
 * @returns {Object} - Contains:
 * - `onDeleteTrip`: Function to call for deleting a trip.
 * - `loading`: Boolean indicating if the delete operation is in progress.
 */

export const useDeleteTripApi = () : {onDeleteTrip : (id : number) => Promise<void> , loading : boolean} => {
    const [loading, setLoading] = useState(false);

    /**
   * Deletes a trip from the API by ID.
   *
   * @param {number} id - The ID of the trip to delete.
   * @returns {Promise<void>}
   */

    const onDeleteTrip = async (id: number): Promise<void>  => {
        setLoading(false);
        try {
            const token = localStorage.getItem("tourvisto-token");
            const response = await axios.delete(`${baseUrl.delete_trip_id}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status !== 200) {
                toast.error(response.data.message)
                return ;
            }

            toast.success(response.data.message)
            window.location.reload()
        } catch (error) {
            console.log("Delete trip error : ", error);
            toast.error("Failed to delete trip")
        }finally {
            setLoading(false)
        }
    }
    return { onDeleteTrip, loading }
}
