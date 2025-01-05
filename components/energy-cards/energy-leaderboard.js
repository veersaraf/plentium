"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Combobox } from '../ui/combobox';
import { LeaderBoards } from '@/components/charts/energy';
import { MultiCountry } from '@/components/charts/energy';
import NumberFlow from '@number-flow/react'
import { getDomainData, sortData, leaderboardDomains, continents } from '@/lib/utils';

export const EnergyLeaderBoard = ({className, data}) => {
    const [domain, setDomain] = useState('Renewables %');
    let pick = leaderboardDomains[domain];
    let result =  sortData(getDomainData(domain.includes("capacity")  ? data.capacity : data.mix, false, pick["Code"], domain == "GDP per capita" ? 2022 : 2023).map(item => ({ Country: item.Country, Value: item[pick["Key"]] })), "desc", "Value");
   
    let countries = result.filter(item => !continents.includes(item.Country)).slice(0, 7).map(item => item.Country);
    let chartResults = Object.values(
        countries.map(c => getDomainData(domain.includes("capacity")  ? data.capacity : data.mix, c, pick["Code"]).slice(-30).map(item => ({ Year: item.Year, [c]: item[pick["Key"]] }))).flat().reduce((acc, { Year, ...rest }) => {
            acc[Year] = { ...acc[Year], Year, ...rest };
            return acc;
        }, {})
        )
    result = result.filter(item => !continents.includes(item.Country))

    return (
        <div className={`chart ${className}`}>
            <h1 className='chart-title mb-5'>Global Superstars Leaderboard</h1>
            <div className='m-3 flex-1 border border-[--primary-border] rounded-[--primary-radius]'>
                <Combobox className=' border-none justify-start text-left h-fit w-fit mx-auto p-2' values={Object.keys(leaderboardDomains)} value={domain} setValue={setDomain}/>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 mb-3 grid-flow-row mx-3 border border-[--primary-border] divide-y lg:divide-x lg:divide-y-0 divide-[--primary-border] rounded-[--primary-radius]'>
                <div className='h-fit flex-1 py-3 md:py-1'>
                    <p className='chart-desc whitespace-nowrap text-[14px]'>1st Place <span className='text-[--primary-text] bg-[#047857] rounded-[--primary-radius] p-1 w-fit'>{result.at(0)["Country"]}</span></p>
                    <div className='chart-number  flex-1'><NumberFlow value={result.at(0)["Value"].toFixed(1)}/>{pick["Unit"]}</div>
                </div>
                <div className='h-fit flex-1 py-3 md:py-1'>
                    <p className='chart-desc whitespace-nowrap text-[14px]'>2nd Place <span className='text-[--primary-text] bg-[#047857] rounded-[--primary-radius] p-1 w-fit'>{result.at(1)["Country"]}</span></p>
                    <div className='chart-number  flex-1'><NumberFlow value={result.at(1)["Value"].toFixed(1)}/>{pick["Unit"]}</div>
                </div>
                <div className='h-fit flex-1 py-3 md:py-1'>
                    <p className='chart-desc whitespace-nowrap text-[14px]'>3rd Place <span className='text-[--primary-text] bg-[#047857] rounded-[--primary-radius] p-1 w-fit'>{result.at(2)["Country"]}</span></p>
                    <div className='chart-number  flex-1'><NumberFlow value={result.at(2)["Value"].toFixed(1)}/>{pick["Unit"]}</div>
                </div>
            </div>
            <MultiCountry data={chartResults} className='w-full my-10 h-[400px]'/>
            <div className='w-full h-[500px] mt-3 overflow-auto'>
                <LeaderBoards data={result.slice(3, result.length)} unit={pick["Unit"]} className='h-[500vh] w-full' />
            </div>
        </div>
    )
}