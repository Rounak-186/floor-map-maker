"use client"

import React, { useState } from 'react'
import { Circle, Group, Label, Rect, Tag, Text } from 'react-konva'

export const SensorTool = ({ data, id }: { data: any, id: string }) => {

    return (
        <Group
            id={id}
            x={data.x}
            y={data.y}
            onMouseEnter={(e) => {
                const stage = e.target.getStage();
                stage!.container().style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
                const stage = e.target.getStage();
                stage!.container().style.cursor = 'default';
            }}>
            <Circle
                radius={5}
                stroke="red"
                strokeWidth={5}
            />
            <Text
                text={data.label}
                fontSize={14}
                fontFamily="Calibri"
                fill="#0A1A2F"
                width={50}
                y={-22}
                align="center"
            />
        </Group>
    )
}
