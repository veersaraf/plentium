"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CurrentCapacity, PlannedCapacity, Capacity } from '@/components/charts/energy';
import { Tabs2, TabsContent2, TabsList2, TabsTrigger2 } from "@/components/ui/tabs"
import NumberFlow from '@number-flow/react'
import { getDomainData, sortData } from '@/lib/utils';
import { Menu } from '@/components/menu';

export const EnergyCapacities = ({className, data, country}) => {
    data = getDomainData(data, country)
    let value = data.at(-1)["Total clean energy capacity"];

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Comulative installed capacity of renewables by sources (GW), {country}</h1>
            <Tabs2 defaultValue="cc">
                <TabsList2 className="my-3">
                    <TabsTrigger2 value="cc">Current</TabsTrigger2>
                    <TabsTrigger2 value="yc">Yearly</TabsTrigger2>
                    {/* <TabsTrigger2 value="pc">Projected (2030)</TabsTrigger2> */}
                </TabsList2>
                <TabsContent2 value="cc">
                    <CurrentCapacity data={sortData(Object.entries(data.at(-1)).filter(([key]) => key === "Solar" || key === "Wind" || key === "Nuclear" || key === "Hydro" || key === "Bioenergy" || key === "Other Renewables").map(([type, value]) => ({ type, value })), "desc", "value")} className='w-full h-[400px] mt-4'/>
                </TabsContent2>
                <TabsContent2 value="yc"> 
                    <Capacity data={data} className='w-full h-[400px] mt-4'/>
                </TabsContent2>
                {/* <TabsContent2 value="pc">
                    <PlannedCapacity className='w-full h-[400px] mt-4'/>
                </TabsContent2> */}
            </Tabs2>
            <Menu sources={{"Ember data":"https://ember-energy.org/data/electricity-data-explorer/"}}/>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={value}/>GW</div>
                <div className='chart-desc'>current comulative clean energy capacity as of {data.at(-1)["Year"]}.</div>
            </div>
        </div>
    )
}