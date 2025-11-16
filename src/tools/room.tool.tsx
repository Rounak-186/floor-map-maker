import React from 'react'
import { Group, Rect, Text } from 'react-konva'

export const RoomTool = (data: any, label: string) => {
  return (
    <Group id="myCustomComponent">
      <Rect
        x={data.x}
        y={data.y}
        height={data.height}
        width={data.width}
        id={data.id}
      />
      <Text
        x={data.x}
        y={data.y}
        text={label}
        fontSize={18}
        fontFamily="Calibri"
        fill="#555"
        width={data.width}
        padding={20}
        align="center"
      />
    </Group>
  )
}
