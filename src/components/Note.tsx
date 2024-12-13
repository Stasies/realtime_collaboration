import { FormEvent, useEffect, useRef, useState } from "react";
import DragResize from "./DragResize";
import styles from "./Note.module.css";
import type { Note } from "@/interfaces/Note.interface";
import { useParams } from "next/navigation";

const Note: React.FC<{ note: Note }> = ({ note }) => {
  const [active, setActive] = useState<boolean>(false);
  const [still, setStill] = useState<boolean>(false);
  const noteRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();

  useEffect(() => {
    const observeTarget = noteRef.current;
    const initialWidth = observeTarget?.clientWidth || 0;
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          const width = entry.contentRect.left + entry.contentRect.right;
          const height = entry.contentRect.top + entry.contentRect.bottom;
          if (Math.floor(width) > initialWidth) {
            updateNote("style.width", width + "px");
            updateNote("style.height", height + "px");
          }
        }
      }
    );
    if (observeTarget) {
      resizeObserver.observe(observeTarget); // Start observing
    }
    // Cleanup observer on component unmount
    return () => {
      if (observeTarget) {
        resizeObserver.unobserve(observeTarget);
      }
    };
  }, []);
  const handleInput = (e: FormEvent) => {
    updateNote("text", (e.target as HTMLDivElement).innerText);
  };

  const updateNote = async (key: string, value: string | number[]) => {
    const data = await fetch(`/api/room/${params.id}/notes/${note._id}`, {
      method: "PATCH",
      body: JSON.stringify({ [key]: value }),
    });
    return data;
  };

  return (
    <DragResize
      updateCoordinates={(val) => updateNote("coords", val)}
      setActive={(val) => setActive(val)}
      active={active}
      still={still}
      resizeBoth={true}
      coords={note.coords}
      size={{ width: note.style.width, height: note.style.height }}
    >
      <div
        ref={noteRef}
        className={`${styles.note} flex justify-center items-center`}
        style={{ backgroundColor: note.style.backgroundColor }}
      >
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={(e) => {
            handleInput(e);
            setStill(false);
          }}
          onFocus={() => setStill(true)}
          className="outline-none h-fit"
        >
          {note.text}
        </div>
      </div>
    </DragResize>
  );
};

export default Note;
