"use client"
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Layer, Stage } from 'react-konva'
import DottedGridCanvas from './dottedGrid';
import { useCanvasData } from '@/contexts/canvasContext';
import { IdGenerator } from '@/utils/idGenerator';
import { RoomTool } from '@/tools/room.tool';
import { StairTool } from '@/tools/stairTool';
import { PathTool } from '@/tools/pathTool';
import Konva from 'konva';
import { SensorTool } from '@/tools/sensorTool';

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
    stair: (id, data) => <StairTool id={id} data={data} />,
    path: (id, data, path) => <PathTool id={id} data={data} path={path} />,
    sensor: (id, data) => <SensorTool id={id} data={data} />,

  }

  const mouseDown: Record<string, (stage: any, e: Konva.KonvaEventObject<MouseEvent>) => void> = {
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
    stair: (stage) => {
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
          setNewComponent({ data: data, type: "stair", id: comp_id, path: [] });
          setIsDrawing(true);
        }
      }
    },

    path: (stage, e) => {
      if (stage) {
        if (e.evt.button === 0) {
          console.log("first left click occured");
          const pointerPosition = stage.getPointerPosition();
          if (pointerPosition) {
            const { x, y } = pointerPosition;
            const data = {
              x: x,
              y: y,
              height: 0,
              width: 0,
            };
            console.log("Pointer position got", x, y)
            if (!liveSegment) {
              console.log("liveSegment was null and will now be updated");
              const newSeg = {
                v1: { x, y },
                v2: { x, y },
              };
              setLiveSegment(newSeg);
              console.log("LiveSegment initialised: ", newSeg)
              if (!newComponent) {
                const comp_id = IdGenerator();
                setNewComponent({ data: data, type: "path", id: comp_id, path: [newSeg] });
                console.log("vertices sent from canvas ", newComponent)
              }
              setIsDrawing(true)
              return;
            }

            if (!newComponent) {
              const comp_id = IdGenerator();
              setNewComponent({ data: data, type: "path", id: comp_id, path: [...segments, liveSegment] });
              console.log("component created: ", newComponent)
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
        };

        if (e.evt.button === 2 && liveSegment) {
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
          setNewComponent(null)
          console.log(newComponent)
        }
      }
    },

    sensor: (stage) => {
      if (stage) {
        const pointerPosition = stage.getPointerPosition();
        if (pointerPosition) {
          const { x, y } = pointerPosition;
          const data = {
            x: x,
            y: y,
            height: 0,
            width: 0,
            label:"sensor"
          }
          const comp_id = IdGenerator();
          setNewComponent({ data: data, type: "sensor", id: comp_id, path: [] });
          createComponent("sensor", floor_id, comp_id, data, []);
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
    stair: (stage) => {
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
    stair: () => {
      if (newComponent) {
        createComponent(newComponent.type, floor_id, newComponent.id, newComponent.data, [])
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
      onMouseDown={(e: Konva.KonvaEventObject<MouseEvent>) => { mouseDown[activeTool]?.(stage, e) }}
      onMouseMove={() => { mouseMove[activeTool]?.(stage) }}
      onMouseUp={() => { mouseUp[activeTool]?.(stage) }}
      onContextMenu={(e) => {
        e.evt.preventDefault();   // stop browser menu
      }}
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
                  {component.type === "stair" && <StairTool id={component?._id} data={component?.data} key={index} />}
                  {component.type === "path" && <PathTool id={component?._id} data={component?.data} key={index} path={component?.path} />}
                  {component.type === "sensor" && <SensorTool id={component?._id} data={component?.data} key={index} />}
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

