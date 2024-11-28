"use client";
import { useEffect, useRef, useState } from "react";

const DrawingSurface: React.FC<{ drawingMode: boolean }> = ({
  drawingMode,
}) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<number[]>([0, 0]);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvas.current) {
      const context = canvas.current.getContext("2d");
      if (context) {
        ctx.current = context;
        const ratio = window.devicePixelRatio || 1;
        const width = canvas.current.offsetWidth * ratio;
        const height = canvas.current.offsetHeight * ratio;

        // Set the canvas size in pixels
        canvas.current.width = width;
        canvas.current.height = height;

        // Scale the drawing context to match the device pixel ratio
        context.scale(ratio, ratio);
        context.strokeStyle = "black"; // Line color
        context.lineWidth = 2; // Line width
        context.lineCap = "round"; // Rounded line ends
        context.lineJoin = "round"; // Smooth connections between lines
      }
    }
  }, [canvas]);

  const startDrawing = (e: React.MouseEvent) => {
    if (!drawingMode) return;
    setIsDrawing(true);
    setCoordinates([e.clientX, e.clientY]);
  };
  const stopDrawing = () => {
    setIsDrawing(false);
    ctx.current?.closePath();
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    ctx.current?.moveTo(coordinates[0], coordinates[1]); // Move to the last position
    ctx.current?.lineTo(e.clientX, e.clientY); // Draw to the current position
    ctx.current?.stroke();
    setCoordinates([e.clientX, e.clientY]); // Update the last position
  };
  return (
    <>
      <canvas
        ref={canvas}
        id="drawingSurface"
        className="fixed top-0 left-0 w-100 z-30 h-full bg-transparent"
        style={{ pointerEvents: !drawingMode ? "none" : "auto" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      ></canvas>
    </>
  );
};

export default DrawingSurface;
