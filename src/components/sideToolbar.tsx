"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Cpu, DoorOpen, Flame, MousePointer2, MoveVertical, SplinePointer, Square } from 'lucide-react'
import clsx from 'clsx';

export const SideToolbar = () => {

    const [active, setActive] = useState<string>("select");

    const handleClick = (e: string) => {
        setActive(e);
    }

    const tools: Record<string, any>[] = [
        {
            key: "select",
            name: "Select",
            icon: <MousePointer2 size={16} />,
            event: () => { }
        },
        {
            key: "room",
            name: "Room",
            icon: <Square size={16} />,
            event: () => { }
        },
        {
            key: "path",
            name: "Path",
            icon: <SplinePointer size={16} />,
            event: () => { }
        },
        {
            key: "sensor",
            name: "Sensors",
            icon: <Cpu size={16} />,
            event: () => { }
        },
        {
            key: "stairs",
            name: "Stairs",
            icon: <MoveVertical size={16} />,
            event: () => { }
        },
        {
            key: "emergency",
            name: "Exit",
            icon: <DoorOpen size={16} />,
            event: () => { }
        },
    ]

    return (
        <div className='space-y-3 p-5 border-r-3 border-(--card)'>
            {tools.map((tool) => {
                const isActive = tool.key === active
                return (
                    <Button key={tool.key} className={clsx("flex flex-col items-center justify-center rounded-md w-12 h-12 p-0!")} variant={isActive ? "primary" : "nav"} onClick={() => handleClick(tool.key)}>
                        {tool.icon}
                        <span className="text-[10px]">{tool.name}</span>
                    </Button>
                )
            })}
        </div>
    )
};

export default SideToolbar;
