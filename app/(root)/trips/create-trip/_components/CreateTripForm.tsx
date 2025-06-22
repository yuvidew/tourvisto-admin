"use client";

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Label } from '@/components/Label';
import { SelectWithSearchField } from './SelectWithSearchField';
import { InputField } from './InputField';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useAllCountries } from '@/app/(root)/trips/create-trip/hook/useAllCountries';
import { budgetOptions, groupTypes, interests, travelStyles } from '@/constants';
import {LayerDirective, LayersDirective, MapsComponent} from "@syncfusion/ej2-react-maps";
import { world_map } from '@/constants/world_map';
import { useGenerateTrip } from '@/app/(root)/trips/create-trip/hook/useGenerateTrip';
import Spinner from '@/components/Spinner';
import { useGetTrips } from '@/hooks/useGetTrips';


export const CreateTripForm = () => {
    const {allCountries , loading} = useAllCountries();
    const { allTrips} = useGetTrips();
    const {onGenerateTrip , loading:loadingGenerate , error} = useGenerateTrip()

    const countryData = allCountries.map((country) => (
        {
            label : country.name , 
            value : country.name,
            img : country.flag?.png || country.flag?.svg || ""
        }
    ))

    console.log("fetch all trip", allTrips);

    const [formData , setFormData] = useState({
        country : "",
        duration : 0,
        group_type : "",
        travel_style : "",
        interests : "",
        budget_estimate : "" 
    })

    const mapDate = [
        {
            country : formData.country,
            color : "#EA382E",
            coordinates : allCountries.find((c) => c.name === formData.country)?.coordinates || []
        }
    ]

    const checkIsDisable = !formData.country || !formData.duration || !formData.group_type || !formData.travel_style || !formData.interests || !formData.budget_estimate

    return (
            <Card className='lg:w-[700px] md:w-[550px] sm-[500px] rounded-[12px] flex flex-col gap-[24px] p-[24px] shadow-none mb-[34px]'>
                <CardContent className='flex flex-col gap-[24px] p-0'>
                    {/* start select country field*/}
                    <div className=' flex flex-col gap-[8px]'>
                        <Label htmlFor='country' className=' text-[#7F7E83] text-[14px] font-normal'>
                            Country
                        </Label>
                        <SelectWithSearchField
                            placeholder='Select country'
                            label='country'
                            selectValue={formData.country}
                            onSelectValue={(value) => 
                                    setFormData((prev) => ({
                                    ...prev,
                                    country : value
                                }))
                            }
                            frameworks={countryData}
                            loading = {loading}
                        />
                    </div>
                    {/* end select country field*/}

                    {/* start duration input field */}
                    <InputField 
                        label='Duration' 
                        placeholder='Enter number of days (e.g., 5, 12)' 
                        value={formData.duration}
                        onChange={(value) => 
                            setFormData((prev) => ({
                                ...prev,
                                duration : value as number
                            }))
                        }
                    />
                    {/* end duration input field */}

                    {/* start select group type field*/}
                    <div className=' flex flex-col gap-[8px]'>
                        <Label htmlFor='group_type' className=' text-[#7F7E83] text-[14px] font-normal'>
                            Group type
                        </Label>
                        <SelectWithSearchField
                            placeholder='Select a group type'
                            label='group type'
                            selectValue={formData.group_type}
                            onSelectValue={(value) => 
                                    setFormData((prev) => ({
                                    ...prev,
                                    group_type : value
                                }))
                            }
                            frameworks={groupTypes.map((item) => ({
                                label : item,
                                value : item
                            }))}
                            loading = {false}
                        />
                    </div>
                    {/* end select group type field*/}

                    {/* start select group style field*/}
                    <div className=' flex flex-col gap-[8px]'>
                        <Label htmlFor='travel_style' className=' text-[#7F7E83] text-[14px] font-normal'>
                            Travel style
                        </Label>
                        <SelectWithSearchField
                            placeholder='Select a travel style'
                            label='travel style'
                            selectValue={formData.travel_style}
                            onSelectValue={(value) => 
                                    setFormData((prev) => ({
                                    ...prev,
                                    travel_style : value
                                }))
                            }
                            frameworks={travelStyles.map((item) => ({
                                label : item,
                                value : item
                            }))}
                            loading = {false}
                        />
                    </div>
                    {/* end select group style field*/}

                    {/* start select interests field*/}
                    <div className=' flex flex-col gap-[8px]'>
                        <Label htmlFor='interests' className=' text-[#7F7E83] text-[14px] font-normal'>
                            Interests
                        </Label>
                        <SelectWithSearchField
                            placeholder='Select a interests'
                            label='interests'
                            selectValue={formData.interests}
                            onSelectValue={(value) => 
                                    setFormData((prev) => ({
                                    ...prev,
                                    interests : value
                                }))
                            }
                            frameworks={interests.map((item) => ({
                                label : item,
                                value : item
                            }))}
                            loading = {false}
                        />
                    </div>
                    {/* end select interests field*/}

                    {/* start select interests field*/}
                    <div className=' flex flex-col gap-[8px]'>
                        <Label htmlFor='budget_estimate' className=' text-[#7F7E83] text-[14px] font-normal'>
                            Budget Estimate
                        </Label>
                        <SelectWithSearchField
                            placeholder='Select a budget estimate'
                            label='budget estimate'
                            selectValue={formData.budget_estimate}
                            onSelectValue={(value) => 
                                    setFormData((prev) => ({
                                    ...prev,
                                    budget_estimate : value
                                }))
                            }
                            frameworks={budgetOptions.map((item) => ({
                                label : item,
                                value : item
                            }))}
                            loading = {false}
                        />
                    </div>
                    {/* end select interests field*/}

                    {/* start show the map location */}
                    <div className=' flex flex-col gap-[8px]'>
                        <Label htmlFor='budget_estimate' className=' text-[#7F7E83] text-[14px] font-normal'>
                            Location on the world map
                        </Label>

                        <MapsComponent>
                            <LayersDirective>
                                <LayerDirective
                                    shapeData={world_map}
                                    dataSource={mapDate}
                                    shapeDataPath='country'
                                    shapePropertyPath={"name"}
                                    shapeSettings={{
                                        colorValuePath : "color",
                                        fill : "#e5e5e5"
                                    }}

                                />
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    {/* end show the map location */}

                    {/* start to show error  */}
                    {!error && <p className=' text-red-500 text-[12px] font-normal'>{error}</p>}
                    {/* end to show error  */}

                </CardContent>
                <CardFooter className='p-0'>
                    <Button 
                        variant={"primary"} 
                        className=' w-full rounded-[8px] cursor-pointer'
                        disabled = {checkIsDisable}
                        onClick={() =>onGenerateTrip(formData)}
                    >
                        {loadingGenerate ? (
                            <>
                            <Spinner color="white" size='sm' />
                            Generating...
                            </>
                        ) : (
                            <>
                                <Image
                                    src={"/assets/icons/magic-star.svg"}
                                    alt='submit logo'
                                    width={200}
                                    height={200}
                                    className=' size-5'
                                />

                                Generate a trip
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
    )
}
