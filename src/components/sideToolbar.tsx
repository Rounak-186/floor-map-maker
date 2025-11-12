"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Cpu, DoorOpen, Flame, MousePointer2, MoveVertical, SplinePointer, Square } from 'lucide-react'

export const SideToolbar = () => {

    const [active, setActive] = useState(false);

    const tools: Record<string, any>[] = [
        {
            key: "select",
            name: "Select",
            icon: <MousePointer2 size={20} />,
            event: () => { }
        },
        {
            key: "room",
            name: "Room",
            icon: <Square size={20} />,
            event: () => { }
        },
        {
            key: "path",
            name: "Path",
            icon: <SplinePointer size={20} />,
            event: () => { }
        },
        {
            key: "select",
            name: "Select",
            icon: <Cpu size={20} />,
            event: () => { }
        },
        {
            key: "select",
            name: "Select",
            icon: <MoveVertical size={20} />,
            event: () => { }
        },
        {
            key: "select",
            name: "Select",
            icon: <DoorOpen size={20} />,
            event: () => { }
        },
    ]

    return (
        <div className='space-y-3 p-5 border-r-3 border-(--card)'>
           
        </div>
    )
};

export default SideToolbar;
