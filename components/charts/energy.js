"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Area, AreaChart,Line, LineChart,  Bar, Sector, Pie, PieChart, BarChart, CartesianGrid, XAxis, YAxis, LabelList, Cell } from "recharts"
import { ChartConfig, ChartContainer,ChartTooltip,ChartTooltipContent,ChartLegend,ChartLegendContent} from "@/components/ui/chart"
import { fill } from 'three/src/extras/TextureUtils'



export const MultiCountry = ({className, data}) => {
  const chartData = data ? data : []
  const countries = Object.keys(data.at(0)).filter((country) =>  country  !== "Year")
  
  const chartConfig = {
    "Year": {
      label: "Year",
    },
    ...countries.reduce((acc, country) => {
      acc[country] = {
        label: country,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      };
      return acc;
    }, {}),
  }

return (
    <ChartContainer config={chartConfig} className={className}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 15,
            left: -15,
            right: 15,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="Year"
            tickLine={false}
            axisLine={false}
            tickMargin={3}
            tickFormatter={(value) => `${String(value).slice(2, 4)}'`}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={5}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="Year" indicator="dot" />}/>
          {countries.map((country) => (
              <Line
                key={country}
                dataKey={country}
                dot={false}
                strokeWidth={2}
                type="monotone"
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
          <ChartLegend content={<ChartLegendContent className='w-[85%] text-[--primary-text] flex-wrap mx-auto' />} />
        </LineChart>
      </ChartContainer>
)
}

export const EnergyShare = ({className, data}) => {
    const chartData = data ? data : []
    
    const chartConfig = {
      "Year": {
        label: "Year",
      },
      "Solar": {
        label: "Solar",
        color: "#2ccfff",
      },
      "Wind": {
        label: "Wind",
        color: "#065374",
      },
      "Nuclear": {
        label: "Nuclear",
        color: "#ff58df",
      },
      "Hydro": {
        label: "Hydro",
        color: "#ff5d83",
      },
      "Gas": {
        label: "Gas",
        color: "#ff5d83",
      },
      "Coal": {
        label: "Coal",
        color: "#b10fff",
      },
      "Oil": {
        label: "Oil",
        color: "#ff58df",
      },
    }

  return (
      <ChartContainer config={chartConfig} className={className}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 15,
              left: -5,
              right: 15,
            }}
          >
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="Year"
              tickLine={false}
              axisLine={false}
              tickMargin={3}
              tickFormatter={(value) => `${String(value).slice(2, 4)}'`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelKey="Year" indicator="dot" />}
            />
            <Area
              type="monotone"
              dataKey="Solar"
              stroke="#2ccfff"
              strokeWidth={2}
              fill="#2ccfff"
              fillOpacity={0.2}
            >
              <LabelList
                dataKey="Solar"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Solar"] === value) == chartData.length - 15 ? "Solar" : ""}
              />
              </Area>
            <Area
              type="monotone"
              dataKey="Wind"
              stroke="#065374"
              strokeWidth={2}
              fill="#065374"
              fillOpacity={0.2}
            >
              <LabelList
                dataKey="Wind"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Wind"] === value) == chartData.length - 5 ? "Wind" : ""}
              />
              </Area>
            <Area
              type="monotone"
              dataKey="Nuclear"
              stroke="#ff58df"
              strokeWidth={2}
              fill="#ff58df"
              fillOpacity={0.2}
            >
              <LabelList
                dataKey="Nuclear"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Nuclear"] === value) == chartData.length - 10 ? "Nuclear" : ""}
              />
              </Area>
            <Area
              type="monotone"
              dataKey="Hydro"
              stroke="#ff5d83"
              strokeWidth={2}
              fill="#ff5d83"
              fillOpacity={0.2}
            >
              <LabelList
                dataKey="Hydro"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Hydro"] === value) == chartData.length - 20 ? "Hydro" : ""}
              />
              </Area>
            <Area
              type="monotone"
              dataKey="Gas"
              stroke="#ff5d83"
              strokeWidth={2}
              fill="#ff5d83"
              fillOpacity={0.2}
            >
              <LabelList
                dataKey="Gas"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Gas"] === value) == chartData.length - 10 ? "Gas" : ""}
              />
              </Area>
            <Area
              type="monotone"
              dataKey="Coal"
              stroke="#b10fff"
              strokeWidth={2}
              fill="#b10fff"
              fillOpacity={0.2}
            >
              <LabelList
                dataKey="Coal"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Coal"] === value) == chartData.length - 15 ? "Coal" : ""}
              />
              </Area>
            <Area
              type="monotone"
              dataKey="Oil"
              stroke="#ff58df"
              strokeWidth={2}
              fill="#ff58df"
              fillOpacity={0.2}
            >
              <LabelList
                dataKey="Oil"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Oil"] === value) == chartData.length - 5 ? "Oil" : ""}
              />
              </Area>
            <ChartLegend content={<ChartLegendContent className='w-[85%] text-[--primary-text] flex-wrap mx-auto' />} />
          </AreaChart>
        </ChartContainer>
  )
}

