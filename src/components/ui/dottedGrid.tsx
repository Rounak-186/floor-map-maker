import React, { useEffect, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";

export default function DottedGridCanvas({
  width = 800,
  height = 600,
  gap = 40,        // distance between dots (tile size)
  dotDiameter = 4, // diameter of dot in CSS pixels
  color = "#ccc"
}) {
  const patternRef = useRef(null);

  useEffect(() => {
    if (!patternRef.current) return;

    const dpr = window.devicePixelRatio || 1;
    const tileSize = gap;
    const dotRadius = (dotDiameter / 2) * dpr;

    // create offscreen canvas sized by DPR for crispness
    const canvas = document.createElement("canvas");
    canvas.width = tileSize * dpr;
    canvas.height = tileSize * dpr;

    const ctx = canvas.getContext("2d");
    ctx!.scale(dpr, dpr); // scale back to CSS pixels for easy drawing

    // clear (not required for new canvas, but good habit)
    ctx!.clearRect(0, 0, tileSize, tileSize);

    // draw dot centered
    ctx!.fillStyle = color;
    ctx!.beginPath();
    // draw using CSS pixel coordinates because of ctx!.scale(dpr,dpr)
    ctx!.arc(tileSize / 2, tileSize / 2, dotDiameter / 2, 0, Math.PI * 2);
    ctx!.fill();

    // apply as pattern image
    patternRef.current.fillPatternImage(canvas);
    patternRef.current.fillPatternRepeat("repeat"); // alternative setter API
    // redraw layer
    const layer = patternRef.current.getLayer();
    if (layer) layer.batchDraw();

    // no cleanup required for a single canvas, but if you kept references destroy them here
  }, [gap, dotDiameter, color]); // re-run if these props change

  return (    
      <Layer>
        <Rect
          ref={patternRef}
          x={0}
          y={0}
          width={width * 1.25}
          height={height * 1.25}
          // optionally add z-index / listening false if you want
          listening={false} // background shouldn't pick events
        />
      </Layer>
  );
}
