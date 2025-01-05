"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StarlinkSubscribers } from '@/components/charts/space';
import NumberFlow from '@number-flow/react'
import { Menu } from '@/components/menu';

export const StarlinkSubs = ({className, data}) => {

    let value = data.filter(item => item["Month"] == "01-09-2024")[0]["Subscribers"] / data.filter(item => item["Month"] == "01-09-2023")[0]["Subscribers"];

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Cumulative Starlink subscribers per year</h1>
            <StarlinkSubscribers data={data} className='w-full h-[450px] mt-4'/>
            <Menu sources={{"Wikipedia": "https://en.wikipedia.org/wiki/Starlink"}}/>
            <div className='cursor-default'>
                <div className='chart-number'><NumberFlow value={value} format={{style: 'percent'}} /></div>
                <div className='chart-desc'>YoY growth in Starlink subscribers since 09/2023.</div>
            </div>
        </div>
        
    )
}