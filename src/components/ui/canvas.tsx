import React, { ReactNode, useRef, useState } from 'react'
import { Stage } from 'react-konva'

type ComponentType = {
  type:string,
  _id:string,
  data:{
    x:Number,
    y:Number,
    height:Number,
    width:Number,
  }
}

export default function Canvas() {

  const stageRef = useRef<any | null>(null);
 
  const [componentList,setComponentList] = useState<ComponentType[]>();
  const [newComponent, setNewComponent] = useState<ComponentType>();
  const [selectedTool,setSelectedTool] = useState<string>("select")
  const [isDrawing, setIsDrawing] = useState("false");

  return (
    <Stage
      ref={stageRef}
    >
      
    </Stage>
  )
}


