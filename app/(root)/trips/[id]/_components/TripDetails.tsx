"use client";

import React, { useEffect, useState } from "react";
import { useGetTripById } from "../hook/useGetTripById";
import { Skeleton } from "@/components/ui/skeleton";
import { TravelDetail } from "@/types/type";
import { InfoPills } from "./InfoPills";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGetTrips } from "@/hooks/useGetTrips";
import { TripCard } from "@/components/TripCard";

export const TripDetails = () => {
    const { id } = useParams();
    const { trip, loading } = useGetTripById(id as string);
    const { allTrips, loading: allTripsLoading } = useGetTrips();
    const [tripDetail, setTripDetail] = useState<TravelDetail | null>(null);
    const [pillsItems, setPillsItems] = useState<
        { text: string; classname: string }[]
    >([]);
    const [visitTimeAndWeather, setVisitTimeAndWeather] = useState<
        { text: string; items: string[] }[] | null
    >(null);

    const imageUrls =
        trip?.images?.split(",").map((img: string) => img.trim()) || [];


    useEffect(() => {
        if (!loading && trip) {
            const cleanedJsonString = trip.result.replace(/```json|```/g, "").trim();

            try {
                const parsedData = JSON.parse(cleanedJsonString);
                setTripDetail(parsedData);
            } catch (error) {
                console.error("❌ JSON Parse Error:", error);
                setTripDetail(null);
            }
        }
    }, [trip, loading]);

    useEffect(() => {
        if (tripDetail) {
            setPillsItems([
                {
                    text: tripDetail?.travelStyle as string,
                    classname: "bg-[#F7EDF6] text-[#C11574]",
                },
                {
                    text: tripDetail?.groupType as string,
                    classname: "bg-[#E9F3FB] text-[#175CD3]",
                },
                {
                    text: tripDetail?.budget as string,
                    classname: "bg-[#ECFDF3] text-[#027A48]",
                },
                {
                    text: tripDetail?.interests as string,
                    classname: "bg-[#F0F9FF] text-[#026AA2]",
                },
            ]);

            setVisitTimeAndWeather([
                {
                    text: "Best Time to Visit",
                    items: tripDetail?.bestTimeToVisit || [],
                },
                {
                    text: "Weather",
                    items: tripDetail?.weatherInfo || [],
                },
            ]);
        }
    }, [tripDetail]);

    return (
        <section className="w-full flex  items-start justify-center">
            {/* start to show the trip details */}
            <div className=" lg:w-[720px] flex flex-col gap-[36px] px-4">
                <div>
                    {loading && (
                        <div className=" flex flex-col gap-[36px]">
                            <div className="flex flex-col gap-2">
                                <Skeleton className=" w-full py-3" />
                                <Skeleton className=" w-[80%] py-3" />
                            </div>

                            <div className=" flex items-start gap-[20px] h-[308px]">
                                <div className=" w-[60%] h-full">
                                    <Skeleton className=" w-full h-full" />
                                </div>
                                <div className=" w-[40%] h-full flex flex-col gap-[20px]">
                                    <Skeleton className=" w-full h-full" />
                                    <Skeleton className=" w-full h-full" />
                                </div>
                            </div>

                            <Skeleton className=" w-full h-[100px]" />
                            <Skeleton className=" w-full h-[600px]" />
                        </div>
                    )}

                    {!loading && trip && tripDetail !== null && (
                        <div className=" flex flex-col gap-[36px]">
                            {/* start trip heading , location , duration of date */}
                            <div className=" flex flex-col gap-[24px]">
                                <h3 className=" text-[#1F1F36] font-semibold text-[40px]">
                                    {tripDetail?.name}
                                </h3>
                                <div className=" flex items-center gap-[25px]">
                                    <InfoPills
                                        text={`${tripDetail?.duration} day plan`}
                                        imageSrc="/assets/icons/calendar.svg"
                                    />
                                    <InfoPills
                                        text={
                                            tripDetail?.itinerary
                                                ?.slice(0, 2)
                                                .map((day) => day.location)
                                                .join(", ") || "Unknown Location"
                                        }
                                        imageSrc="/assets/icons/location-mark.svg"
                                    />
                                </div>
                            </div>
                            {/* end trip heading , location , duration of date */}

                            {/* start image for */}
                            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-[20px] mt-1 ">
                                {imageUrls.map((imageUrl, index) => (
                                    <Image
                                        key={index}
                                        src={imageUrl}
                                        width={500}
                                        height={500}
                                        alt={`Trip Image ${index + 1}`}
                                        className={cn(
                                            "w-full object-cover rounded-xl",
                                            index === 0
                                                ? "md:col-span-2 md:row-span-2 h-[330px]"
                                                : " md:row-span-1 h-[154px]"
                                        )}
                                    />
                                ))}
                            </div>
                            {/* end image for */}

                            {/* start to pills  */}
                            <div className="flex items-center gap-[20px]">
                                {pillsItems.length > 0 &&
                                    pillsItems.map((item, index) => (
                                        <Badge
                                            key={index}
                                            className={cn(
                                                " py-1 px-3 rounded-full font-semibold",
                                                item.classname
                                            )}
                                        >
                                            {item.text}
                                        </Badge>
                                    ))}

                                <ul className=" flex items-center gap-1">
                                    {Array(5)
                                        .fill(null)
                                        .map((_, index) => (
                                            <li key={index}>
                                                <Image
                                                    src="/assets/icons/star.svg"
                                                    width={20}
                                                    height={20}
                                                    alt="start Icon"
                                                    className=" size-[12px]"
                                                />
                                            </li>
                                        ))}
                                </ul>
                                <Badge className="py-1 px-3 rounded-full font-semibold bg-[#FFF4ED] text-[#B93815]">
                                    4.8/5.0
                                </Badge>
                            </div>
                            {/* end to pills  */}

                            {/* start article heading */}
                            <div className="flex items-start justify-between">
                                <div className=" flex flex-col gap-[16px]">
                                    <h2 className=" text-[#1F1F36] font-semibold text-[30px]">
                                        {tripDetail?.duration}-Day {tripDetail?.country}{" "}
                                        {tripDetail?.travelStyle} Trip
                                    </h2>
                                    <p className="text-[#7F7E83] font-normal text-[24px]">
                                        {tripDetail?.budget}, {tripDetail.groupType}, and{" "}
                                        {tripDetail?.interests}
                                    </p>
                                </div>

                                <h3 className="text-[#1F1F36] font-semibold text-[20px]">
                                    {tripDetail?.estimatedPrice}
                                </h3>
                            </div>
                            {/* end article heading */}

                            {/* start to description */}
                            <p className="text-[#2E2C48] font-normal text-[18px]">
                                {tripDetail.description}
                            </p>
                            {/* end to description */}

                            {/* start itinerary */}
                            <div className="flex flex-col gap-[20px]">
                                {tripDetail?.itinerary?.map((day, index) => (
                                    <div key={index} className="flex flex-col gap-[30px]">
                                        <h3 className=" text-[#2E2C48] font-semibold text-[20px]">
                                            Day {day.day}: {day.location}
                                        </h3>

                                        <ul className="list-disc space-y-[10px] pl-5 text-[#464549] font-normal ">
                                            {day.activities.map(
                                                ({ time, description }, activityIndex) => (
                                                    <li key={activityIndex}>
                                                        <span className="text-[15px] font-semibold">
                                                            {time}
                                                        </span>
                                                        <p className="text-[18px] text-[#2E2C48]">
                                                            {description}
                                                        </p>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            {/* end itinerary */}

                            {/* start visit time and weather */}
                            {visitTimeAndWeather &&
                                visitTimeAndWeather.map((item, index) => (
                                    <section key={index} className="flex flex-col gap-[20px]">
                                        <h3 className=" text-[#2E2C48] font-semibold text-[20px]">
                                            {item.text}
                                        </h3>
                                        <ul className=" flex flex-col gap-[18px]">
                                            {item.items.map((subItem, subIndex) => (
                                                <li
                                                    key={subIndex}
                                                    className="text-[#2E2C48] font-normal text-[18px]"
                                                >
                                                    {subItem}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            {/* end visit time and weather */}

                            {/* start booking button */}
                            <Button disabled>
                                Pay and join trip
                                <Badge className="py-1 px-3 rounded-full font-semibold cursor-pointer bg-white text-[#1F1F36]">
                                    {tripDetail?.estimatedPrice || "₹0"}
                                </Badge>
                            </Button>
                            {/* end booking button */}
                        </div>
                    )}
                </div>
                <div className=" w-full border-t border-neutral-300" />

                {/* start to popular trips */}
                <div className=" flex flex-col gap-[24px]">
                    <h2 className=" text-[#1F1F36] text-[24px] font-semibold">
                        Popular Itineraries
                    </h2>

                    <div className=" grid lg:grid-cols-2 md:grid-cols-1  grid-cols-1 gap-3">
                        {allTripsLoading && Array(5).fill(null).map((_, i) => (
                            <Skeleton key={i} className=' h-[22rem]' />
                        ))}

                        {!allTripsLoading && allTrips.length === 0 && (
                            <h2 className=' text-md text-[#7F7E83]'>All trips is empty</h2>
                        )}

                        {!allTripsLoading && allTrips.length > 0 && allTrips.slice(0, 3).map((item, i) => (
                            <TripCard
                                key={i}
                                imageUrl={item?.images?.split(',').map((img: string) => img.trim()) || []}
                                id={item.id}
                                result={item.result}
                            />
                        ))}

                    </div>
                </div>
                {/* end to popular trips */}
            </div>
            {/* end to show the trip details */}
        </section>
    );
};
