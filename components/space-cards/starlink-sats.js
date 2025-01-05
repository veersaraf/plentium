"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StarlinkSatellites } from '@/components/charts/space';
import NumberFlow from '@number-flow/react'
import { sortData } from '@/lib/utils';
import { Menu } from '@/components/menu';

export const StarlinkSats = ({className, data}) => {
    data = sortData(data, "desc", 'Year')
    let value = data.filter(item => item["Year"] == 2024)[0]["In Orbit"]

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Cumulative Starlink satellites launched per year</h1>
            <StarlinkSatellites data={data} className='w-full h-[450px] mt-4'/>
            <Menu sources={{"Wikipedia": "https://en.wikipedia.org/wiki/Starlink"}}/>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={value}/></div>
                <div className='chart-desc'>No of. Starlink satellites currently in orbit and operational as of 2024. Note some satellites that have been recently launched are not yet in orbit</div>
            </div>
        </div>
        
    )
}