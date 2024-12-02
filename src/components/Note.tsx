import { useState } from "react";
import DragResize from "./DragResize";
import styles from "./Note.module.css";
import type { Note } from "@/interfaces/Note.interface";

const Note: React.FC<{ note: Note }> = ({ note }) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <DragResize
      setActive={(val) => setActive(val)}
      active={active}
      resizeBoth={true}
      coords={note.coords}
    >
      <div className={styles.note} style={note.style}>
        {note.text}
      </div>
    </DragResize>
  );
};

export default Note;
