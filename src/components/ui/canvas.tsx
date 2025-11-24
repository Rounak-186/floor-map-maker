"use client"
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Layer, Stage } from 'react-konva'
import DottedGridCanvas from './dottedGrid';
import { useCanvasData } from '@/contexts/canvasContext';
import { IdGenerator } from '@/utils/idGenerator';
import { RoomTool } from '@/tools/room.tool';
import { StairTool } from '@/tools/stairTool';
import { PathTool } from '@/tools/pathTool';

type ComponentType = {
  type: string,
  id: string,
  path: any[],
  data: {
    x: number,
    y: number,
    height: number,
    width: number,
  }
};

type PathSegment = {
  v1: { x: number; y: number },
  v2: { x: number; y: number }
};

export default function Canvas({ children, floor_id = IdGenerator() }: { children?: ReactNode, floor_id?: string }) {

  const { activeTool, canvasData, createComponent } = useCanvasData();
  const [newComponent, setNewComponent] = useState<ComponentType | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [segments, setSegments] = useState<PathSegment[]>([]);
  const [liveSegment, setLiveSegment] = useState<PathSegment | null>(null);
  const stageRef = useRef<any | null>(null);
  const stage = stageRef.current;

  let floorlist = canvasData;
  const floorIndex = floorlist.findIndex((f: any) => f.floor_id === floor_id);
  if (floorIndex === -1) return;
  let floor = floorlist[floorIndex];
  const componentList = floor.componentList;

  const renderComponent: Record<string, (id: string, data: any, path: any[]) => ReactNode> = {
    room: (id, data) => <RoomTool id={id} data={data} />,
    stairs: (id, data) => <StairTool id={id} data={data} />,
    path: (id, data, path) => <PathTool id={id} data={data} path={path} />
  }

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
          setNewComponent({ data: data, type: "room", id: comp_id, path: [] });
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
          setNewComponent({ data: data, type: "stairs", id: comp_id, path: [] });
          setIsDrawing(true);
        }
      }
    },

    path: (stage) => {
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

          if (!liveSegment) {
            setLiveSegment({
              v1: { x, y },
              v2: { x, y }  // TEMP equals mouse until move
            });
            setIsDrawing(true)
            return;
          }

          if (!newComponent) {
            const comp_id = IdGenerator();
            setNewComponent({ data: data, type: "path", id: comp_id, path: [...segments, liveSegment] })
          }

          // second click = finalize segment
          setSegments(prev => [
            ...prev,
            { v1: liveSegment.v1, v2: { x, y } }
          ]);

          // start new segment from the last point
          setLiveSegment({
            v1: { x, y },
            v2: { x, y }
          });
          if (newComponent) setNewComponent({ ...newComponent, path: [...segments, liveSegment] })
          
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
    },
    path: (stage) => {

      if (!liveSegment || !isDrawing) return;

      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const { x, y } = pointer;
      setLiveSegment(prev => prev && ({
        ...prev,
        v2: { x, y }
      }));
      if (newComponent) {
        setNewComponent({
          data: newComponent.data,
          type: "path",
          id: newComponent.id,
          path: [...segments, liveSegment]
        })
      }
    },

  };

  const mouseUp: Record<string, (stage: any) => void> = {
    room: (stage) => {
      if (newComponent) {
        createComponent(newComponent.type, floor_id, newComponent.id, newComponent.data, [])
      }
      setNewComponent(null);
      setIsDrawing(false);
    },
    stairs: () => {
      if (newComponent) {
        createComponent(newComponent.type, floor_id, newComponent.id, newComponent.data, [])
      }
      setNewComponent(null);
      setIsDrawing(false);
    }
  };

  const doubleClick: Record<string, (stage: any) => void> = {
    path: (stage) => {
      // if (liveSegment) {
      //   setSegments(prev => [...prev, liveSegment]);
      // }

      // save to canvasData
      if (newComponent) {
        createComponent("path", floor_id, newComponent.id, newComponent.data, [...segments, liveSegment]);
        console.log("Path completed")
      }

      // reset
      setIsDrawing(false)
      setLiveSegment(null);
      setSegments([]);
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
      onDblClick={() => { doubleClick[activeTool]?.(stage) }}
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
                  {component.type === "path" && <PathTool id={component?._id} data={component?.data} key={index} path={component?.path} />}
                  {component.type === "sensor" && <RoomTool id={component?._id} data={component?.data} key={index} />}
                </React.Fragment>
              )
            })}
            {newComponent && renderComponent[newComponent.type](
              newComponent.id,
              newComponent.data,
              newComponent.path
            )}
          </Layer>
        </>
      }
    </Stage >
  );

}

