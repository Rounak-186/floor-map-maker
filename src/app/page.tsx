"use client";
import React, { useState } from 'react'
import FloorMapCard from '@/components/floopMapCard'
import { Building2, Plus } from 'lucide-react';
import MapCreatePopup from '@/components/mapCreatePopup';
import CreateLable from '@/components/createLable';


export default function HomePage() {

  const [popup, setPopup] = useState(false)

  const maps = [
    {
      id: 1,
      name: "Jolu Building A",
      date: "1/15/2024",
      floors: 1,
    },
    {
      id: 2,
      name: "Jolu Building B",
      date: "11/12/2025",
      floors: 1,
    },
    {
      id: 3,
      name: "Jolu Building C",
      date: "11/12/2025",
      floors: 1,
    }, {
      id: 4,
      name: "Jolu Building D",
      date: "11/12/2025",
      floors: 1,
    },
  ];


  return (
    <>
      <div className='h-screen w-screen bg-gray-100'>
        <header className='bg-white border-b'>

          <div className='max-w-full py-6 px-5'>
            <div className='flex items-center gap-4'>
              <div className='bg-(--primary) text-white p-2 rounded-lg'>
                <Building2 size={30} />
              </div>
              <div>
                <h1 className='text-2xl font-bold'>Emergency Floor Map System</h1>
                <p className='text-gray-500'>Create and manage building floor maps with real-time emergency routing
                </p>
              </div>
            </div >
          </div>

        </header>
        <div className='max-w-full mx-auto px-7 py-7'>
          <div className='flex justify-between'>
            <div>
              <h1 className='text-2xl font-bold'>Your Floor Maps</h1>
              <p className='text-gray-500'>Create new maps or edit existing ones</p>
            </div>
            <button
              onClick={() => {
                setPopup(true)
              }}
              className='bg-gray-900 px-5 py-0 rounded-xl text-white font-bold flex justify-center items-center gap-2'>
              <Plus fontSize={14} /> <span className='text-sm'>
                Create New Map
              </span>
            </button>
            {popup && <MapCreatePopup onClose={() => setPopup(false)} />}
          </div>
          <div className=' mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {maps.map((map) => (
              <FloorMapCard key={map.id} map={map} />
            ))}

          </div>
          
        </div>

      </div>



    </>
  )
}
