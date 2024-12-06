"use client";
import useSWR from "swr";
import Canvas from "@/components/Canvas";
import DravingSurface from "@/components/DravingSurface";
import Tools from "@/components/Tools";
import { useParams } from "next/navigation";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
console.log(window);
const Dashboard = () => {
  const params = useParams();
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const { data: notes } = useSWR(`/api/room/${params.id}/notes`, () =>
    fetcher(`/api/room/${params.id}/notes`)
  );
  const { data: texts } = useSWR(`/api/room/${params.id}/texts`, () =>
    fetcher(`/api/room/${params.id}/texts`)
  );
  const { data: room } = useSWR(`/api/room/${params.id}`, () =>
    fetcher(`/api/room/${params.id}`)
  );
  return (
    <div>
      <Canvas notes={notes} texts={texts}></Canvas>
      <DravingSurface drawingMode={drawingMode} />
      <Tools setDrawingMode={(val) => setDrawingMode(val)} />
    </div>
  );
};

export default Dashboard;