export const LeaderBoards = ({className, data, unit}) => {
  const chartData = data ? data : []
  const chartConfig = {
    Country: {
      label: "Country",
      color: "green",
    },
    Value: {
      label: "Value",
      color: "hsl(var(--tertiary-chart-bg))",
    },
  } 

  return (
        <ChartContainer config={chartConfig} className={className}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              // top:30,
              left: 10,
              // right: 15,
            }}
          >
            <YAxis
              dataKey="Country"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              fontSize={10}
              hide
            />
            <XAxis dataKey="Value" type="number" hide />
            <Bar
              dataKey="Value"
              layout="vertical"
              fill="#047857"
              radius={5}
              barSize={50}
            >
               <LabelList
                dataKey="Country"
                position="insideLeft"
                offset={5}
                fill='white'
                fontSize={14}
                formatter={(value) => `${chartData.findIndex(item => item.Country === value) + 4}) ${value}`}
              />
            <LabelList
                dataKey="Value"
                position="right"
                offset={5}
                fontSize={14}
                formatter={(value) => `${value ? value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"}${unit}`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
  )
}

export const AnnualEnergyChange = ({className, data}) => {
   const chartData = data ? data : []
   
   const chartConfig = {
    Year: {
      label: "Year",
    },
     "Change %": {
       label: "Change (%)",
       color: "hsl(var(--chart-1))",
     },
   }
 
 return (
     <ChartContainer config={chartConfig} className={className}>
         <BarChart
             accessibilityLayer
             data={chartData}
             margin={{
               left: -25,
               right:10,
             }}
           >
             {/* <CartesianGrid vertical={false} /> */}
             <YAxis
               tickLine={false}
               axisLine={false}
               tickMargin={8}
               tickCount={5}
             />
             <XAxis
               dataKey="Year"
               tickLine={false}
               tickMargin={10}
               axisLine={false}
             />
             <ChartTooltip
               cursor={false}
              content={<ChartTooltipContent labelKey="Year" />}
             />
             <Bar dataKey="Change %" fill="#2eec7d" radius={5}>
             <LabelList
                dataKey="Change %"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => `${value ? value.toFixed(0) : "N/A"}%`}
              />
              {chartData.map((item) => (
                <Cell
                  key={item["Change %"]}
                  fill={
                    item["Change %"] > 0
                      ? "#2eec7d"
                      : "#ef7020"
                  }
                />
              ))}
             </Bar>
           </BarChart>
     </ChartContainer>
   )
 }

 export const Energy3ShareChange = ({className, data}) => {
   const chartData = data ? data : []
   
   const chartConfig = {
     "Year": {
       label: "Year",
     },
     "Fossil fuels": {
       label: "Fossil Fuels",
       color: "#ef7020",
     },
     "Renewables": {
       label: "Renewables",
       color: "#3aee7a",
     },
     "Nuclear": {
       label: "Nuclear",
       color: "#ec7ad7"
   }
}

 return (
     <ChartContainer config={chartConfig} className={className}>
         <LineChart accessibilityLayer data={chartData}
            margin={{
              left: -20,
              right: 20
            }}
            >
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="Year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis axisLine={false} tickLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="Year" />} />

            <Line
              dataKey="Fossil fuels"
              stroke="#ef7020"
              strokeWidth={2}
              dot={false}
            >
               <LabelList
                dataKey="Fossil fuels"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Fossil fuels"] === value) == chartData.length - 12 ? "Fossil fuels" : ""}
              />
              <LabelList
                dataKey="Fossil fuels"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Fossil fuels"] === value) == chartData.length - 1 ? `${value ? value.toFixed(0) : "N/A"}%` : ""}
              />
              </Line>
            <Line
              dataKey="Renewables"
              stroke="#3aee7a"
              strokeWidth={2}
              dot={false}
            >
              <LabelList
                dataKey="Renewables"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Renewables"] === value) == chartData.length - 5 ? "Renewables" : ""}
              />
              <LabelList
                dataKey="Renewables"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item.Renewables === value) == chartData.length - 1 ? `${value ? value.toFixed(0) : "N/A"}%` : ""}
              />
            </Line>
            <Line 
              dataKey="Nuclear"
              stroke="#ec7ad7"
              strokeWidth={2}
              dot={false} 
            >
              <LabelList
                dataKey="Nuclear"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Nuclear"] === value) == chartData.length - 10 ? "Nuclear" : ""}
              />
               <LabelList
                dataKey="Nuclear"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item.Nuclear === value) == chartData.length - 1 ? `${value ? value.toFixed(0) : "N/A"}%` : ""}
              />
            </Line>
            <ChartLegend content={<ChartLegendContent className='w-[85%] text-[--primary-text] flex-wrap mx-auto' />} />
          </LineChart>
     </ChartContainer>
   )
 }

 export const Capacity = ({className, data}) => {
  const chartData = data ? data : []
  
  const chartConfig = {
    "Year": {
      label: "Year",
    },
    "Solar": {
      label: "Solar",
      color: "#2ccfff",
    },
    "Wind": {
      label: "Wind",
      color: "#065374",
    },
    "Nuclear": {
      label: "Nuclear",
      color: "#ff58df",
    },
    "Hydro": {
      label: "Hydro",
      color: "#ff5d83",
    },
    "Fossil Fuels": {
      label: "Fossil Fuels",
      color: "#ff5d83",
    },
    "Bioenergy": {
      label: "Bioenergy",
      color: "#b10fff",
    },
    "Other Renewables": {
      label: "Other Renewables",
      color: "#ff58df",
    },
  }

return (
    <ChartContainer config={chartConfig} className={className}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 15,
            left: -5,
            right: 15,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="Year"
            tickLine={false}
            axisLine={false}
            tickMargin={3}
            tickFormatter={(value) => `${String(value).slice(2, 4)}'`}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={5}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent labelKey="Year" indicator="dot" />}
          />
          <Area
            type="monotone"
            dataKey="Solar"
            stroke="#2ccfff"
            strokeWidth={2}
            fill="#2ccfff"
            fillOpacity={0.2}
          >
            <LabelList
                dataKey="Solar"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Solar"] === value) == chartData.length - 6 ? "Solar" : ""}
              />
             <LabelList
                dataKey="Solar"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item.Solar === value) == chartData.length - 1 ? `${value ? value.toFixed(0) : "N/A"}` : ""}
              />
            </Area>
          <Area
            type="monotone"
            dataKey="Wind"
            stroke="#065374"
            strokeWidth={2}
            fill="#065374"
            fillOpacity={0.2}
          >
            <LabelList
                dataKey="Wind"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Wind"] === value) == chartData.length - 8 ? "Wind" : ""}
              />
            <LabelList
                dataKey="Wind"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item.Wind === value) == chartData.length - 1 ? `${value ? value.toFixed(0) : "N/A"}` : ""}
              />
            </Area>
          <Area
            type="monotone"
            dataKey="Nuclear"
            stroke="#ff58df"
            strokeWidth={2}
            fill="#ff58df"
            fillOpacity={0.2}
          >
            <LabelList
                dataKey="Nuclear"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Nuclear"] === value) == chartData.length - 10 ? "Nuclear" : ""}
              />
            <LabelList
                dataKey="Nuclear"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item.Nuclear === value) == chartData.length - 1 ? `${value ? value.toFixed(0) : "N/A"}` : ""}
              />
            </Area>
          <Area
            type="monotone"
            dataKey="Hydro"
            stroke="#ff5d83"
            strokeWidth={2}
            fill="#ff5d83"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="Other Renewables"
            stroke="#ff5d83"
            strokeWidth={2}
            fill="#ff5d83"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="Bioenergy"
            stroke="#b10fff"
            strokeWidth={2}
            fill="#b10fff"
            fillOpacity={0.2}
          />
          {/* <Area
            type="monotone"
            dataKey="Fossil Fuels"
            stroke="#ff58df"
            strokeWidth={2}
            fill="#ff58df"
            fillOpacity={0.2}
          /> */}
          <ChartLegend content={<ChartLegendContent className='w-[85%] text-[--primary-text] flex-wrap mx-auto' />} />
        </AreaChart>
      </ChartContainer>
)
}

 export const CapacityAdditions = ({className, data}) => {
  const chartData = data ? data : []

  const chartConfig = {
    "Mix": {
      label: "Year",
    },
    Solar: {
      label: "Solar",
      color: "#2ccfff",
    },
    Wind: {
      label: "Wind",
      color: "#065374",
    },
    Nuclear: {
      label: "Nuclear",
      color: "#065374",
    },
    Bioenergy: {
      label: "Bioenergy",
      color: "#065374",
    },
    Geothermal: {
      label: "Geothermal",
      color: "#065374",
    },
    "Fossil fuels": {
      label: "Fossil fuels",
      color: "#b10fff",
    },
    Hydro: {
      label: "Hydro",
      color: "#ff5d83",
    },

  }

return (
    <ChartContainer config={chartConfig} className={className}>
        <LineChart
          accessibilityLayer
          data={chartData}
          // className='px-1'
          margin={{
            top: 15,
            left: -10,
            right: 22,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="Year"
            tickLine={false}
            axisLine={false}
            tickMargin={3}
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={5}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent labelKey="Mix" indicator="dot" />}
          />
          <Line
            type="monotone"
            dataKey="Solar"
            dot={false}
            stroke="#2ccfff"
            strokeWidth={2}
          >
            <LabelList
                dataKey="Solar"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Solar"] === value) == chartData.length - 2 ? "Solar" : ""}
              />
            <LabelList
                dataKey="Solar"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item.Solar === value) == chartData.length - 1 ? `${value ? value.toFixed(0) : "N/A"}GW` : ""}
              />
            </Line>
          <Line
            type="monotone"
            dataKey="Wind"
            dot={false}
            stroke="#065374"
            strokeWidth={2}
          >
            <LabelList
                dataKey="Wind"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Wind"] === value) == chartData.length - 4 ? "Wind" : ""}
              />
            <LabelList
                dataKey="Wind"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item.Wind === value) == chartData.length - 1 ? `${value ? value.toFixed(0) : "N/A"}GW` : ""}
              />
            </Line>
          <Line
            type="monotone"
            dataKey="Nuclear"
            dot={false}
            stroke="#065374"
            strokeWidth={2}
          >
            <LabelList
                dataKey="Nuclear"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Nuclear"] === value) == chartData.length - 4 ? "Nuclear" : ""}
              />
            <LabelList
                dataKey="Nuclear"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item.Nuclear === value) == chartData.length - 1 ? `${value ? value.toFixed(0) : "N/A"}GW` : ""}
              />
            </Line>
          <Line
            type="monotone"
            dataKey="Hydro"
            dot={false}
            stroke="#ff5d83"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Bioenergy"
            dot={false}
            stroke="#b10fff"
            strokeWidth={2}
          />
          {/* <Line
            type="monotone"
            dataKey="Fossil fuels"
            stroke="#ff58df"
            strokeWidth={2}
          /> */}
          <Line
            type="monotone"
            dataKey="Geothermal"
            dot={false}
            stroke="#ff58df"
            strokeWidth={2}
          />
          <ChartLegend content={<ChartLegendContent className='w-[85%] text-[--primary-text] flex-wrap mx-auto' />} />
        </LineChart>
      </ChartContainer>
  )
}

