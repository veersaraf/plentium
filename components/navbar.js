"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { DecryptText } from './decrypt';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => { 
  const pathname = usePathname();

  return (
    <div className="fixed top-2 px-3 z-[100] w-full flex items-center justify-between h-[40px]">
      <Link href="/"><DecryptText className='navbar-box font-mono backdrop-blur-[10px] flex-1' text='Zero -> 42'/></Link>
    
      <div className="flex relative  backdrop-blur-[10px]">
        <Link href={"/energy"} className='group'>
          <DecryptText className="navbar-box" text='Energy'/>
          <div data-path={pathname} className='hidden group-hover:data-[path="/"]:md:block navbar-box left-0 absolute top-10'>Global energy mix, renewables and capacity growth, leaderboards, per capita and more.</div>
        </Link>
        <Link href={"/nuclear"} className='group'>
          <DecryptText className='navbar-box' text='Nuclear'/>
          <div data-path={pathname} className='hidden group-hover:data-[path="/"]:md:block navbar-box left-0 absolute top-10'>World's nuclear landscape, return to glory, truth about safety and recycling metrics.</div>
        </Link>
        <Link href={"/space"} className='group'>
          <DecryptText className='navbar-box' text='Space'/>
          <div data-path={pathname} className='hidden group-hover:data-[path="/"]:md:block navbar-box left-0 absolute top-10'>Global energy mix, renewables and capacity growth, leaderboards, per capita and more.</div>
        </Link>
      </div>
     
    </div>
  );
}
