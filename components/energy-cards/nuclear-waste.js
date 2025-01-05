"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NuclearWasteChart } from '@/components/charts/energy';
import NumberFlow from '@number-flow/react'
import { Tabs2, TabsContent2, TabsList2, TabsTrigger2 } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { sortData, removeNAN } from '@/lib/utils';
import { Menu } from '../menu';

export const NuclearWaste = ({className, data}) => {
    const [type, setType] = useState("%")
    data = sortData(data, "desc", "Discharged %");

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Nuclear waste production and recycling by countries (tHM)</h1>
            <Tabs2 defaultValue="d">
                <TabsList2 className="my-3">
                    <TabsTrigger2 value="d">Prodcued</TabsTrigger2>
                    <TabsTrigger2 value="r">Recycled</TabsTrigger2>
                </TabsList2>
                <TabsContent2 value="d">
                    <NuclearWasteChart data={data.slice(1, 13)} className='w-full h-[400px] mt-4' column={type === "abs" ? "Discharged tHM" : "Discharged %"}/>
                </TabsContent2>
                <TabsContent2 value="r">
                    <NuclearWasteChart data={removeNAN(sortData(data.slice(1, 13), "desc", "Reprocessed %"))} className='w-full h-[400px] mt-4' column={type === "abs" ? "Reprocessed tHM" : "Reprocessed %" }/>
                </TabsContent2>
            </Tabs2>
            <div className='flex'>
                <ToggleGroup type="single" onValueChange={setType} value={type}>
                    <ToggleGroupItem value="abs">ABS</ToggleGroupItem>
                    <ToggleGroupItem value="%">%</ToggleGroupItem>
                </ToggleGroup>
                <Menu sources={{"IAEA: Nuclear Technology Review 2024": "https://www.iaea.org/sites/default/files/gc/gc68-inf-4.pdf"}}/>
            </div>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={data.at(0)["Discharged tHM"]} />tHM</div>
                <div className='chart-desc'>of nuclear waste (spent nuclear fuel) has been produced by the world in history and {data.at(0)["Reprocessed %"]}% of it i.e {data.at(0)["Reprocessed tHM"]}tHM has been recycled. While the rest has been in long-term storage systems.</div>
            </div>
        </div>
    )
}