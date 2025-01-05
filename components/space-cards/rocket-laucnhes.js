"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SpaceLunchesRocket } from '@/components/charts/space';
import NumberFlow from '@number-flow/react'
import { getDomainData } from '@/lib/utils';
import { Menu } from '@/components/menu';

export const RocketLaunches = ({className, data}) => {

    data = data.filter(item => item.Year > 2000)
    let value = data.filter(item => item["Rocket"] == "Falcon").slice(-1)[0]["Launches"];

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Historical orbital launches by launch vehicle per year</h1>
            <SpaceLunchesRocket data={data} className='w-full h-[450px] mt-4'/>
            <Menu sources={{"Wikipedia": "https://en.wikipedia.org/wiki/2024_in_spaceflight"}}/>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={value}/></div>
                <div className='chart-desc'>Falcon 9 laucnhes as of december 2024. SpaceX launched a rocket roughly every 2.5 days in 2024 and continues to grow every year with no other rocket being nearly as close</div>
            </div>
        </div>
        
    )
}