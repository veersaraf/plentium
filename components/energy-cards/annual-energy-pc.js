"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EnergyUsePP } from '@/components/charts/energy';
import { ArrowUp } from 'lucide-react';
import { getDomainData } from '@/lib/utils';

export const EnergyUse = ({className, data, country}) => {
    data = getDomainData(data, country, "e-use-pp-gdp-pc").slice(-25)
    let value = (((data.at(-1)["Primary energy consumption per capita (kWh/person)"] - data.at(-2)["Primary energy consumption per capita (kWh/person)"]) / data.at(-2)["Primary energy consumption per capita (kWh/person)"]) * 100).toFixed(1);
    
    return (
        <div className={`chart border-none px-0 pb-0 ${className}`}>
            <h1 className='chart-title'>Energy use per capita (KWh), {country}</h1>
            <div className='chart-data text-left pl-3'>{data.at(-1)["Primary energy consumption per capita (kWh/person)"]}<div className='chart-data-span'><ArrowUp size={17} data-value={value > 0 ? true : false} className='text-[#2eec7d] data-[value=false]:text-[#ec542e] data-[value=false]:rotate-180'/>{value}% YoY</div></div>
            <EnergyUsePP data={data} className='w-full h-[150px]'/>
        </div>
    )
}