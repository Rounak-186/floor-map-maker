import SideToolbar from '@/components/sideToolbar'
import { Button } from '@/components/ui/button'
import clsx from 'clsx';
import { ChevronFirst, Dot, EllipsisVertical, Layers, Plus, Save } from 'lucide-react'
import React from 'react'

export default function DesignMap() {

  // mock floor data
  const mockFloorData: Record<string, any>[] = [
    {
      id: 1,
      name: "Ground Floor",
      roomCount: 12,
      sensorCount: 28,
    },
    {
      id: 2,
      name: "First Floor",
      roomCount: 9,
      sensorCount: 21,
    },
    {
      id: 3,
      name: "Second Floor",
      roomCount: 7,
      sensorCount: 17,
    },
  ];

  return (
    <>
      {/* top bar */}
      <div className='flex items-center justify-between w-full h-fit p-5 bg-[var(--background)] border-b-2 '>
        {/* left side elements */}
        <div className='flex items-center justify-center gap-8'>
          {/* back button */}
          <div className='border-r-3 border-gray-300 pr-5'>
            <ChevronFirst />
          </div>
          {/* Map Name */}
          <div>
            <h2 className="text-2xl">Example Map</h2>
            <p className='text-lg text-gray-600'>Floor Map Editor</p>
          </div>
        </div>
        {/* right side elements */}
        <Button variant='outline'>
          <span><Save /></span>
          Save Changes
        </Button>
      </div>
      {/* main container */}
      <div className='grid grid-cols-[70px_1fr_300px] h-screen'>
        <SideToolbar />
        <div className='w-full h-full'></div>
        {/* Floor list */}
        <div className='border-l-2'>
          <div className="border-b-2 flex items-center justify-between p-6">
            <div className='flex items-center justify-center'>
              <span><Layers /></span>
              <h4>Floors</h4>
            </div>
            <Button variant='outline'>
              <span><Plus /></span>
              Add
            </Button>
          </div>
          {mockFloorData.map((floor) => {
            return <FloorCard floor={floor} />
          })}
        </div>
      </div>
    </>
  )
};

const FloorCard = ({ floor }: { floor: Record<string, any> }) => {
  return (
    <div className={clsx(" p-4 flex items-center justify-center bg-[var(--card)]","mb-2 border-l-3 border-[var(--primary)] ")}>
      {/* floor details */}
      <div className='space-y-2'>
        <h3>{floor.name}</h3>
        <div className="flex items-center justify-center ">
          <span>{floor.roomCount} Rooms</span>
          <Dot />
          <span>{floor.sensorCount} Sensors</span>
        </div>
      </div>
      <Button>
        <EllipsisVertical />
      </Button>
    </div>
  )
}
