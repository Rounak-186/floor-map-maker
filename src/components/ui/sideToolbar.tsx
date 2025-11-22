"use client"
import React, { useState } from 'react'
import { Button } from './button'
import { Cpu, DoorOpen, Flame, MousePointer2, MoveVertical, SplinePointer, Square } from 'lucide-react'
import clsx from 'clsx';
import { useCanvasData } from '@/contexts/canvasContext';
import { ToolType } from '../TipsBox';

export const SideToolbar = ({ onToolSelect }: { onToolSelect: (key: ToolType) => void }) => {

    const { activeTool, setActiveTool } = useCanvasData();

    const handleClick = (key: ToolType) => {
        setActiveTool(key);
        onToolSelect(key);
    }

    const tools: Record<string, any>[] = [
        {
            key: "select",
            name: "Select",
            icon: <MousePointer2 size={16} />,
        },
        {
            key: "room",
            name: "Room",
            icon: <Square size={16} />,
        },
        {
            key: "path",
            name: "Path",
            icon: <SplinePointer size={16} />,
        },
        {
            key: "sensor",
            name: "Sensors",
            icon: <Cpu size={16} />,
        },
        {
            key: "stairs",
            name: "Stairs",
            icon: <MoveVertical size={16} />,
        },
        {
            key: "emergency",
            name: "Exit",
            icon: <DoorOpen size={16} />,
        },
    ]

    return (
        <div className='flex flex-col items-center gap-2 py-5 border-r-3 border-(--card)'>
            {tools.map((tool) => {
                const isActive = tool.key === activeTool
                return (
                    <Button key={tool.key} className={clsx("flex  flex-col items-center justify-center rounded-md w-12 h-12 p-1! gap-1!")} variant={isActive ? "primary" : "nav"} onClick={() => handleClick(tool.key)}>
                        <div>{tool.icon}</div>
                        <span className="text-[10px]">{tool.name}</span>
                    </Button>
                )
            })}
        </div>
    )
};

export default SideToolbar;
