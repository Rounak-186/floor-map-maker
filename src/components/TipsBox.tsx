import { X } from "lucide-react";
export type ToolType = "select" | "room" | "path" | "sensor" | "stairs" | "";
// type ToolType = "select" | "room" | "path" | "sensor" | "stairs" | "";

interface TipsBoxProps {
  selectedTool: ToolType;
  onClose: () => void;
}

export default function TipsBox({ selectedTool, onClose }: TipsBoxProps) {
  if (!selectedTool) return null;

  const toolTips: Record<ToolType, string[]> = {
    select: [
      "Click any object to select it.",
      "Drag to move the selected item.",
      "Resize handles will appear on rooms.",
    ],
    room: [
      "Click and drag to draw a room.",
      "Release mouse to set final size.",
      "Move or edit rooms using select tool.",
    ],
    path: [
      "Click to add points.",
      "Double-click to finish the path.",
    ],
    sensor: [
      "Click once to place a sensor.",
      "Move sensors using select tool.",
    ],
    stairs: [
      "Click and drag to draw stairs.",
      "Release mouse to place it.",
    ],
    "": [], // required to satisfy TypeScript
  };

  const tips = toolTips[selectedTool] || [];

  return (
    <div className="fixed bottom-6 left-15 w-80 p-5 rounded-2xl shadow-xl border bg-white z-50">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-semibold capitalize">
          {selectedTool} Tool Tips
        </h2>

        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <ul className="text-sm space-y-1">
        {tips.map((tip, i) => (
          <li key={i}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
}
