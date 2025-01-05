"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs2, TabsContent2, TabsList2, TabsTrigger2 } from "@/components/ui/tabs"
import { EnergySafety } from '@/components/charts/energy';
import NumberFlow from '@number-flow/react'
import { sortData } from '@/lib/utils';
import { Menu } from '../menu';

export const NuclearSafety = ({className, data}) => {
   
    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Yearly deaths & tCO2e emissions per TWh of electricity production by energy source</h1>
            <Tabs2 defaultValue="s">
                <TabsList2 className="my-3">
                    <TabsTrigger2 value="s">Safety</TabsTrigger2>
                    <TabsTrigger2 value="c">Cleanliness</TabsTrigger2>
                </TabsList2>
                <TabsContent2 value="s"> 
                    <EnergySafety data={sortData(data, "desc", "Deaths per TWh of electricity production")} type={1} className='w-full flex-1 h-[400px] mt-4'/>
                </TabsContent2>
                <TabsContent2 value="c">
                    <EnergySafety data={sortData(data, "desc", "tCO2e emissions per GWh of electricity over plant lifecycle")} type={2} className='w-full flex-1 h-[400px] mt-4'/>
                </TabsContent2>
            </Tabs2>
            <Menu sources={{"Ourworldindata: What are the safest and cleanest sources of energy?": "https://ourworldindata.org/safest-sources-of-energy"}}/>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={data.filter(item => item["Type"] == "Nuclear")[0]["Deaths per TWh of electricity production"]} /></div>
                <div className='chart-desc'>deaths / TWh. Nuclear energy is one of the safest and cleanest sources of energy production. These are including deaths associated with extremely rare accidents such as Chernobyl, Banqiao dam etc and emissions over the lifecycle of a plant.</div>
            </div>
        </div>
    )
}