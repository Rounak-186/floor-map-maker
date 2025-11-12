"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { DoorOpen, Flame, MousePointer2, MoveVertical, SplinePointer, Square } from 'lucide-react'

export const SideToolbar = () => {

    const [active, setActive] = useState(false);

    return (
        <div className='space-y-3 py-5 px-2 border-r-2'>
            {/* select button */}
            <Button onClick={()=>setActive(true)}>
                <MousePointer2 />
            </Button>
            {/* room */}
            <Button onClick={()=>setActive(true)}>
                <Square />
            </Button>
            {/* path */}
            <Button onClick={()=>setActive(true)}>
                <SplinePointer />
            </Button>
            {/* sensor */}
            <Button onClick={()=>setActive(true)}>
                <Flame />
            </Button>
            {/* stairs */}
            <Button onClick={()=>setActive(true)}>
                <MoveVertical />
            </Button>
            {/* Emergency exit */}
            <Button onClick={()=>setActive(true)}>
                <DoorOpen />
            </Button>
        </div>
    )
};

export default SideToolbar;
