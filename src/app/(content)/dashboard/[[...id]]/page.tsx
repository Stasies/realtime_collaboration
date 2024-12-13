"use client";
import useSWR from "swr";
import Canvas from "@/components/Canvas";
import DravingSurface from "@/components/DravingSurface";
import Tools from "@/components/Tools";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { socket } from "@/hooks/socket";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Dashboard = () => {
  const params = useParams();
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const { data: notes } = useSWR(`/api/room/${params.id}/notes`, () =>
    fetcher(`/api/room/${params.id}/notes`)
  );
  const { data: texts } = useSWR(`/api/room/${params.id}/texts`, () =>
    fetcher(`/api/room/${params.id}/texts`)
  );
  useEffect(() => {
    socket.on("created", () => console.log("hrere"));
    socket.on("noteCreated", () => console.log("noteCreated"));
  }, [socket]);
  useEffect(() => {
    fetch("/api/socket");
  }, []);
  // socket.emit("joinRoom", params.id?.[0]);
  return (
    <div>
      <Canvas notes={notes} texts={texts}></Canvas>
      <DravingSurface drawingMode={drawingMode} />
      <Tools setDrawingMode={(val) => setDrawingMode(val)} />
    </div>
  );
};

export default Dashboard;
