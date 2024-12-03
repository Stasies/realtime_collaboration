"use client";
import useSWR from "swr";
import Canvas from "@/components/Canvas";
import DravingSurface from "@/components/DravingSurface";
import Tools from "@/components/Tools";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Dashboard = () => {
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const { data: notes } = useSWR("/api/notes", () => fetcher(`/api/notes`));
  const { data: texts } = useSWR("/api/texts", () => fetcher(`/api/texts`));
  return (
    <div>
      <Canvas notes={notes} texts={texts}></Canvas>
      <DravingSurface drawingMode={drawingMode} />
      <Tools setDrawingMode={(val) => setDrawingMode(val)} />
    </div>
  );
};

export default Dashboard;
