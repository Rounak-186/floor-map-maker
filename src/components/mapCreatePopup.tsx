"use client"
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type MapCeatePopupProps = {
  onClose: () => void;
  
}


export default function MapCreatePopup({onClose}:MapCeatePopupProps) {

    const router = useRouter();

    return (
        <>
            <div className="h-screen w-screen bg-black/30 backdrop-blur-[5px] flex justify-center items-center fixed top-0 left-0 z-50" >
                <div className="bg-white w-[460px] rounded-2xl p-6 shadow-xl relative cursor-pointer " >
                    <button
                    onClick={onClose} 
                    className="absolute right-4 top-4 text-gray-600 hover:text-gray-800 active:scale-95 cursor-pointer ">
                        <X fontSize={20} />
                    </button>
                    <h1 className="font-bold text-2xl ">Create New Floor Map</h1>
                    <p className="text-gray-700 text-sm " >Enter a name for your new building floor map. You can add floors and elements in the editor.</p>
                    <label htmlFor="" className=" font-bold">Map Name</label>
                    <input
                        type="text"
                        placeholder="e.g., Office Building A"
                        className="w-full border rounded-lg px-3 py-2 mb-6 " />
                    <div className="flex justify-end gap-3">
                        <button className="border px-4 py-1 rounded-lg hover:bg-gray-200  active:scale-95 cursor-pointer" >
                            Cancel
                        </button>

                        <button className="bg-black text-white px-5 py-1 rounded-lg hover:bg-gray-800 active:scale-95 cursor-pointer" onClick={()=>router.push("/design")}>
                            Create Map
                        </button>
                    </div>

                </div>
            </div>


        </>
    );
}
