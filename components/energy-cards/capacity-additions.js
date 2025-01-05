"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CapacityAdditions } from '@/components/charts/energy';
import NumberFlow from '@number-flow/react'
import { getDomainData } from '@/lib/utils';
import { Menu } from '@/components/menu';

export const EnergyCapacityAdditions = ({className, data, country}) => {
    data = getDomainData(data, country, "YoY absolute change")
    let value = data.slice(-5).reduce((acc, { Solar }, i, arr) => i > 0 ? acc + (Solar - arr[i - 1].Solar) : acc, 0) / 4 / 100
    
    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title'>Renewable capacity additions by sources (GW), {country}</h1>
            <CapacityAdditions data={data} className='w-full md:flex-1 h-[400px] mt-4'/>
            <Menu sources={{"Ember data":"https://ember-energy.org/data/electricity-data-explorer/"}}/>
            <div className='cursor-default sm:flex'>
                <div className='chart-number'><NumberFlow value={value} format={{ style: 'percent' }}/></div>
                <div className='chart-desc'>average YoY growth in solar capacity additions since {data.at(-5)["Year"]}.</div>
            </div>
        </div>
    )
}