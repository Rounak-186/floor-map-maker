"use client"

import React, { createContext, ReactNode, useContext, useState } from 'react'

type CanvasDataContextType = {
    canvasData: Record<string, any>[];
    setCanvasData: (data: Record<string, any>[]) => void,
    activeTool: string,
    setActiveTool: (tool: string) => void,
    createFloor: (floor_id: string, floor_name: string) => void,
    updateFloor: (floor_id: string, data: any) => void,
    createComponent: (type: string, floor_id: string, comp_id: string, data: any) => void,
    updateComponent: (floor_id: string, component_id: string, data: any) => void,


}

const canvasDataContext = createContext<CanvasDataContextType | undefined>(undefined);


export const CanvasDataProvider = ({ children }: { children: ReactNode }) => {
    const [canvasData, setCanvasData] = useState<Record<string, any>[]>([]);
    const [activeTool, setActiveTool] = useState<string>("select")

    // Create Floor Fumction
    const createFloor = (floor_id: string, floor_name: string) => {
        let floor = {
            floor_id: floor_id,
            floor_name: floor_name,
            componentList: []
        };
        setCanvasData([...canvasData, floor]);
    };

    // Update Floor Function
    const updateFloor = (floor_id: string, data: any) => {
        let floorlist = canvasData;
        const floorIndex = floorlist.findIndex((f: any) => f.floor_id === floor_id);
        if (floorIndex === -1) return;

        let floor = floorlist[floorIndex];
        floor = { ...floor, data };

        floorlist[floorIndex] = floor;
        setCanvasData(floorlist)
    };



    // Create Component function
    const createComponent = (type: string, floor_id: string, comp_id: string, data: any) => {
        let floorlist = canvasData;
        let floorIndex = floorlist.findIndex((f: any) => f.floor_id === floor_id);
        let floor = floorlist[floorIndex];
        let componentlist = floor.componentList;
        const newComponent = {
            type: type,
            comp_id: comp_id,
            data: data
        };
        componentlist.push(newComponent);
        floor.componentList = componentlist;
        floorlist[floorIndex] = floor;
        setCanvasData(floorlist);
    };

    // Update Component Function
    const updateComponent = (floor_id: string, component_id: string, data: any) => {
        let floorlist = canvasData;
        const floorIndex = floorlist.findIndex((f: any) => f.floor_id === floor_id);
        if (floorIndex === -1) return;

        let componentList = floorlist[floorIndex].componentList;
        const componentIndex = componentList.findIndex((c: any) => c.id === component_id);
        if (componentIndex === -1) return;

        let component = componentList[componentIndex];
        component.data = { ...component.data, data };

        componentList[componentIndex] = component;
        floorlist[floorIndex].componentList = componentList;

        setCanvasData(floorlist);
    }

    return (
        <canvasDataContext.Provider value={{ canvasData, setCanvasData, activeTool, setActiveTool, createFloor, updateFloor, createComponent, updateComponent }}>
            {children}
        </canvasDataContext.Provider>
    )
}

export const useCanvasData = () => {
    const { canvasData, setCanvasData, activeTool, setActiveTool, createFloor, updateFloor, createComponent, updateComponent } = useContext(canvasDataContext)!;

    return { canvasData, setCanvasData, activeTool, setActiveTool, createFloor, updateFloor, createComponent, updateComponent };
}

export default canvasDataContext;

// removeFloor
// removecomponent

