"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NuclearUnits, MultiCountry } from '@/components/charts/energy';
import { Tabs2, TabsContent2, TabsList2, TabsTrigger2 } from "@/components/ui/tabs"
import NumberFlow from '@number-flow/react'
import { getDomainData, sortData } from '@/lib/utils';
import { Menu } from '@/components/menu';

export const NuclearReactors = ({className, data, data2}) => {       
    data = sortData(data, "desc", "Operation Units").slice(0, 15);
    let value1 = data.filter(item => item["Country"] == "World")[0]["Operation Units"].toFixed(0);
    let value2 = data.filter(item => item["Country"] == "World")[0]["Under Construction Units"].toFixed(0);
    data = data.filter(d => d["Country"] !== "World")
    data2 = data2.filter(item => item.Country !== "World")

    let countries = [...sortData(getDomainData(data2, false, false, 2023), "desc", "Units").map(item => item.Country).slice(0, 10), "GERMANY"];
    console.log(countries)
    let result = Object.values(countries.map(c => getDomainData(data2, c).map(item => ({ Year: item.Year, [item.Country]: item["Units"] }))).flat().reduce((acc, { Year, ...rest }) => {
            acc[Year] = { ...acc[Year], Year, ...rest };
            return acc;
        }, {}))

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Number of nuclear reactors by country and type</h1>
            <Tabs2 defaultValue="r">
                <TabsList2 className="my-3">
                    <TabsTrigger2 value="r">Reactors</TabsTrigger2>
                    <TabsTrigger2 value="c">Yearly</TabsTrigger2>
                    {/* <TabsTrigger2 value="p">Projected (2030)</TabsTrigger2> */}
                </TabsList2>
                <TabsContent2 value="r"> 
                    <NuclearUnits data={data} className='w-full mt-4 flex-1 h-[400px]'/>
                </TabsContent2>
                <TabsContent2 value="c">
                    <MultiCountry data={result} className='w-full flex-1 mt-4 h-[400px]'/>
                </TabsContent2>
                {/* <TabsContent2 value="p">
                    <NuclearUnits data={data} className='w-full mt-4 flex-1 h-[400px]'/>
                </TabsContent2> */}
            </Tabs2>
            <Menu sources={{"IAEA: Nuclear Power Reactors in the World":"https://www.iaea.org/publications/15748/nuclear-power-reactors-in-the-world"}}/>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={value2} /></div>
                <div className='chart-desc'>Total number of nuclear reactors currently under construction. The world currently has {value1} operational reactors.</div>
            </div>
        </div>
    )
}