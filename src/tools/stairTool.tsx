"use client"

import React, { useState } from "react";
import { Arrow, Group, Rect, Text } from "react-konva";

export const StairTool = ({ data, id }: { data: any, id: string }) => {
    const [isHovered, setIsHovered] = useState<Boolean>(false)

    return (
        <Group
            id={id}
            x={data.x}
            y={data.y}
            onMouseEnter={(e) => {
                const stage = e.target.getStage();
                stage!.container().style.cursor = 'pointer';
                setIsHovered(true);
            }}
            onMouseLeave={(e) => {
                const stage = e.target.getStage();
                stage!.container().style.cursor = 'default';
                setIsHovered(false);
            }}
        >
            <Rect
                width={data.width}
                height={data.height}
                fill="#b4ffec"
                cornerRadius={5}
            />

            <Text
                text={data?.label}
                fontSize={12}
                fontFamily="Calibri"
                fill="#0A1A2F"
                width={data.width}
                y={(data.height/2)}
                align="center"
            />
            <Arrow
                points={[15, data.height - 15, 15, 15]} // relative to the group's (0,0)
                pointerLength={7}
                pointerWidth={4}
                fill="black"
                stroke="black"
                strokeWidth={1}
            /><Arrow
                points={[15 + data.width - 30, 15, 15 + data.width - 30, data.height - 15]}   // relative to the group's (0,0)
                pointerLength={7}
                pointerWidth={4}
                fill="black"
                stroke="black"
                strokeWidth={1}
            />

        </Group>
    )
}