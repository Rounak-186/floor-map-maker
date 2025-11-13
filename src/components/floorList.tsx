"use client"
import { Dot, EllipsisVertical, Layers, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import clsx from 'clsx'

export default function FloorList() {

    const [active, setActive] = useState<string>("zero");
    const handleClick = (e: string) => {
        setActive(e);
    }

    // mock floor data
    const mockFloorData: Record<string, any>[] = [
        {
            id: 1,
            key: "zero",
            name: "Ground Floor",
            roomCount: 12,
            sensorCount: 28,
        },
        {
            id: 2,
            key: "first",
            name: "First Floor",
            roomCount: 9,
            sensorCount: 21,
        },
        {
            id: 3,
            key: "second",
            name: "Second Floor",
            roomCount: 7,
            sensorCount: 17,
        },
    ];

    return (
        <div className='border-l border-gray-600'>
            <div className="border-b-2 border-(--primary) flex items-center justify-between p-6">
                <div className='flex items-center justify-center gap-4'>
                    <span><Layers size={20} /></span>
                    <h4 className='text-xl'>Floors</h4>
                </div>
                <Button variant='outline' className='px-5! py-1! hover:scale-102'>
                    <span className='text-sm'><Plus size={18} /></span>
                    Add
                </Button>
            </div>
            <div className='p-2 h-screen'>
                {mockFloorData.map((floor, index) => {
                    return <FloorCard
                        floor={floor} key={floor.key} isActive={active === floor.key} onClick={() => handleClick(floor.key)} />
                })}
            </div>
        </div>
    )
};

const FloorCard = ({ floor, isActive, onClick }: { floor: Record<string, any>, isActive: boolean, onClick: () => void }) => {
    return (
        <div className={clsx(" p-4 flex items-center justify-between", "mb-2 border-2 rounded-lg border-gray-400", isActive && " bg-(--card) border-l-(--primary)! border-l-5 ")} onClick={onClick}>
            {/* floor details */}
            <div className='space-y-2'>
                <h3 className='text-md'>{floor.name}</h3>
                <div className="flex items-center justify-center text-sm">
                    <span>{floor.roomCount} Rooms</span>
                    <Dot />
                    <span>{floor.sensorCount} Sensors</span>
                </div>
            </div>
            <Button variant='nav'>
                <EllipsisVertical size={20} />
            </Button>
        </div>
    )
}

