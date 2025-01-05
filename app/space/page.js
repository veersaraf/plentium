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

import { SpaceLaunches } from '@/components/space-cards/country-launches';
import { RocketLaunches } from '@/components/space-cards/rocket-laucnhes';
import { RocketCosts } from '@/components/space-cards/rocket-costs';
import { StarlinkSats } from '@/components/space-cards/starlink-sats';
import { StarlinkSubs } from '@/components/space-cards/starlink-subs';
import pic from '@/assests/images/a.png'

export default function Home() {
  const router = useRouter()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  
  const { data, error, isLoading } = useSWR('/api/space', fetcher)
  const [tab, setTab] = useState('home');

  if (error) return <div className='loading-page'>Error</div>
  if (isLoading) return <div className='loading-page'>Loading data...</div>

  return (
    <div className='main'>
        <Tabs defaultValue="home" className='frame' onValueChange={setTab} value={tab}>

          <TabsContent value="home">
              <Card img={pic}/>
              <InViewFade delay={500} className='flex-1 absolute bottom-3 pr-3'>
                <TextRevealWipe className='title'>The Space</TextRevealWipe>
                <TextRevealWipe delay={1.2} className='title'>Renaissance</TextRevealWipe>
                <div className='description'>Historical space launch data, private orbital service providers and their launch costs, and the impact of starlink.</div>
              </InViewFade>
          </TabsContent>

          <TabsContent value="launch">
                <Accordion className='my-10' type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger>SpaceX's Falcon 9 have been transformative in the growth of orbital launches for the U.S. <span className='acc-span'>making space more accessible and affordable</span>. Falcon 9s reusability has dramatically reduced launch can making <span className='acc-span'>traditional expendable rockets look antique</span></AccordionTrigger>
                    <AccordionContent>
                        SpaceX's <span className='acc-span'>rapid turnaround times and streamlined operations</span> has bolstered confidence in U.S. launch capabilities and allowed it to perform more annual launches than any other nation leading to <span className='acc-span'>F9s dominance in the global launch market</span>.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            
                <InViewFade initialDelay={600} className='my-10'><SpaceLaunches className='bg-[--tertiary-chart-bg]' data={data.country} /></InViewFade>

                <Accordion className='my-10' type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger icon={false}>Falcon 9's cost efficiency has encouraged a surge in commercial satellite deployments, government and international customers and SpaceX’s Starlink constellation has contributed significantly to the overall number of launches.</AccordionTrigger>
                    </AccordionItem>
                </Accordion>

                <InViewFade initialDelay={600} className='my-10'><RocketLaunches className='bg-[--tertiary-chart-bg]' data={data.rocket} /></InViewFade>
          </TabsContent>

          <TabsContent value="cost">
                <Accordion className='my-10' type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger icon={false}>SpaceX’s <span className='acc-span'>rapidly and fully reusable</span> Starship is poised to <span className='acc-span'>revolutionize space exploration</span> and foster new off-planet industries. Starship’s <span className='acc-span'>interplanetary capabilities</span> make it the centerpiece of plans for <span className='acc-span'>human settlement on Mars</span>, with the ability to transport up to 100 passengers and refuel in orbit for <span className='acc-span'>interplanetary missions</span>. It will accelerate the deployment of the <span className='acc-span'>Starlink mega-constellation</span>, deliver large telescopes and probes, and enable the construction of <span className='acc-span'>space-based infrastructure</span> like stations and asteroid mining facilities.</AccordionTrigger>
                    </AccordionItem>
                </Accordion>

                <InViewFade initialDelay={600} className='my-10'><RocketCosts className='bg-[--tertiary-chart-bg]' data={data.cost}/></InViewFade>
                
                <Accordion className='my-10' type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger icon={false}>Beyond space, Starship’s <span className='acc-span'>suborbital capabilities</span> promise to <span className='acc-span'>revolutionize Earth-based travel</span>, offering the potential for <span className='acc-span'>global journeys in under an hour</span>. By making space more <span className='acc-span'>accessible and economically viable</span>, Starship represents a <span className='acc-span'>transformative leap</span>, shifting humanity’s role from explorers of space to active participants in its <span className='acc-span'>development and habitation</span>.</AccordionTrigger>
                    </AccordionItem>
                </Accordion>
          </TabsContent>

          <TabsContent value="starlink">
                <Accordion className='my-10' type="single" collapsible>
                      <AccordionItem value="item-1">
                      <AccordionTrigger icon={false}>SpaceX's <span className='acc-span'>Starlink</span> is redefining <span className='acc-span'>global connectivity</span> by creating a vast network of <span className='acc-span'>low Earth orbit (LEO) satellites</span> that deliver <span className='acc-span'>high-speed, low-latency internet</span> to even the most <span className='acc-span'>remote regions of the planet</span>. Starlink has been the <span className='acc-span'>back-bone of the Ukrainian military</span> since the Russian invasion. Several cruise lines and airlines, including <span className='acc-span'>Royal Caribbean, Qatar Airways, United, Air France</span>, are rapidly adopting Starlink for high-speed internet <span className='acc-span'>at sea and in-flight</span> with over <span className='acc-span'>2,500 aircraft on contract</span>.</AccordionTrigger>
                      </AccordionItem>
                  </Accordion>

                <InViewFade initialDelay={600} className='my-10'><StarlinkSats data={data.starlink["Satellites"]}/></InViewFade>
                
                <Accordion className='my-10' type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger icon={false}>Starlink is available in <span className='acc-span'>113 countries</span> and accounts for <span className='acc-span'>{">"}50% of all active orbital satellites</span>. With the <span className='acc-span'>Plug-and-Play design</span> of Starlink kits, users need <span className='acc-span'>minimal technical expertise</span>, allowing households, businesses, and governments to <span className='acc-span'>activate the service immediately</span> or easily ship to <span className='acc-span'>disaster zones or war-torn areas</span> and be <span className='acc-span'>operational within hours</span>.</AccordionTrigger>
                    </AccordionItem>
                </Accordion>

                <InViewFade initialDelay={600} className='my-10'><StarlinkSubs data={data.starlink["Subscribers"]}/></InViewFade>
          </TabsContent>

          <TabsList>
            <InViewFade initialDelay={600} className='flex-1 overflow-auto h-[80px] md:h-[calc(100%-127px)]'>
              <h1 className='tag mt-2' onClick={() => setTab('home')}><div className='tag-box' />SUB-TOPICS</h1>
              <TabsTrigger value="launch" className='mt-5'><div className='font-mono'>01</div> Launches</TabsTrigger>
              <TabsTrigger value="cost"><div className='font-mono'>02</div> Costs</TabsTrigger>
              <TabsTrigger value="starlink"><div className='font-mono'>03</div> Starlink</TabsTrigger>
            </InViewFade>
            <div className='frame-button md:absolute bottom-0' onClick={() => tab === "starlink" ? router.push('/') : setTab(["launch", "cost", "starlink"][["launch", "cost", "starlink"].indexOf(tab) + 1])}>Next</div>
          </TabsList>
        
        </Tabs>     
    </div>
  )
}