export const PlannedCapacity = ({className}) => {
  
  const chartData = [
    { type: "Solar", capacity: 24 },
    { type: "Wind", capacity: 90 },
    { type: "Nuclear", capacity: 100 },
    { type: "Hydro", capacity: 5 },
    { type: "Coal", capacity: 250 },
    { type: "Gas", capacity: 125 },
    { type: "Bio", capacity: 25 },
  ]

  const chartConfig = {
    capacity: {
      label: "Capacity",
    },
    type: {
      label: "Type",
      color: "#Nuclear",
    },
  } 

  return (
        <ChartContainer config={chartConfig} className={className}>
           <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 3,
              right: 5,
            }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelKey="type" labelFormatter={value => `${value}`}/>}
            />
            <Bar dataKey="capacity" stackId="a" fill="#ffc6f7" radius={[0, 5, 5, 0]}>
              <LabelList
                dataKey="capacity"
                position="insideLeft"
                offset={8}
                className="fill-[--primary-text]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
  )
}

export const CurrentCapacity = ({className, data}) => {
  const chartData = data ? data : []

  const chartConfig = {
    value: {
      label: "Capacity (GW)",
    },
    type: {
      label: "Type",
    },
  } 

  return (
        <ChartContainer config={chartConfig} className={className}>
           <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
              right: 20,
            }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelKey="type" labelFormatter={value => `${value}`}/>}
            />
            <Bar dataKey="value" stackId="a" fill="#ffc6f7" radius={5}>
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-[--primary-text]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
  )
}

