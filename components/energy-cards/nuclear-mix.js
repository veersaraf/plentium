"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MultiCountry } from '@/components/charts/energy';
import { Tabs2, TabsContent2, TabsList2, TabsTrigger2 } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import NumberFlow from '@number-flow/react'
import { getDomainData, sortData, continents } from '@/lib/utils';
import { Menu } from '@/components/menu';

export const NuclearMix = ({className, data}) => {   
    const [type, setType] = useState("abs")
    
    let countries = sortData(getDomainData(data, false, "e-TWh", 2023).filter(item => !continents.includes(item.Country)), "desc", "Nuclear").slice(0, 11).map(item => item.Country);
    let result = Object.values(countries.map(c => getDomainData(data, c, type === "abs" ? "e-TWh" : "e-3-%").map(item => ({ Year: item.Year, [c]: item["Nuclear"] }))).flat().reduce((acc, { Year, ...rest }) => {
            acc[Year] = { ...acc[Year], Year, ...rest };
            return acc;
        }, {})
        )
    let result2 =  Object.values(countries.map(c => getDomainData(data, c, type === "abs" ? "elc-TWh" : "elc-3-%").map(item => ({ Year: item.Year, [c]: item["Nuclear"] }))).flat().reduce((acc, { Year, ...rest }) => {
            acc[Year] = { ...acc[Year], Year, ...rest };
            return acc;
        }, {})
        )

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Top nuclear energy producers in the world (TWh)</h1>
            <Tabs2 defaultValue="ec">
                <TabsList2 className="my-3">
                    <TabsTrigger2 value="ec">Energy</TabsTrigger2>
                    <TabsTrigger2 value="elc">Electricity</TabsTrigger2>
                </TabsList2>
                <TabsContent2 value="ec">
                    <MultiCountry data={result} className='w-full flex-1 h-[400px]'/>
                </TabsContent2>
                <TabsContent2 value="elc">
                    <MultiCountry data={result2} className='w-full flex-1 h-[400px]'/>
                </TabsContent2>
            </Tabs2>
            <div className='flex'>
                <ToggleGroup type="single" onValueChange={setType}  value={type}>
                    <ToggleGroupItem value="abs">ABS</ToggleGroupItem>
                    <ToggleGroupItem value="%">%</ToggleGroupItem>
                </ToggleGroup>
                <Menu sources={{"Energy mix":"https://ourworldindata.org/grapher/primary-sub-energy-source/", "Electricity mix": "https://ourworldindata.org/grapher/electricity-prod-source-stacked", "Share of Fossil fuel, Renewable & nuclear":"https://ourworldindata.org/grapher/electricity-fossil-renewables-nuclear-line"}}/>
            </div>
            <div className='cursor-default'>
                <div className='chart-number'><NumberFlow value={(result2.at(-1)["France"]).toFixed(0)} />{type === "abs" ? "TWh" : "%"}</div>
                <div className='chart-desc'>of France's electricity production comes from nuclear energy.</div>
            </div>
        </div>
    )
}