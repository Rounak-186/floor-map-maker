import { useCanvasData } from "@/contexts/canvasContext";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
export type ToolType = "select" | "room" | "path" | "sensor" | "stair" | "";

interface TipsBoxProps {
  onClose: () => void;
}

export default function TipsBox() {
  const { activeTool } = useCanvasData();
  const [isVisible, setIsVisible] = useState<Boolean>(true);
  useEffect(() => {
    setIsVisible(true);
  }, [activeTool])
  if (!activeTool) return null;

  interface ToolTipData {
    name: string,
    instructions: string[]
  }

  const toolTips: Record<string, ToolTipData> = {
    select: {
      name: "Select",
      instructions: [
        "Click any object to select it.",
        "Drag to move the selected item.",
        "Resize handles will appear on rooms.",
      ]
    },
    room: {
      name: "Room",
      instructions: [
        "Click and drag to draw a room.",
        "Release mouse to set final size.",
        "Move or edit rooms using select tool.",
      ]
    },
    path: {
      name: "Path Tool",
      instructions: [
        "Left-Click to add points.",
        "Right-click to finish the path.",
      ]
    },
    sensor: {
      name: "Sensor",
      instructions: [
        "Click once to place a sensor.",
        "Move sensors using select tool.",
      ]
    },
    stair: {
      name: "stair",
      instructions: [
        "Click and drag to draw stair.",
        "Release mouse to place it.",
      ]
    },
    emergency: {
      name: "Emergency Exit",
      instructions: [
        "Click to mark emergency exit ways.",
        "Place exit symbols at safe evacuation points.",
        "Drag to adjust the position of the exit marker."
      ]
    }
  };



  const tips = toolTips[activeTool] || [];

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 left-25 w-80 h-40 p-5 rounded-2xl shadow-xl border bg-white z-50">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-semibold capitalize">
              {activeTool} Tool Tips
            </h2>

            <button onClick={() => setIsVisible(false)}>
              <X size={20} />
            </button>
          </div>

          <ul className="text-sm space-y-1">
            {tips.instructions.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}</>

  );
}
