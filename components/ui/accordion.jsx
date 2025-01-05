"use client"
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { InViewFade } from '@/components/fade'
import { TextRevealWipe } from "@/components/swipe"
import { cn } from "@/lib/utils"



const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, icon=true, ...props }, ref) => (
  <InViewFade initialDelay={200}>
    <TextRevealWipe threshold={0.2} delay={0.15}>
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            "text-[--secondary-text] text-left my-5 text-[17px] sm:text-[20px] px-1 font-a1 h-fit leading-8 w-full transition-all [&[data-state=open]>svg]:rotate-180",
            className
          )}
          {...props}>
            {children}
            {icon && <ChevronDown className="h-3.5 mx-2 inline-flex w-3.5"/>}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextRevealWipe>
  </InViewFade>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-[#aaaaaa] text-[17px] sm:text-[20px] px-1 font-a1 h-fit leading-8 w-full data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
