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
      <div className='flex items-center justify-between w-full h-fit p-5 bg-(--card/70) border-b-3 border-(--card)'>
        {/* left side elements */}
        <div className='flex items-center justify-center gap-8'>
          {/* back button */}
          <div className=''>
            <Button variant='outline' className='rounded-full p-1!'>
              <ChevronFirst />
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
          <span className='text-(--primary)'><Save size={20} /></span>
          Save Changes
        </Button>
      </div>
      {/* main container */}
      <div className='grid grid-cols-[70px_1fr_400px] h-screen'>
        <SideToolbar />
        <div className='w-full h-full'></div>
        {/* Floor list */}
        <div className='border-l border-gray-600'>
          <div className="border-b-2 border-(--primary) flex items-center justify-between p-6">
            <div className='flex items-center justify-center gap-4'>
              <span><Layers /></span>
              <h4 className='text-xl'>Floors</h4>
            </div>
            <Button variant='outline' className='px-3! py-1! hover:scale-102'>
              <span><Plus size={20} /></span>
              Add
            </Button>
          </div>
          <div className='p-2 h-screen'>
            {mockFloorData.map((floor) => {
              return <FloorCard floor={floor} />
            })}
          </div>
        </div>
      </div>
    </>
  )
};

const FloorCard = ({ floor }: { floor: Record<string, any> }) => {
  return (
    <div className={clsx(" p-4 flex items-center justify-between bg-(--card)", "mb-2 border-l-5 rounded-lg border-(--primary) ")}>
      {/* floor details */}
      <div className='space-y-2'>
        <h3 className='text-lg'>{floor.name}</h3>
        <div className="flex items-center justify-center ">
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
