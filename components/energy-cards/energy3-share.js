"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Energy3ShareChange } from '@/components/charts/energy';
import { Tabs2, TabsContent2, TabsList2, TabsTrigger2 } from "@/components/ui/tabs"
import NumberFlow from '@number-flow/react'
import { getDomainData } from '@/lib/utils';
import { Menu } from '@/components/menu';

export const Energy3Share = ({className, data, country}) => {

    let recent = getDomainData(data, country, "elc-3-%")
    let value = ((recent.at(-1)["Renewables"] + recent.at(-1)["Nuclear"]) - (recent.at(-5)["Renewables"] + recent.at(-5)["Nuclear"])) / 100

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Share of Fossil fuel, Renewable & nuclear (%), {country}</h1>
            <Tabs2 defaultValue="elc" className='flex-1'>
                <TabsList2 className="my-3">
                    <TabsTrigger2 value="ec">Energy</TabsTrigger2>
                    <TabsTrigger2 value="elc">Electricity</TabsTrigger2>
                </TabsList2>
                <TabsContent2 value="ec" >
                    <Energy3ShareChange data={getDomainData(data, country, "e-3-%").slice(-20)} className='w-full flex-1 h-[400px] mt-4'/>
                </TabsContent2>
                <TabsContent2 value="elc">
                    <Energy3ShareChange data={getDomainData(data, country, "elc-3-%").slice(-20)} className='w-full flex-1 h-[400px] mt-4'/>
                </TabsContent2>
            </Tabs2>
            <Menu sources={{"Share of Fossil fuel, Renewable & nuclear":"https://ourworldindata.org/grapher/electricity-fossil-renewables-nuclear-line"}}/>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={value} format={{ style: 'percent' }}/></div>
                <div className='chart-desc'>absolute clean energy share growth in the electricity mix since {data.at(-5)["Year"]}.</div>
            </div>
        </div>
        
    )
}