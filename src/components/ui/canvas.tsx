"use client"
import React, { ReactNode, useRef, useState } from 'react'
import { Layer, Stage } from 'react-konva'
import DottedGridCanvas from './dottedGrid';
import { useCanvasData } from '@/contexts/canvasContext';
import { IdGenerator } from '@/utils/idGenerator';
import { RoomTool } from '@/tools/room.tool';
import { StairTool } from '@/tools/stairTool';

type ComponentType = {
  type: string,
  id: string,
  path?: any[],
  data: {
    x: number,
    y: number,
    height: number,
    width: number,
  }
}

export default function Canvas({ children, floor_id = IdGenerator() }: { children?: ReactNode, floor_id?: string }) {

  const { activeTool, setActiveTool, canvasData, setCanvasData, createComponent } = useCanvasData();
  const [newComponent, setNewComponent] = useState<ComponentType | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef<any | null>(null);

  let floorlist = canvasData;
  const floorIndex = floorlist.findIndex((f: any) => f.floor_id === floor_id);
  if (floorIndex === -1) return;

  let floor = floorlist[floorIndex];
  console.log("Floor : ", floor)
  const componentList = floor.componentList
  console.log("componentList : ", componentList)

  const renderComponent: Record<string, (id: string, data: any) => ReactNode> = {
    room: (id, data) => <RoomTool id={id} data={data} />,
    stairs: (id, data) => <StairTool id={id} data={data} />
  }

  // const handleMouseDown = () => {
  //   const stage = stageRef.current;
  //   if (stage) {
  //     const pointerPosition = stage.getPointerPosition();
  //     if (pointerPosition) {
  //       const { x, y } = pointerPosition;
  //       const data = {
  //         x: x,
  //         y: y,
  //         height: 0,
  //         width: 0,
  //       };
  //       const comp_id = IdGenerator();
  //       setNewComponent({ data: data, type: "room", _id: comp_id });
  //       setIsDrawing(true);
  //     }
  //   }
  // };

  // const handleMouseMove = () => {
  //   if (!newComponent || !isDrawing) return;
  //   const stage = stageRef.current;
  //   if (stage) {
  //     const pointerPosition = stage.getPointerPosition();
  //     if (pointerPosition) {
  //       const { x, y } = pointerPosition;
  //       const data = {
  //         x: x,
  //         y: y,
  //         height: 0,
  //         width: 0,
  //       };
  //       const comp_id = IdGenerator();
  //       setNewComponent({
  //         ...newComponent,
  //         data: {
  //           ...newComponent.data,
  //           width: x - newComponent.data.x,
  //           height: y - newComponent.data.y
  //         }
  //       });
  //     }
  //   }
  // };

  // const handleMouseUp = () => {
  //   if (newComponent) {
  //     createComponent(newComponent.type, floor_id, newComponent.id, newComponent.data)
  //   }
  //   setNewComponent(null);
  //   setIsDrawing(false);
  // }
  const stage = stageRef.current;

  const mouseDown: Record<string, (stage: any) => void> = {
    room: (stage) => {
      if (stage) {
        const pointerPosition = stage.getPointerPosition();
        if (pointerPosition) {
          const { x, y } = pointerPosition;
          const data = {
            x: x,
            y: y,
            height: 0,
            width: 0,
          };
          const comp_id = IdGenerator();
          setNewComponent({ data: data, type: "room", id: comp_id });
          setIsDrawing(true);
        }
      }
    },
    stairs: (stage) => {
      if (stage) {
        const pointerPosition = stage.getPointerPosition();
        if (pointerPosition) {
          const { x, y } = pointerPosition;
          const data = {
            x: x,
            y: y,
            height: 0,
            width: 0,
          };
          const comp_id = IdGenerator();
          setNewComponent({ data: data, type: "stairs", id: comp_id });
          setIsDrawing(true);
        }
      }
    }
  };

  const mouseMove: Record<string, (stage: any) => void> = {
    room: (stage) => {
      if (!newComponent || !isDrawing) return;
      if (stage) {
        const pointerPosition = stage.getPointerPosition();
        if (pointerPosition) {
          const { x, y } = pointerPosition;
          const data = {
            x: x,
            y: y,
            height: 0,
            width: 0,
          };
          const comp_id = IdGenerator();
          setNewComponent({
            ...newComponent,
            data: {
              ...newComponent.data,
              width: x - newComponent.data.x,
              height: y - newComponent.data.y
            }
          });
        }
      }
    },
    stairs: (stage) => {
      if (!newComponent || !isDrawing) return;
      if (stage) {
        const pointerPosition = stage.getPointerPosition();
        if (pointerPosition) {
          const { x, y } = pointerPosition;
          const data = {
            x: x,
            y: y,
            height: 0,
            width: 0,
          };
          const comp_id = IdGenerator();
          setNewComponent({
            ...newComponent,
            data: {
              ...newComponent.data,
              width: x - newComponent.data.x,
              height: y - newComponent.data.y
            }
          });
        }
      }
    }
  };

  const mouseUp: Record<string, (stage: any) => void> = {
    room: (stage) => {
      if (newComponent) {
        createComponent(newComponent.type, floor_id, newComponent.id, newComponent.data)
      }
      setNewComponent(null);
      setIsDrawing(false);
    },
    stairs: () => {
      if (newComponent) {
        createComponent(newComponent.type, floor_id, newComponent.id, newComponent.data)
      }
      setNewComponent(null);
      setIsDrawing(false);
    }
  };

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
      scale={{ x: 1, y: 1 }}
      onMouseDown={() => { mouseDown[activeTool]?.(stage) }}
      onMouseMove={() => { mouseMove[activeTool]?.(stage) }}
      onMouseUp={() => { mouseUp[activeTool]?.(stage) }}
    >
      <DottedGridCanvas />
      {floor_id &&
        <>
          {children}
          <Layer>
            {componentList.length > 0 && componentList.map((component: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  {component.type === "room" && <RoomTool id={component?._id} data={component?.data} key={index} />}
                  {component.type === "stairs" && <StairTool id={component?._id} data={component?.data} key={index} />}
                  {component.type === "path" && <RoomTool id={component?._id} data={component?.data} key={index} />}
                  {component.type === "sensor" && <RoomTool id={component?._id} data={component?.data} key={index} />}
                </React.Fragment>
              )
            })}
            {newComponent && renderComponent[newComponent.type](
              newComponent.id,
              newComponent.data
            )}
          </Layer>
        </>
      }
    </Stage >
  );

}

