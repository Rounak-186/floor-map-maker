"use client"

import React, { createContext, ReactNode, useContext, useState } from 'react'

type CanvasDataContextType = {
    canvasData: Record<string, any>[];
    setCanvasData: (data: Record<string, any>[]) => void,
    updateComponent: (floor_id: string, component_id: string, data: any) => void
}

const canvasDataContext = createContext<CanvasDataContextType | undefined>(undefined);


export const CanvasDataProvider = ({ children }: { children: ReactNode }) => {
    const [canvasData, setCanvasData] = useState<Record<string, any>[]>([]);

    const updateComponent = (floor_id: string, component_id: string, data: any) => {
        let floorlist = canvasData;
        const floorIndex = floorlist.findIndex((f: any) => f.floor_id === floor_id);
        if (floorIndex === -1) return;

        let componentList = floorlist[floorIndex].componentList;
        const componentIndex = componentList.findIndex((c: any) => c.id === component_id);
        if (componentIndex === -1) return;

        let component = componentList[componentIndex];
        component.data = {...component.data, data};

        componentList[componentIndex] = component;
        floorlist[floorIndex].componentList = componentList;

        setCanvasData(floorlist);


    }
    return (
        <canvasDataContext.Provider value={{ canvasData, setCanvasData, updateComponent }}>
            {children}
        </canvasDataContext.Provider>
    )
}

export const useCanvasData = () => {
    const { canvasData, setCanvasData, updateComponent } = useContext(canvasDataContext)!;

    return { canvasData, setCanvasData, updateComponent };
}

export default canvasDataContext;


// updateFloor
// createFloor
// removeFloor
// createcomponent
// removecomponent