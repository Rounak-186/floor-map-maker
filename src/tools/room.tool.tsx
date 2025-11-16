import React from 'react'
import { Group, Rect, Text } from 'react-konva'

export const RoomTool = (data: any, label: string, id: string) => {

  return (
    <Group id={id}>
      <Rect
        {...data}
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
