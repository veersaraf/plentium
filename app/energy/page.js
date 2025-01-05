"use client"
import React, { useRef,useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Combobox } from '@/components/ui/combobox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import { TextRevealWipe } from '@/components/swipe';
import { InViewFade } from '@/components/fade'
import { Card } from '@/components/card';
import useSWR from 'swr'

import { EnergyLeaderBoard } from '@/components/energy-cards/energy-leaderboard';
import { EnergyMix } from '@/components/energy-cards/energy-mix';
import { EnergyChange } from '@/components/energy-cards/annual-energy-change';
import { Energy3Share } from '@/components/energy-cards/energy3-share';
import { EnergyCapacities } from '@/components/energy-cards/energy-capacity';
import { EnergyCapacityAdditions } from '@/components/energy-cards/capacity-additions';
import { EnergyUse } from '@/components/energy-cards/annual-energy-pc';
import { RenewableShare } from '@/components/energy-cards/renewable-share';
import { FossilShare } from '@/components/energy-cards/fossils-share';
import { EnergyGDPPC } from '@/components/energy-cards/energy-gdp-pc';
import pic from '@/assests/images/c.png'

export default function Home() {
  const router = useRouter()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  
  const { data, error, isLoading } = useSWR('/api/energy',fetcher)
  const [tab, setTab] = useState('home');
  const [country, setCountry] = useState('World');

  if (error) return <div className='loading-page'>Error</div>
  if (isLoading) return <div className='loading-page'>Loading data...</div>

  return (
    <div className='main'>
        <Tabs defaultValue="home" className='frame' onValueChange={setTab} value={tab}>

          <TabsContent value="home">
              <Card img={pic} />
              <InViewFade delay={500} className='absolute bottom-4 pr-3'>
                <TextRevealWipe className='title'>Road to Energy</TextRevealWipe>
                <TextRevealWipe delay={1.2} className='title'>Abundance</TextRevealWipe>
                <div className='description'>Global energy mix, renewables and installed capacity growth, country leaderboards, per capita and more.</div>
              </InViewFade>
          </TabsContent>

          <TabsContent value="mix">
                <Accordion className='my-10' type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Countries like <span className="acc-span">Norway, France and Iceland derive over 90%</span> of their electricity from a mix of <span className="acc-span">Renewables and Nuclear power</span>, demonstrating the dual benefits of <span className="acc-span">enhanced energy security</span> and drastically <span className="acc-span">reduced carbon emissions</span> while fueling <span className="acc-span">sustained economic growth</span></AccordionTrigger>
                    <AccordionContent>
                      Globally, <span className="acc-span">clean energy sources</span> already account for nearly <span className="acc-span">40% of electricity generation</span>, but the urgent push to scale capacity is accelerating, with <span className="acc-span">nuclear energy</span> at the forefront. Its unparalleled <span className="acc-span">reliability</span> and high <span className="acc-span">energy output</span> make it indispensable for powering <span className="acc-span">energy-intensive industries</span>, especially <span className="acc-span">artificial intelligence</span> and <span className="acc-span">data centers</span>, and the growing needs of <span className="acc-span">developing nations</span>.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
               <InViewFade initialDelay={600} className='my-10'><EnergyMix data={data.mix} country={country}/></InViewFade>
               
               <Accordion className="my-10" type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Energy consumption is a direct driver of <span className="acc-span">prosperity</span>—nations that consume more energy have <span className="acc-span">greater economic growth</span>. Countries like <span className="acc-span">India</span> are rapidly increasing their energy use to fuel <span className="acc-span">modernization</span>, while others like <span className="acc-span">the UK</span> risk <span className="acc-span">stagnation</span> as energy consumption declines. The global share of <span className="acc-span">renewables and nuclear energy</span> continues to rise, reshaping the energy mix at an <span className="acc-span">accelerating pace</span></AccordionTrigger>
                  <AccordionContent>
                    France stands out as a developed nation that has fully harnessed the <span className="acc-span">potential of nuclear energy</span>, securing both <span className="acc-span">economic stability</span> and <span className="acc-span">energy independence</span>. In stark contrast, Germany's <span className="acc-span">ill-advised decision</span>, taken by a country heavily reliant on energy imports, to phase out its nuclear reactors, influenced by political motives and <span className="acc-span">anti-nuclear sentiment</span> among <span className="acc-span">misinformed environmentalists</span>, is only now being finally recognized as a <span className="acc-span">critical error</span>. This <span className="acc-span">misstep</span>, compounded by the <span className="acc-span">2022 Russia-Ukraine war</span>, has exposed Germany’s vulnerability to <span className="acc-span">energy security</span>, <span className="acc-span">rising fossil fuel emissions</span>, and <span className="acc-span">economic instability</span>.
                  </AccordionContent>
                </AccordionItem>
               </Accordion>

                <InViewFade initialDelay={600}>
                  <div className='md:flex gap-5 my-10'>
                    <EnergyChange data={data.mix} country={country} className={'flex-1'}/>
                    <Energy3Share data={data.mix} country={country} className={'flex-1 mt-10 md:mt-0'}/>
                  </div>
                </InViewFade>

                <Accordion className="my-10" type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="my-10" icon={false}><span className="acc-span">Clean energy</span> consumption is <span className="acc-span">steadily rising</span>, driven by the global shift toward <span className="acc-span">renewables and nuclear power</span>, while <span className="acc-span">fossil fuel consumption</span> is either <span className="acc-span">stagnant or declining</span> in many regions.</AccordionTrigger>
                  </AccordionItem>
                </Accordion>

                <InViewFade initialDelay={600} className='md:flex gap-5 mt-10'>
                  <RenewableShare data={data.mix} country={country} className={'flex-1'}/>
                  <FossilShare data={data.mix} country={country} className={'flex-1 mt-10 md:mt-0'}/>
                </InViewFade>
          </TabsContent>

          <TabsContent value="capacity">
                <Accordion className="my-10" type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger><span className="acc-span">Solar and wind</span> capacity additions are <span className="acc-span">skyrocketing</span> and continue to <span className="acc-span">accelerate</span>. Projections for 2030 estimate <span className="acc-span">clean energy</span> capacity to reach <span className="acc-span">six times</span> current levels, a target that grows more <span className="acc-span">attainable</span> each day</AccordionTrigger>
                    <AccordionContent>
                      <span className="acc-span">China</span> dominates in <span className="acc-span">solar and wind</span> installations while also advancing upcoming <span className="acc-span">nuclear</span> projects, whereas the <span className="acc-span">United States</span> remains the global leader in <span className="acc-span">nuclear</span> capacity.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <InViewFade initialDelay={600}>
                  <div className='md:flex gap-2 my-10'>
                    <EnergyCapacities data={data.capacity} country={country} className={'flex-1'}/>
                    <EnergyCapacityAdditions data={data.capacity} country={country} className={'flex-1 mt-10 md:mt-0'}/>
                  </div>
                </InViewFade>

                <Accordion className="my-10" type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger icon={false}>Asia leads the world in <span className="acc-span">solar capacity additions</span> roughly at a growth of 46% year-on-year in the last 5 years. While Europe grew its solar additions by <span className="acc-span">9% every year</span> for the last 5 years.</AccordionTrigger>
                  </AccordionItem>
                </Accordion>
          </TabsContent>
        
          <TabsContent value="economics">
                <Accordion className="my-10" type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>There are <span className="acc-span">no energy-rich poor countries</span>. Nations like <span className="acc-span">Norway, Qatar, and the U.S.</span> have leveraged <span className="acc-span">energy abundance</span> into becoming <span className="acc-span">global powerhouses</span></AccordionTrigger>
                    <AccordionContent>
                      This <span className="acc-span">direct correlation</span> between <span className="acc-span">energy consumption</span> and <span className="acc-span">prosperity</span> is evident in developing economies like <span className="acc-span">India and Indonesia</span>, where <span className="acc-span">rising energy consumption</span> over the past decade has driven <span className="acc-span">simultaneous increases in GDP per capita </span>.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <InViewFade initialDelay={600} className='my-10'><EnergyGDPPC data={data.mix} country={country} /></InViewFade>
                
                <InViewFade initialDelay={600} className='my-10'><EnergyUse data={data.mix} country={country} /></InViewFade>
          </TabsContent>
          
          <TabsContent value="leaderboards" className="overflow-none">
                <Accordion className="my-10" type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger><span className="acc-span">Iceland, Norway, and Luxembourg</span> lead the world in the share of <span className="acc-span">renewables</span> in their electricity mix, with the former two having the <span className="acc-span">largest energy consumption per capitas</span> in the world</AccordionTrigger>
                    <AccordionContent>
                      <span className="acc-span">France and Denmark</span> dominate in <span className="acc-span">nuclear and wind energy</span>, respectively, with the highest shares in their electricity mix. Meanwhile, <span className="acc-span">Norway</span> stands as the global leader in <span className="acc-span">hydropower</span>, which accounts for 65% of its total energy mix.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <InViewFade initialDelay={600} className='my-10'><EnergyLeaderBoard data={data}/></InViewFade>
          </TabsContent>

          <TabsList>
            <InViewFade initialDelay={600} className='flex-1 overflow-auto h-[80px] md:h-[calc(100%-118px)]'>
              <h1 className='tag mt-2' onClick={() => setTab('home')}><div className='tag-box' />SUB-TOPICS</h1>
              <TabsTrigger value="mix" className='mt-5'><div className='font-mono'>01</div> Energy Mix</TabsTrigger>
              <TabsTrigger value="capacity"><div className='font-mono'>02</div> Capacity</TabsTrigger>
              <TabsTrigger value="economics"><div className='font-mono'>03</div> Economics</TabsTrigger>
              <TabsTrigger value="leaderboards"><div className='font-mono'>04</div> Leaderboards</TabsTrigger>
            </InViewFade>
            <InViewFade initialDelay={600}><Combobox values={data.countries} value={country} setValue={setCountry}/></InViewFade>        
            <div className='frame-button' onClick={() => tab === "leaderboards" ? router.push('/nuclear') : setTab(["mix", "capacity", "economics", "leaderboards"][["mix", "capacity", "economics", "leaderboards"].indexOf(tab) + 1])}>Next</div>
          </TabsList>
        
        </Tabs>     
    </div>
  )
}