export const EnergyConsumptionGDPPC = ({className, data}) => {
  const chartData = data ? data : []
  
  const chartConfig = {
    Year: {
      label: "Year",
    },
    "Primary energy consumption per capita (kWh/person)": {
      label: "Energy use per capita (kWh/person)",
      color: "#220706",
    },
    "GDP per capita, PPP (constant 2017 international $)" : {
      label: "GDP per capita $",
      color: "#de4311",
    },
  }

return (
    <ChartContainer config={chartConfig} className={className}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top:10,
            right:20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="Year"
            tickLine={false}
            axisLine={false}
            tickMargin={3}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={5}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent labelKey="Year" />}
          />
          <Line
            dataKey="Primary energy consumption per capita (kWh/person)"
            stroke='#000000'
            >
              <LabelList
                dataKey="Primary energy consumption per capita (kWh/person)"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Primary energy consumption per capita (kWh/person)"] === value) == chartData.length - 10 ? "Energy use per person" : ""}
              />
            <LabelList
                dataKey="Primary energy consumption per capita (kWh/person)"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["Primary energy consumption per capita (kWh/person)"] === value) == chartData.length - 1 ? `${value ? value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"}` : ""}
              />
          </Line>
          <Line
            dataKey="GDP per capita, PPP (constant 2017 international $)"
            stroke='#fe4311'
          >
            <LabelList
                dataKey="GDP per capita, PPP (constant 2017 international $)"
                position="top"
                offset={10}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["GDP per capita, PPP (constant 2017 international $)"] === value) == chartData.length - 10 ? "GDP per capita" : ""}
              />
             <LabelList
                dataKey="GDP per capita, PPP (constant 2017 international $)"
                position="top"
                offset={5}
                fontSize={12}
                formatter={(value) => chartData.findIndex(item => item["GDP per capita, PPP (constant 2017 international $)"] === value) == chartData.length - 1 ? `$${value ? value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"}` : ""}
              />
          </Line>
          <ChartLegend content={<ChartLegendContent className='w-[85%] text-[--primary-text] flex-wrap mx-auto' />} />
        </LineChart>
      </ChartContainer>
)
}

