"use client";
import { socket } from "@/hooks/socket";

export default function Home() {
  socket.on("response", (data) => {
    console.log("Server says:", data);
  });
  return (
    <div>
      <button onClick={() => socket.emit("message", "potato")}>button</button>
    </div>
  );
}
