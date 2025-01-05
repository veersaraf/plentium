"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Area, AreaChart,Line, LineChart,  Bar, Sector, Pie, PieChart, BarChart, CartesianGrid, XAxis, YAxis, LabelList, Cell } from "recharts"
import { ChartConfig, ChartContainer,ChartTooltip,ChartTooltipContent,ChartLegend,ChartLegendContent} from "@/components/ui/chart"
import { fill } from 'three/src/extras/TextureUtils'

export const SpaceLunchesCountry = ({className, data}) => {
    const chartData = data.reduce((acc, { Year, Country, Launches }) => {
        const existingYear = acc.find(item => item.Year === Year)
        if (existingYear) {
          existingYear[Country] = Launches
        } else {
          acc.push({ Year, [Country]: Launches })
        }
        return acc
      }, [])
    const countries = Array.from(new Set(data.map(item => item.Country)))
    const colors = ["#ef7020", "#1e4fa2", "#3aee7a", "#ec7ad7", "#fe4ad6"]
    const chartConfig = Object.fromEntries(
          countries.map((Country, index) => [
            Country,
            { label: Country, color: colors[index] }
          ])
        )
  return (
      <ChartContainer config={chartConfig} className={className}>
          <LineChart accessibilityLayer data={chartData} margin={{ left: -20, right: 20 }}>
             <XAxis dataKey="Year" tickLine={false} tickMargin={10} axisLine={false} />
             <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                {countries.map((Country, index) => (
                    <Line key={Country} type="monotone" strokeWidth={2} dot={false} dataKey={Country} stroke={colors[index]} name={Country}>
                           <LabelList dataKey={Country} position="top" fill={colors[index]} offset={10} formatter={(value) => chartData.find(item => item.Year === 2022)[Country] === value ? Country : ""}/>
                    </Line>
                    ))}
              <ChartLegend content={<ChartLegendContent className='w-[85%] text-[--primary-text] flex-wrap mx-auto' />} />
            </LineChart>
      </ChartContainer>
    )
  }

export const SpaceLunchesRocket = ({className, data}) => {
    const chartData = data.reduce((acc, { Year, Rocket, Launches }) => {
        const existingYear = acc.find(item => item.Year === Year)
        if (existingYear) {
          existingYear[Rocket] = Launches
        } else {
          acc.push({ Year, [Rocket]: Launches })
        }
        return acc
      }, [])
    const countries = ["Starship", "Falcon", "Vulcan", "Long March", "Firefly", "Electron", "Delta", "Ariane", "PSLV"]
    const colors = ["#ef7020", "#1e4fa2", "#3aee7a", "#ec7ad7", "#fe4ad6", "#a3a3a3", "--primary-text", "#b3acf2", "#e4e4e4", "#f2f2f2"]
    const chartConfig = Object.fromEntries(
          countries.map((Rocket, index) => [
            Rocket,
            { label: Rocket, color: colors[index] }
          ])
        )
  return (
      <ChartContainer config={chartConfig} className={className}>
          <LineChart accessibilityLayer data={chartData} margin={{ left: -20, right: 20 }}>
             <XAxis dataKey="Year" tickLine={false} tickMargin={10} axisLine={false} />
             <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                {countries.map((Rocket, index) => (
                    <Line key={Rocket} type="monotone" strokeWidth={2} dot={false} dataKey={Rocket} stroke={colors[index]} name={Rocket}></Line>
                    ))}
              <ChartLegend content={<ChartLegendContent className='w-[85%] text-[--primary-text] flex-wrap mx-auto' />} />
            </LineChart>
      </ChartContainer>
    )
  }

export const SpaceRockeCost = ({className, data}) => {
    // {
  //   "Entity": "Space Shuttle",
  //   "Code": "",
  //   "Year": 1981,
  //   "cost_per_kg": 65400,
  //   "launch_class": "Heavy"
  // }


    const chartData = data.reduce((acc, { Year, Entity, cost_per_kg }) => {
        const existingYear = acc.find(item => item.Year === Year)
        if (existingYear) {
          existingYear[Entity] = cost_per_kg
        } else {
          acc.push({ Year, [Entity]: cost_per_kg })
        }
        return acc
      }, [])
    const countries =  Array.from(new Set(data.map(item => item.Entity)))
    const colors = ["#ef7020", "#1e4fa2", "#3aee7a", "#ec7ad7", "#fe4ad6", "#a3a3a3", "--primary-text", "#b3acf2", "#e4e4e4", "#f2f2f2"]
    const chartConfig = Object.fromEntries(
          countries.map((Entity, index) => [
            Entity,
            { label: Entity, color: colors[index] }
          ])
        )
  return (
      <ChartContainer config={chartConfig} className={className}>
          <LineChart accessibilityLayer data={chartData} margin={{ left: 0, right: 30, top: 10 }}>
             <XAxis dataKey="Year" tickLine={false} tickMargin={10} axisLine={false} />
             <YAxis tickLine={false} tickMargin={10} axisLine={false} tickFormatter={value => `${value / 1e3}K $`}/>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                {countries.map((Entity, index) => (
                    <Line key={Entity} type="monotone" dot dataKey={Entity} stroke={colors[index]} name={Entity}>
                            <LabelList dataKey={Entity} position="top" fill={colors[index]} offset={10} formatter={(value) => Entity}/>
                    </Line>
                    ))}
            </LineChart>
      </ChartContainer>
    )
  }

export const StarlinkSatellites = ({className, data}) => {
    const chartData = data ? data : []
    const chartConfig = {
      Year: {
        label: "Year",
      },
      Launched: {
        label: "Launched",
      },
    } 
    return (
          <ChartContainer config={chartConfig} className={className}>
             <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 0, right: 25 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="Year" type="category" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="Year" labelFormatter={value => `${value}`}/>} />
              <Bar dataKey="Launched" stackId="a" fill="#ffc6f7" radius={5}>
                <LabelList dataKey="Launched" position="right" offset={8} className="fill-[--primary-text]" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
    )
  }

export const StarlinkSubscribers = ({ className, data }) => {
    const chartData = data ? data : []
    const chartConfig = {
      Month: {
        label: "Month",
      },
      Subscribers: {
        label: "Subscribers",
      },
    }
    return (
      <ChartContainer config={chartConfig} className={className}>
        <LineChart data={chartData} margin={{ left: 5, right: 20, top: 20 }}>
          <XAxis dataKey="Month" axisLine={false} tickLine={false} tickFormatter={value => `${value.split('-')[1]}/${value.split('-')[2].slice(-2)}`} />
          <YAxis dataKey="Subscribers" tickLine={false} tickMargin={20} axisLine={false} tickFormatter={value => `${value / 1e6} M`} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="Month" />} />
          <Line dataKey="Subscribers" dot={false}>
            <LabelList dataKey="Subscribers" position="top" fill="#ffffff" formatter={value => `${value / 1e6} M`} />
          </Line>
        </LineChart>
      </ChartContainer>
    )
  }