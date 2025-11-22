"use client"
import { Dot, EllipsisVertical, Layers, Pen, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './button'
import clsx from 'clsx'
import { useCanvasData } from '@/contexts/canvasContext'
import { IdGenerator } from '@/utils/idGenerator'



export default function FloorList({ sendFloorId }: { sendFloorId: (id: string) => void }) {

    const { canvasData, setCanvasData, createFloor } = useCanvasData();
    const [activeFloor, setActiveFloor] = useState<string>(
        canvasData[0]?.floor_id || ""
    );
    const handleClick = (e: string) => {
        setActiveFloor(e);
        sendFloorId(e);
    }

    const addNewFloor = () => {
        const floornumber = canvasData.length;
        const floorName = `Floor${floornumber}`;
        const floorId = IdGenerator();
        createFloor(floorId, floorName);
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
        <div className='border-l border-gray-600 grid grid-rows-[auto_1fr]  h-[calc(100vh-100px)]'>
            <div className="border-b-2 border-(--primary) flex items-center justify-between p-6">
                <div className='flex items-center justify-center gap-4'>
                    <span><Layers size={20} /></span>
                    <h4 className='text-xl'>Floors</h4>
                </div>
                <Button variant='outline' className='px-5! py-1! hover:scale-102' onClick={() => addNewFloor()}>
                    <span className='text-sm'><Plus size={18} /></span>
                    Add
                </Button>
            </div>
            <div className='p-2 h-full overflow-y-auto'>
                {canvasData.map((floor, index) => {
                    return <FloorCard
                        floor={floor} key={index} isActive={activeFloor === floor.floor_id} onClick={() => handleClick(floor.floor_id)} />
                })}
            </div>
        </div>
    )
};

const FloorCard = ({ floor, isActive, onClick }: { floor: Record<string, any>, isActive: boolean, onClick: () => void }) => {

    const componentList = floor.componentList;
    const roomCount = componentList.filter((e: any) => e.type === "room").length;
    const sensorCount = componentList.filter((e: any) => e.type === "sensor").length;
    const { updateFloor } = useCanvasData();
    const [editFloor, setEditFloor] = useState<Boolean>(false);
    const [floorName, setFloorName] = useState(floor.floor_name);

    const handleSaveChange = () => {
        updateFloor(floor.floor_id, { floor_name: floorName });
        setEditFloor(false)
    }


    return (
        <div className={clsx(" p-4 flex items-center justify-between", "mb-2 border-2 rounded-lg border-gray-400", isActive && " bg-(--card) border-l-(--primary)! border-l-5 ")} onClick={onClick}>
            {/* floor details */}
            <div className='space-y-2'>
                <input
                    className={clsx(!editFloor && "pointer-events-none")}
                    value={floorName}
                    onChange={(e) => {
                        if (editFloor) setFloorName(e.target.value)
                    }}
                    readOnly={!editFloor}
                />                <div className="flex items-center justify-center text-sm">
                    <span>{roomCount} Rooms</span>
                    <Dot />
                    <span>{sensorCount} Sensors</span>
                </div>
            </div>
            {!editFloor && <Button variant='nav' onClick={() => setEditFloor(true)}>
                <Pen size={20} />
            </Button>}
            {editFloor && <Button onClick={() => handleSaveChange()}>
                <span className='text-sm'>Save</span>
            </Button>}
        </div>
    )
}

