"use client"
import { motion } from 'framer-motion';
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { ScanText, ListEnd, TimerReset } from 'lucide-react';
import Link from 'next/link';

export const Menu = ({sources = []}) => {

    return (
        <Popover>
            <PopoverTrigger className='text-[--secondary-text] mt-3 ml-3 rounded-[10px] w-fit px-1 py-1'><motion.div whileTap={{scale:0.95}}><ScanText size={21} /></motion.div></PopoverTrigger>
            <PopoverContent className="bg-[--primary-text] p-2 rounded-[8px] w-[250px]">
                <div className='border border-[--secondary-border] flex gap-3 rounded-[8px] p-2'>
                    <div className='flex gap-2'><ListEnd size={17}/>Sources</div>
                    <div className='w-full flex-col  flex gap-1 break-all'>
                       {Object.keys(sources).map((title,i) => <Link href={sources[title]} className='hover:underline' target="_blank" key={i}>{title}</Link>)}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )   
}