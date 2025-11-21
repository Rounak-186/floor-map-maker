import React, { ReactNode, useRef, useState } from 'react'
import { Stage } from 'react-konva'
import DottedGridCanvas from './dottedGrid';

type ComponentType = {
  type: string,
  _id: string,
  data: {
    x: Number,
    y: Number,
    height: Number,
    width: Number,
  }
}

export default function Canvas({ children }: { children: ReactNode }) {

  const stageRef = useRef<any | null>(null);

  const [componentList, setComponentList] = useState<ComponentType[]>();
  const [newComponent, setNewComponent] = useState<ComponentType>();
  const [selectedTool, setSelectedTool] = useState<string>("select")
  const [isDrawing, setIsDrawing] = useState("false");

  return (
    <Stage
      ref={stageRef}
      height={600}
      width={300}
      style={{
        border: "1px solid var(--primary)",
        borderRadius: "10px",
        background: "#f6c3ff19"
      }}
      scale={{x:1,y:1}}
    >
      <DottedGridCanvas />
      {children}
    </Stage>
  )
}