export const EnergyUsePP = ({className, data}) => {
  const chartData = data ? data : []
    const chartConfig = {
      Year: {
        label: "Year",
      },
      "Primary energy consumption per capita (kWh/person)": {
        label: "Energy use per capita (kWh/person)",
        color: "#220706",
      },
    }

  return (
        <ChartContainer config={chartConfig} className={className}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="text-black" indicator="dot" labelKey="Year" />}
            />
            <Area
              dataKey="Primary energy consumption per capita (kWh/person)"
              type="natural"
              fill="#f50ddd"
              dot={false}
              // radius={2}
              stroke="#f50ddd"
            >
            </Area>
          </AreaChart>
        </ChartContainer>
  )
}

export const ShareRenewables = ({className, data}) => {
  const chartData = data ? data : []
  const chartConfig = {
    Year: {
      label: "Year",
    },
    Renewables: {
      label: "Renewables",
      color: "#00ff9d",
    },
  }

return (
      <ChartContainer config={chartConfig} className={className}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 0,
            right: 0,
          }}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent className="text-black" indicator="dot" labelKey="Year"/>}
          />
          <Area
            dataKey="Renewables"
            type="natural"
            fill="#2bfdac"
            // dot={true}
            radius={2}
            stroke="#00ff9d"
          >
          </Area>
        </AreaChart>
      </ChartContainer>
)
}

export const ShareFossils = ({className, data}) => {
  const chartData = data ? data : []
  const chartConfig = {
    Year: {
      label: "Year",
    },
    "Fossil fuels": {
      label: "Fossil Fuels",
      color: "#ff0000",
    },
  }

return (
      <ChartContainer config={chartConfig} className={className}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 0,
            right: 0,
          }}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent className="text-black" labelKey="Year"/>}
          />
          <Area
            dataKey="Fossil fuels"
            type="natural"
            fill="#ff0000"
            // dot={true}
            radius={2}
            stroke="#ff0000"
          >
          </Area>
        </AreaChart>
      </ChartContainer>
)
}

