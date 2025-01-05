"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShareRenewables } from '@/components/charts/energy';
import { ArrowUp } from 'lucide-react';
import { getDomainData, removeNAN } from '@/lib/utils';

export const RenewableShare = ({className, data, country}) => {
    data = getDomainData(data, country, "elc-3-%").map(item => ({ Year: item.Year, ["Renewables"]: item["Renewables"] + item["Nuclear"] })).slice(-25)
    let value = (((data.at(-1)["Renewables"] - data.at(-2)["Renewables"]) / data.at(-2)["Renewables"]) * 100).toFixed(1);
    // console.log(data)

    return (
        <div className={`chart overflow-auto text-[--primary-text]  border-none px-0 pb-0 ${className}`}>
            <h1 className='chart-title text-[--primary-text]'>Share of clean energy in the electricity mix</h1>
            <div className='chart-data'>{data.at(-1)["Renewables"].toFixed(1)}%<div className='chart-data-span'><ArrowUp size={17} data-value={value > 0 ? true : false} className='text-[#2eec7d] data-[value=false]:text-[#ec542e] data-[value=false]:rotate-180'/>{value}% YoY</div></div>
            <ShareRenewables data={data} className='w-full h-[150px]'/>
        </div>
    )
}