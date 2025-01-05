"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnnualEnergyChange } from '@/components/charts/energy';
import NumberFlow from '@number-flow/react'
import { getDomainData } from '@/lib/utils';
import { Menu } from '../menu';

export const EnergyChange = ({className, data, country}) => {
    data = getDomainData(data, country, "e-chng-%").slice(-20)
    let value = (data.slice(-5).reduce((acc, item) => acc * (1 + item["Change %"] / 100), 1) - 1 )
    
    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Change in primary energy consumption (%), {country}</h1>
            <AnnualEnergyChange data={data} className='w-full flex-1 h-[400px] mt-4'/>
            <Menu sources={{"Annual energy change":"https://ourworldindata.org/grapher/change-energy-consumption"}}/>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={value} format={{ style: 'percent' }}/></div>
                <div className='chart-desc'>overall growth in primary energy consumption since {data.at(-5)["Year"]}.</div>
            </div>
        </div>
    )
}