export const NuclearUnits = ({className, data}) => {
  const chartData = data ? data : []

  const chartConfig = {
    Country: {
      label: "Country",
    },
    "Operation Units": {
      label: "Operation",
    },
    "Suspended Units": {
      label: "Suspended",
    },
    "Under Construction Units": {
      label: "Under Construction",
    },
  }

  return (
        <ChartContainer config={chartConfig} className={className}>
          <BarChart accessibilityLayer data={chartData} 
           layout="vertical"
           margin={{
             left: 30,
             right: 15,
           }}
           >
            <XAxis
              hide
              type="number"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent className="text-[--primary-text]"/>} />
            <YAxis
              type="category"
              dataKey="Country"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar
              dataKey="Operation Units"
              stackId="a"
              fill="#2ccfff"
              radius={[5, 0, 0, 5]}
            >
              <LabelList
                dataKey="Operation Units"
                position="insideRight"
                offset={8}
                className="fill-[--primary-text]"
                fontSize={12}
              />
            </Bar>
            {/* <Bar
              dataKey="Suspended Units"
              stackId="a"
              fill="#ff0000"
              radius={[0, 0, 0, 0]}
            /> */}
            <Bar
              dataKey="Under Construction Units"
              stackId="a"
              fill="#0000ff"
              radius={[0, 5, 5, 0]}
            >
               <LabelList
                dataKey="Under Construction Units"
                position="right"
                offset={8}
                className="fill-[--primary-text]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
  )
}

export const EnergySafety = ({className, data, type}) => {
  const chartData = data ? data : []
  const key = type == 1 ? "Deaths per TWh of electricity production" : "tCO2e emissions per GWh of electricity over plant lifecycle" 
  
  const chartConfig = {
   Type: {
     label: "Energy source",
   },
  [key]: {
      label: type == 1 ? "Deaths / TWh" : "tCO2e / GWh",
      color: "#ff0000",
    },
  }

return (
    <ChartContainer config={chartConfig} className={className}>
        <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 32,
              top: 10
            }}
          >
            <YAxis
              dataKey="Type"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickCount={5}
            />
            <XAxis type="number" hide/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="Type" />} />
            <Bar dataKey={key} fill="#2eec7d" radius={5}>
              <LabelList
                dataKey={key}
                position="right"
                offset={5}
                fontSize={12}
              />
            </Bar>
          </BarChart>
    </ChartContainer>
  )
}

export const NuclearWasteTypesChart = ({className, data}) => {
  const chartData = [
    { type: "Low-Level", value: 90, fill: "#ff0000", desc: "Tools and work clothing (1% radioactivity in total waste)" },
    { type: "Intermediate-Level",  fill: "#0000ff", value: 7, desc: "Used filters, steel components (4% radioactivity in total waste)" },
    { type: "High-Level", value: 3, fill: "#2eec7d", desc: "Spent fuel (95% radioactivity in total waste)" },
  ]

  const chartConfig = {
    value: {
      label: "%",
    },
    "High-Level": {
      label: "High-Level",
      fill: "#ff0000",
    },
    "Intermediate-Level": {
      label: "Intermediate-Level",
      fill: "#0000ff",
    },
    "Low-Level": {
      label: "Low-Level",
      fill: "#2eec7d",
    },
  }

return (
    <ChartContainer config={chartConfig} className={className} >
          <PieChart >
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    className='fill-[--primary-text]'
                  >
                    {payload.type} ({payload.value}%)
                  </text>
                )
              }}>
            </Pie>
            {/* <ChartLegend content={<ChartLegendContent nameKey="type"/>} /> */}
          </PieChart>
        </ChartContainer>
  )
}

export const NuclearWasteChart = ({className, data, column}) => {
  const chartData = data ? data : []

  const chartConfig = {
    Country: {
      label: "Country",
    },
    "Discharged %": {
      label: "Produced (% of total global waste)",
    },
    "Reprocessed %": {
      label: "Recycled (% of total global recycled waste)",
    },
    "Discharged tHM": {
      label: "Produced tHM",
    },
    "Reprocessed tHM": {
      label: "Recycled tHM",
    },
  }

  return (
        <ChartContainer config={chartConfig} className={className}>
          <BarChart accessibilityLayer data={chartData} 
           layout="vertical"
           margin={{
             left: 15,
             right: 25,
           }}
           >
            <XAxis
              hide
              type="number"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent className="text-[--primary-text]" />} />
            <YAxis
              type="category"
              dataKey="Country"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar
              dataKey={column}
              stackId="a"
              fill="#2ccfff"
              radius={5}
            >
              <LabelList
                dataKey={column}
                position="right"
                offset={8}
                className="fill-[--primary-text]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
  )
}