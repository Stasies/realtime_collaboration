"use client";
import { useState } from "react";
import ContextMenu from "./ContextMenu";
import Text from "./Text";
import Note from "./Note";

const Canvas = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [coords, setCoords] = useState([0, 0]);
  const textElements = [
    {
      id: 1,
      text: "text",
      coords: [200, 0],
      style: {
        color: "red",
        fontSize: "20px",
      },
    },
    {
      id: 2,
      text: "fdsf",
      coords: [40, 100],
      style: {
        color: "black",
        fontSize: "40px",
      },
    },
  ];
  const noteElements = [
    {
      id: 3,
      text: "note 1",
      coords: [400, 700],
      style: {
        width: "100px",
        height: "200px",
        backgroundColor: "lightyellow",
      },
    },
    {
      id: 4,
      text: "note 2",
      coords: [100, 300],
      style: {
        width: "180px",
        height: "200px",
        backgroundColor: "lightyellow",
      },
    },
  ];
  return (
    <div
      className="w-full h-dvh"
      onContextMenu={(e) => {
        e.preventDefault();
        setCoords([e.clientX, e.clientY]);
        setShowMenu(true);
      }}
      onClick={() => setShowMenu(false)}
    >
      {showMenu && <ContextMenu coords={coords} />}
      {textElements.map((el) => (
        <Text key={el.id} textItem={el} />
      ))}
      {noteElements.map((el) => (
        <Note key={el.id} note={el} />
      ))}
    </div>
  );
};

export default Canvas;
