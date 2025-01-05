"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SpaceLunchesCountry } from '@/components/charts/space';
import NumberFlow from '@number-flow/react'
import { getDomainData } from '@/lib/utils';
import { Menu } from '@/components/menu';
import { Slice } from 'lucide-react';

export const SpaceLaunches = ({className, data}) => {

    data = getDomainData(data, ["United States", "China", "India", "Russia", "Europe"])
    let value = data.filter(item => item["Country"] == "United States").slice(-1)[0]["Launches"];

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Historical orbital launches per year by country</h1>
            <SpaceLunchesCountry data={data} className='w-full h-[450px] mt-4'/>
            <Menu sources={{"Wikipedia": "https://en.wikipedia.org/wiki/2024_in_spaceflight"}}/>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={value} /></div>
                <div className='chart-desc'>Number of orbital launches in 2023 for the United States, the highest in the world</div>
            </div>
        </div>
        
    )
}