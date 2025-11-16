import React from 'react'
import { Rect, Text } from 'react-konva'

export const RoomTool = (data:any,label:string) => {
  return (
    <>
      <Rect 
        x={data.x}
        y={data.y}
        height={data.height}
        width={data.width}
        id={data.id}
      />
      <Text />
    </>
  )
}
