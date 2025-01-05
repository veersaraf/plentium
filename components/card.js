"use client"
import React,{useState, useEffect, useRef} from 'react';
import Image from "next/image";
import {motion, useMotionValue, useTransform } from "framer-motion";
import { InViewFade } from '@/components/fade'

export const Card = ({img, className}) => {  
        const x = useMotionValue(200);
        const y = useMotionValue(200);

        const rotateX = useTransform(y, [0, 300], [3, -3]);
        const rotateY = useTransform(x, [0, 300], [-3, 3]);
    
        function handleMouse(event) {
            const rect = event.currentTarget.getBoundingClientRect();
    
            x.set(event.clientX - rect.left);
            y.set(event.clientY - rect.top);
        }

    return (  
        <InViewFade delay={600}>
            <motion.div onMouseMove={handleMouse} style={{ perspective: 400, placeItems: "center"}} className={`flex flex-wrap gap-1 items-center my-[60px] w-full md:w-[55%] lg:w-[60%] mx-auto h-auto justify-center ${className}`}>
                <motion.div className="w-2/3 h-auto" style={{rotateX, rotateY}}>
                    <Image src={img} className='w-full h-auto' alt="" />
                </motion.div>
            </motion.div>
        </InViewFade>  
    )
}
