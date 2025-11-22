import { X } from 'lucide-react'
import React from 'react'

export default function CreateLable() {
    return (
        <>
            <div className="  rounded-2xl px-6 pt-6 pb-3 shadow-xl relative cursor-pointer bg-(--primary)/15 backdrop-blur-[5px] ">
                <button
                    className="absolute right-4 top-4 text-gray-600 hover:text-gray-800 active:scale-95 cursor-pointer ">
                    <X fontSize={20} />
                </button>
                <p className='text-(--primary) font-bold mb-1'>Tools Setting:</p>
                <div className="flex flex-col mb-9">
                    <label htmlFor="text" className="hidden">
                        Label
                    </label>
                    <input
                        type="text"

                        placeholder="Label"
                        className=" mt-2 py-1 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-(--primary) focus:outline-none"
                    />
                </div>
                <div className='flex justify-center items-center mt-4 gap-1'>
                    <button className='bg-green-600 w-1/2 px-3 py-2 rounded-xl text-sm text-white font-bold cursor-pointer'>SAVE</button>
                    <button className='bg-red-600 w-1/2 px-2 py-2 rounded-xl text-sm text-white font-bold cursor-pointer'>DELETE</button>
                </div>




            </div>
        </>
    )
}
