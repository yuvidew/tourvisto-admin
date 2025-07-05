"use client";

import {
    Card,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React, { JSX, useMemo } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { TravelDetail, TripCardType } from "@/types/type";
import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";
import { EllipsisIcon } from "lucide-react";
import { DropdownOption } from "./DropdownOption";

/**
 * Renders a single trip card with image, name, price, location, and tags.
 *
 * @param {TripCardType} props - The props object.
 * @param {string} props.id - Unique ID of the trip.
 * @param {string} props.result - JSON string result containing trip details.
 * @param {string[]} props.imageUrl - Array of image URLs related to the trip.
 *
 * @returns {JSX.Element} A clickable card linking to the trip details page.
 */
export const TripCard = ({
    id,
    result,
    imageUrl,
}: TripCardType): JSX.Element => {
    const router = useRouter();

    /**
     * Parses the result JSON string to extract trip details.
     * @type {TravelDetail | null}
     */
    const tripDetail: TravelDetail | null = useMemo(() => {
        if (!result) return null;

        try {
            const cleaned = result.replace(/```json|```/g, "").trim();
            return JSON.parse(cleaned);
        } catch (error) {
            console.error("❌ JSON Parse Error:", error);
            return null;
        }
    }, [result]);

    /**
     * Generates visual tag badges based on trip style and budget.
     */
    const pillsItems = useMemo(() => {
        if (!tripDetail) return [];

        return [
            {
                text: tripDetail.travelStyle || "Unknown",
                classname: "bg-[#F7EDF6] text-[#C11574]",
            },
            {
                text: tripDetail.budget || "Not specified",
                classname: "bg-[#ECFDF3] text-[#027A48]",
            },
        ];
    }, [tripDetail]);

    const coverImage = imageUrl?.[0] || "/assets/images/sample.jpeg";

    return (
        <Card
            className="p-0 gap-0 overflow-hidden cursor-pointer h-[23rem]"
            onClick={() => router.replace(`/trips/${id}`)}
        >
            <div className="h-[50%] relative">
                <div className=" absolute top-2 right-2">
                <DropdownOption id={id}>
                    <EllipsisIcon className="text-white" />
                </DropdownOption>
                </div>
                <Badge className="py-1 absolute top-2 left-2 px-3 rounded-full font-semibold bg-white text-[#1F1F36]">
                    {tripDetail?.estimatedPrice || "₹0"}
                </Badge>
                <Image
                    src={coverImage}
                    alt="Trip image"
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="px-4 py-3 flex flex-col gap-[12px] h-[35%]">
                <CardTitle className="font-semibold text-[#1F1F36] text-[18px]">
                    {tripDetail?.name || "Unnamed Trip"}
                </CardTitle>

                <div className="flex items-center">
                    <Image
                        src="/assets/icons/location-mark.svg"
                        alt="Location Icon"
                        width={16}
                        height={16}
                        className="mr-2"
                    />
                    <p className="text-[14px] text-[#7F7E83] font-normal">
                        {tripDetail?.itinerary?.slice(0, 2).map(day => day.location).join(", ") || "No locations"}
                    </p>
                </div>
            </div>

            <CardFooter className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                    {pillsItems.map((item, index) => (
                        <Badge
                            key={index}
                            className={cn("py-1 px-3 rounded-full font-semibold", item.classname)}
                        >
                            {item.text}
                        </Badge>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
};
