"use client"
import Canvas from '@/components/ui/canvas';
import FloorList from '@/components/ui/floorList';
import SideToolbar from '@/components/ui/sideToolbar'
import { Button } from '@/components/ui/button'
import clsx from 'clsx';
import { ChevronFirst, Dot, EllipsisVertical, Layers, Plus, Save } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import canvasDataContext, { useCanvasData } from '@/contexts/canvasContext';
import { RoomTool } from '@/tools/room.tool';
import { Layer } from 'react-konva';
import { PathTool } from '@/tools/pathTool';
import { StairTool } from '@/tools/stairTool';
import { SensorTool } from '@/tools/sensorTool';
import { useRouter } from 'next/navigation';
import CreateLable from '@/components/createLable';
import TipsBox from '@/components/TipsBox';
import type { ToolType } from "@/components/TipsBox";


export default function DesignMap() {


const [selectedTool, setSelectedTool] = useState<ToolType>("");


  const { canvasData, setCanvasData } = useCanvasData();

  useEffect(() => {
    setCanvasData([{ hello: "world" }]);
  }, [])

  console.log(canvasData);

  const router = useRouter();


  return (
    <>
      {/* top bar */}
      <div className='flex items-center justify-between w-full h-fit p-5 bg-(--card/70) border-b-3 border-(--card)'>
        {/* left side elements */}
        <div className='flex items-center justify-center gap-8'>
          {/* back button */}
          <div className=''>
            <Button variant='outline' className='rounded-full p-1!' onClick={()=>router.push("/")}>
              <ChevronFirst size={20} />
            </Button>
          </div>
          {/* Map Name */}
          <div>
            <h2 className="text-2xl text-semibold">Example Map</h2>
            <p className='text-md text-gray-600'>Floor Map Editor</p>
          </div>
        </div>
        {/* right side elements */}
        <Button variant='outline'>
          <span className='text-(--primary)'><Save size={18} /></span>
          Save Changes
        </Button>
      </div>
      {/* main container */}
      <div className='grid grid-cols-[80px_1fr_300px] h-[calc(100vh-100px)] '>
        <SideToolbar onToolSelect={(key:ToolType) => setSelectedTool(key)} />
        <div className='flex justify-center items-center relative' style={{ transform: "none !important" }} >
          <Canvas>
            <Layer>
              <RoomTool id="abc" data={{ x: 20, y: 50, height: 30, width: 80, label: "Room1" }} />
              <RoomTool id="abc" data={{ x: 180, y: 60, height: 40, width: 60, label: "Room1" }} />
              <StairTool data={{ x: 100, y: 200, height: 50, width: 80, label: "Satirs1" }} id="def" />
              <SensorTool data={{ x: 100, y: 300, label: "Sensor1" }} id='xyz' />
              <PathTool path={[{ v1: { x: 90, y: 200 }, v2: { x: 90, y: 250 } }, { v1: { x: 140, y: 200 }, v2: { x: 200, y: 300 } }]} id={"pqrs"} />


            </Layer>

          </Canvas>
 <TipsBox
  selectedTool={selectedTool}
  onClose={() => setSelectedTool("")}
/>


            <div className="absolute bottom-4 right-4 z-50">
    <CreateLable />
  </div>
        </div>
        {/* Floor list */}
        <FloorList />
      </div>
    </>
  )
};

// floor_id ,componentId, data