"use client";
import Canvas from "@/components/Canvas";
import DravingSurface from "@/components/DravingSurface";
import Tools from "@/components/Tools";
import { useState } from "react";
const Dashboard = () => {
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  return (
    <div>
      <Canvas></Canvas>
      <DravingSurface drawingMode={drawingMode} />
      <Tools setDrawingMode={(val) => setDrawingMode(val)} />
    </div>
  );
};

export default Dashboard;
