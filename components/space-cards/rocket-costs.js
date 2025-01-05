"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SpaceRockeCost } from '@/components/charts/space';
import NumberFlow from '@number-flow/react'
import { sortData } from '@/lib/utils';
import { Menu } from '@/components/menu';

export const RocketCosts  = ({className, data}) => {

    data = sortData(data, "asc", "Year")

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Cost per kilogram to low-earth orbit by launch vehicle ($ / kg)</h1>
            <SpaceRockeCost data={data} className='w-full h-[450px] mt-4'/>
            <Menu sources={{"Ourworldindata": "https://ourworldindata.org/grapher/cost-space-launches-low-earth-orbit"}}/>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'>$<NumberFlow value={200}/>/kg</div>
                <div className='chart-desc'>Estimated launch cost of Staship, the lowest of any kind of orbital class rocket in history</div>
            </div>
        </div>
        
    )
}