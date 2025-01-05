"use client"
import React, { useRef,useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TextRevealWipe } from '@/components/swipe';
import { InViewFade } from '@/components/fade'
import { Card } from '@/components/card';
import useSWR from 'swr'

import { NuclearMix } from '@/components/energy-cards/nuclear-mix';
import { NuclearCapacities } from '@/components/energy-cards/nuclear-capacity';
import { NuclearReactors } from '@/components/energy-cards/nuclear-units';
import { NuclearSafety }  from '@/components/energy-cards/nuclear-safety';
import { NuclearWasteTypes } from '@/components/energy-cards/nuclear-waste-types';
import { NuclearWaste } from '@/components/energy-cards/nuclear-waste';
import pic from '@/assests/images/d.png'


export default function Home() {
  const router = useRouter()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  
  const { data, error, isLoading } = useSWR('/api/energy', fetcher)
  const [tab, setTab] = useState('home');

  if (error) return <div className='loading-page'>Error</div>
  if (isLoading) return <div className='loading-page'>Loading data...</div>

  return (
    <div className='main'>
        <Tabs defaultValue="home" className='frame' onValueChange={setTab} value={tab}>

          <TabsContent value="home">
              <Card img={pic}/>
              <InViewFade delay={500} className='flex-1 absolute bottom-4 pr-3'>
                <TextRevealWipe className='title'>Nuclear Seeks</TextRevealWipe>
                <TextRevealWipe delay={1.2} className='title'>Vengeance</TextRevealWipe>
                <div className='description'>World's nuclear landscape, reactors, pipeline capacity and the bright side of nuclear waste recycling and safety.</div>
              </InViewFade>
          </TabsContent>

          <TabsContent value="gen">
                <Accordion className='my-10' type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Nuclear energy remains unparalleled in its ability to deliver <span className='acc-span'>continuous, reliable, and low-carbon power on a large scale</span>. France and South Korea's <span className='acc-span'>decades-long use</span> of nuclear energy, with <span className='acc-span'>minimal incidents</span> and advancements in <span className='acc-span'>fuel recycling</span> and waste management, underscores its safety and sustainability</AccordionTrigger>
                    <AccordionContent>
                      China's <span className='acc-span'>rapid expansion</span> in nuclear generation serves as a critical wake-up call for an increasingly energy-hungry world. It highlights the urgent need to <span className='acc-span'>accelerate nuclear programs</span> and counteract the decades of setbacks caused by <span className='acc-span'>unfounded nuclear fearmongering</span>.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <InViewFade className='my-10'><NuclearMix className="bg-[--secondary-chart-bg]" data={data.mix}/></InViewFade>
          </TabsContent>

          <TabsContent value="capacity">
                <Accordion className='my-10' type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger icon={false}>Nuclear energy requires <span className="acc-span">far less land than wind or solar farms</span>, preserving natural habitats. Modern reactors are <span className="acc-span">safer than ever</span>, and advancements in <span className="acc-span">nuclear waste recycling</span> reduce long-term storage concerns.</AccordionTrigger>
                  </AccordionItem>
                </Accordion>

                <InViewFade className='my-10'><NuclearCapacities className="bg-[--secondary-chart-bg]" data={data.nuclearYear}/></InViewFade>
                  
                <Accordion className='my-10' type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger><span className='acc-span'>China and India</span> are leading the way in nuclear expansion, with a significant number of reactors <span className='acc-span'>under construction</span>. <span className='acc-span'>China's</span> streamlined reactor design, <span className='acc-span'>absence of legal barriers,</span> and <span className='acc-span'>minimal public opposition</span> have enabled it to rapidly grow its capacity, which is poised to <span className='acc-span'>surpass</span> that of the United States</AccordionTrigger>
                      <AccordionContent>
                        In contrast, many developed nations are hampered by <span className='acc-span'>restrictive regulations</span>, <span className='acc-span'>risk aversion</span>, and <span className='acc-span'>outdated policies</span> that stifle nuclear development. Addressing these challenges through <span className='acc-span'>better public education</span> on nuclear energy's safety and benefits, coupled with <span className='acc-span'>economic incentives</span> and reduced regulatory hurdles, is critical to meeting the surging demand for <span className='acc-span'>reliable, clean energy</span>. 
                      </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <InViewFade className='my-10'><NuclearReactors className="bg-[--secondary-chart-bg]" data={data.nuclearReactors} data2={data.nuclearYear} /></InViewFade>
          </TabsContent>

          <TabsContent value="safety">
                <Accordion className='my-10' type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Nuclear energy remains the <span className='acc-span'>safest and cleanest energy source</span> humanity has ever harnessed, even when accounting for <span className='acc-span'>rare incidents</span> like Chernobyl</AccordionTrigger>
                    <AccordionContent>
                      France's adoption of nuclear power has driven <span className='acc-span'>significant economic growth</span> and <span className='acc-span'>reduced carbon emissions</span>. It has powered <span className='acc-span'>industrial expansion</span>, ensured <span className='acc-span'>stable and low-cost electricity</span>, and contributed to making France's <span className='acc-span'>per capita CO₂ emissions among the lowest</span> in the developed world.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <InViewFade className='my-10'><NuclearSafety className="bg-[--secondary-chart-bg]" data={data.safety} /></InViewFade>
          </TabsContent>

          <TabsContent value="waste">
                <Accordion className='my-10' type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Nuclear waste is <span className='acc-span'>highly recyclable, with spent fuel containing up to 90% of its energy potential</span>. Countries like France, Russia, and Japan have been reprocessing nuclear waste for years. While the technology already exists, it needs to be broadly <span className='acc-span'>scaled up</span> to be more impactful</AccordionTrigger>
                      <AccordionContent>
                          The current U.S. stockpile of used nuclear fuel conatins <span className='acc-span'>enough energy to power the nation for 200 years</span>. The untapped potential of nuclear recycling can enhance energy security and global sustainability.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                <InViewFade className='my-10'><NuclearWaste className="bg-[--secondary-chart-bg]" data={data.nuclearWaste}/></InViewFade>          
                
                <Accordion className='my-10' type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger icon={false}>The myth that nuclear waste is an insurmountable problem is exaggerated. <span className='acc-span'>Only a small fraction (3%) of waste </span>, is required to either be <span className='acc-span'>recycled</span> or disposed off into long-term isolation in well-managed geological repositories <span className='acc-span'>isolated from human contact and the environment</span>. The total volume of waste globally is <span className='acc-span'>minimal</span> compared to waste from fossil fuels.</AccordionTrigger>
                    </AccordionItem>
                </Accordion>

                <InViewFade className='my-10'><NuclearWasteTypes className="bg-[--secondary-chart-bg]"/></InViewFade>
          </TabsContent>

          <TabsList>
            <InViewFade initialDelay={600} className='flex-1 overflow-auto h-[80px] md:h-[calc(100%-127px)]'>
              <h1 className='tag mt-2' onClick={() => setTab('home')}><div className='tag-box' />SUB-TOPICS</h1>
              <TabsTrigger value="gen" className='mt-5'><div className='font-mono'>01</div> Generation</TabsTrigger>
              <TabsTrigger value="capacity"><div className='font-mono'>02</div> Capacity</TabsTrigger>
              <TabsTrigger value="safety"><div className='font-mono'>03</div> Safety</TabsTrigger>
              <TabsTrigger value="waste"><div className='font-mono'>04</div> Waste</TabsTrigger>
            </InViewFade>
            <div className='frame-button md:absolute bottom-0' onClick={() => tab === "waste" ? router.push('/space') : setTab(["gen", "capacity", "safety", "waste"][["gen", "capacity", "safety", "waste"].indexOf(tab) + 1])}>Next</div>
          </TabsList>
        
        </Tabs>     
    </div>
  )
}