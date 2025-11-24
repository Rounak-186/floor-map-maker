"use client"
import Canvas from '@/components/ui/canvas';
import FloorList from '@/components/ui/floorList';
import SideToolbar from '@/components/ui/sideToolbar'
import { Button } from '@/components/ui/button'
import { ChevronFirst, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useCanvasData } from '@/contexts/canvasContext';
import { RoomTool } from '@/tools/room.tool';
import { Layer } from 'react-konva';
import { PathTool } from '@/tools/pathTool';
import { StairTool } from '@/tools/stairTool';
import { SensorTool } from '@/tools/sensorTool';
import { useRouter } from 'next/navigation';
import CreateLabel from '@/components/ui/createLabel';
import TipsBox from '@/components/ui/TipsBox';
import type { ToolType } from "@/components/ui/TipsBox";


export default function DesignMap() {

  const { canvasData, setCanvasData } = useCanvasData();
  const [floorId, setFloorId] = useState<string>((
    canvasData[0]?.floor_id || ""
  ));
  const router = useRouter();


  return (
    <>
      {/* top bar */}
      <div className='flex items-center justify-between w-full h-fit p-5 bg-(--card/70) border-b-3 border-(--card)'>
        {/* left side elements */}
        <div className='flex items-center justify-center gap-8'>
          {/* back button */}
          <div className=''>
            <Button variant='outline' className='rounded-full p-1!' onClick={() => router.push("/")}>
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
      <div className='grid grid-cols-[80px_1fr_300px] h-[calc(100vh-100px)]'>
        <SideToolbar />
        <div className='flex justify-center items-center' style={{ transform: "none !important" }} >
          <Canvas floor_id={floorId}>
          </Canvas>
          <TipsBox />


          <div className="absolute bottom-4 right-2 z-50">
            <CreateLabel />
          </div>
        </div>
        {/* Floor list */}
        <FloorList sendFloorId={setFloorId} />
      </div>
    </>
  )
};

// floor_id ,componentId, data