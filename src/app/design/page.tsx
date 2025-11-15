"use client"
import Canvas from '@/components/ui/canvas';
import FloorList from '@/components/ui/floorList';
import SideToolbar from '@/components/ui/sideToolbar'
import { Button } from '@/components/ui/button'
import clsx from 'clsx';
import { ChevronFirst, Dot, EllipsisVertical, Layers, Plus, Save } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import canvasDataContext, { useCanvasData } from '@/contexts/canvasContext';

export default function DesignMap() {

  const [selectedTool, setSelectedTool] = useState("");

  const {canvasData, setCanvasData} = useCanvasData();

  useEffect(()=>{
    setCanvasData([{hello:"world"}]);
  }, [])

  console.log(canvasData);
  

  return (
    <>
      {/* top bar */}
      <div className='flex items-center justify-between w-full h-fit p-5 bg-(--card/70) border-b-3 border-(--card)'>
        {/* left side elements */}
        <div className='flex items-center justify-center gap-8'>
          {/* back button */}
          <div className=''>
            <Button variant='outline' className='rounded-full p-1!'>
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
        <SideToolbar onToolSelect={(key) => setSelectedTool(key)} />
        <div className='w-full h-full flex items-center justify-center'>
          <Canvas>
            <div></div>
          </Canvas>
        </div>
        {/* Floor list */}
        <FloorList />
      </div>
    </>
  )
};

// floor_id ,componentId, data