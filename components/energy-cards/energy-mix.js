"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EnergyShare } from '@/components/charts/energy';
import { Tabs2, TabsContent2, TabsList2, TabsTrigger2 } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import NumberFlow from '@number-flow/react'
import { getDomainData, sortData } from '@/lib/utils';
import { Menu } from '@/components/menu';

export const EnergyMix = ({className, data, country}) => {
    const [type, setType] = useState("abs")

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Primary consumption by individual sources (TWh), {country}</h1>
            <Tabs2 defaultValue="ec">
                <TabsList2 className="my-3">
                    <TabsTrigger2 value="ec">Energy</TabsTrigger2>
                    <TabsTrigger2 value="elc">Electricity</TabsTrigger2>
                </TabsList2>
                <TabsContent2 value="ec">
                    <EnergyShare data={type === "abs" ? getDomainData(data, country, "e-TWh") : getDomainData(data, country, "e-%")} className='w-full flex-1 h-[400px]'/>
                </TabsContent2>
                <TabsContent2 value="elc">
                    <EnergyShare data={getDomainData(data, country, "elc-TWh")} className='w-full flex-1 h-[400px]'/>
                </TabsContent2>
            </Tabs2>
            <div className='flex'>
                <ToggleGroup type="single" onValueChange={setType}  value={type}>
                    <ToggleGroupItem value="abs">ABS</ToggleGroupItem>
                    <ToggleGroupItem value="%">%</ToggleGroupItem>
                </ToggleGroup>
                <Menu sources={{"Energy mix":"https://ourworldindata.org/grapher/primary-sub-energy-source/", "Electricity mix": "https://ourworldindata.org/grapher/electricity-prod-source-stacked", "Enegy share": "https://ourworldindata.org/grapher/share-energy-source-sub"}}/>
            </div>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={(getDomainData(data, country, "e-TWh").at(-1)["Total Consumption"]).toFixed(0)}/>TWh </div>
                <div className='chart-desc'>{country}'s total cumulative energy consumption. China remains the the world's largest energy consumer.</div>
            </div>
        </div>
    )
}