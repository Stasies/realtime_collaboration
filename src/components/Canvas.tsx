"use client";
import { useState } from "react";
import ContextMenu from "./ContextMenu";
import Text from "./Text";
import Note from "./Note";

const Canvas: React.FC<{ notes: Note[]; texts: Text[] }> = ({
  notes,
  texts,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [coords, setCoords] = useState([0, 0]);
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
      {texts?.map((el) => (
        <Text key={el._id} textItem={el} />
      ))}
      {notes?.map((el) => (
        <Note key={el._id} note={el} />
      ))}
    </div>
  );
};

export default Canvas;
