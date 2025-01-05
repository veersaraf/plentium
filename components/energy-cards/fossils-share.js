"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShareFossils } from '@/components/charts/energy';
import { ArrowUp } from 'lucide-react';
import { getDomainData, removeNAN } from '@/lib/utils';

export const FossilShare = ({className, data, country}) => {
    data = removeNAN(getDomainData(data, country, "elc-3-%").map(item => ({ Year: item.Year, ["Fossil fuels"]: item["Fossil fuels"] }))).slice(-25)
    let value = (((data.at(-1)["Fossil fuels"] - data.at(-2)["Fossil fuels"]) / data.at(-2)["Fossil fuels"]) * 100).toFixed(1);

    return (
        <div className={`chart text-[--primary-text]  border-none px-0 pb-0 ${className}`}>
            <h1 className='chart-title text-[--primary-text]'>Share of fossil fuels in the electricity mix</h1>
            <div className='chart-data'>{data.at(-1)["Fossil fuels"].toFixed(1)}%<div className='chart-data-span'><ArrowUp size={17} data-value={value > 0 ? true : false} className='text-[#2eec7d] data-[value=false]:text-[#ec542e] data-[value=false]:rotate-180'/>{value}% YoY</div></div>
            <ShareFossils data={data} className='w-full h-[150px]'/>
        </div>
    )
}