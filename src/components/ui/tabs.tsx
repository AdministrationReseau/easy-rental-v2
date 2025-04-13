"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={`
      inline-flex
      h-12
      items-center
      justify-between
      rounded-lg
      bg-gray-100
      p-1
      w-full
      ${className}
    `}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={`
            inline-flex
            items-center
            justify-center
            whitespace-nowrap
            rounded-md
            px-3
            py-2
            text-sm
            font-medium
            ring-offset-white
            transition-all
            data-[state=active]:text-primary
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-offset-2
            disabled:pointer-events-none
            disabled:opacity-50
            data-[state=active]:bg-white
            data-[state=active]:text-primary-blue
            data-[state=active]:border-primary-blue
            data-[state=active]:border-2
            data-[state=active]:shadow-md
            data-[state=inactive]:bg-transparent
            data-[state=inactive]:text-gray-500
            data-[state=inactive]:hover:bg-gray-200
            data-[state=inactive]:hover:text-gray-900
            ${className}
    `}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={`
      mt-2
      ring-offset-white
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-offset-2
      ${className}
    `}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
