import { Calendar, NotebookText } from "lucide-react";
import React from "react";


interface FloorMapCardProps {
  map: {
    id: number;
    name: string;
    date: string;
    floors: number;
  };
  
}

export default function FloorMapCard({ map,  }: FloorMapCardProps) {
  return (
    <div className="bg-white border rounded-2xl p-5 hover:scale-105 cursor-pointer shadow-sm hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-(--primary) text-white p-2 rounded-xl">
          <NotebookText />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{map.name}</h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar size={14} />
            <span>{map.date}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-gray-600 text-sm">{map.floors} floor</div>
       <button className="mt-3 text-(--primary) font-medium hover:underline">
        Edit →
       </button>
      </div>
    </div>
  );
}