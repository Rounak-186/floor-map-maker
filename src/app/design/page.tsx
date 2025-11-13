import FloorList from '@/components/floorList';
import SideToolbar from '@/components/sideToolbar'
import { Button } from '@/components/ui/button'
import clsx from 'clsx';
import { ChevronFirst, Dot, EllipsisVertical, Layers, Plus, Save } from 'lucide-react'
import React from 'react'

export default function DesignMap() {

  

  return (
    <>
      {/* top bar */}
      <div className='flex items-center justify-between w-full h-fit p-5 bg-(--card/70) border-b-3 border-(--card)'>
        {/* left side elements */}
        <div className='flex items-center justify-center gap-8'>
          {/* back button */}
          <div className=''>
            <Button variant='outline' className='rounded-full p-1!'>
              <ChevronFirst size={20}/>
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
      <div className='grid grid-cols-[80px_1fr_300px] h-screen'>
        <SideToolbar />
        <div className='w-full h-full'></div>
        {/* Floor list */}
        <FloorList/>
      </div>
    </>
  )
};

