import { CanvasDataProvider } from '@/contexts/canvasContext'
import React, { ReactNode } from 'react'

export default function DesignLayout({ children }: { children: ReactNode }) {
    return (
        <CanvasDataProvider>
            {children}
        </CanvasDataProvider>
    )
}
