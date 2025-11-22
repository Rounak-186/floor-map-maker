"use client"

import React, { useState } from 'react'
import { Group, Label, Rect, Tag, Text } from 'react-konva'

export const RoomTool = ({ data, id }: { data: any, id: string }) => {

  const [isHovered, setIsHovered] = useState<Boolean>(false)

  return (
    <Group id={id} x={data.x} y={data.y}>
      <Rect
        width={data.width}
        height={data.height}
        fill="#d1edff"
        cornerRadius={5}
        onMouseEnter={(e) => {
          const stage = e.target.getStage();
          stage!.container().style.cursor = 'pointer';
          setIsHovered(true);
        }}
        onMouseLeave={(e) => {
          const stage = e.target.getStage();
          stage!.container().style.cursor = 'default';
          setIsHovered(false)
        }}
      />
      <Text
        text={data.label}
        fontSize={14}
        fontFamily="Calibri"
        fill="#0A1A2F"
        width={data.width}
        align="center"
      />
    </Group>
  )
}
