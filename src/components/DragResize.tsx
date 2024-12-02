"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
type PropFunction = (value: any) => void;
const DragResize: React.FC<{
  coords: number[];
  children: ReactNode;
  active: boolean;
  resizeBoth: boolean;
  setActive: PropFunction;
}> = ({ coords, children, active, resizeBoth, setActive }) => {
  const [coordinates, setCoords] = useState<number[]>(coords);
  const [pressed, setPressed] = useState<boolean>(false);
  const [initialOffset, setInitialOffset] = useState<number[]>([0, 0]);
  const draggable = useRef<HTMLDivElement | null>(null);

  const handleDrag = (e: MouseEvent) => {
    e.preventDefault();
    if (pressed) {
      setCoords([e.clientX - initialOffset[0], e.clientY - initialOffset[1]]);
    }
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    setInitialOffset([
      e.clientX - (draggable.current?.offsetLeft || 0),
      e.clientY - (draggable.current?.offsetTop || 0),
    ]);
    setPressed(true);
  };
  const handleClickOutside = ({ target }: MouseEvent) => {
    setActive(!!draggable.current?.contains(target as Node));
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, false);
    if (pressed) {
      document.addEventListener("mousemove", handleDrag, false);
    }
    return () => {
      document.removeEventListener("mousemove", handleDrag, false);
    };
  }, [pressed]);

  return (
    <div
      ref={draggable}
      className="p-3 overflow-hidden fixed"
      style={{
        resize: resizeBoth ? "both" : "horizontal",
        top: coordinates[1] + "px",
        left: coordinates[0] + "px",
        border: active ? "1px solid purple" : "1px solid transparent",
        userSelect: pressed ? "none" : "auto",
      }}
    >
      <div
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={() => setPressed(false)}
        className="h-full box-bord"
      >
        {children}
      </div>
    </div>
  );
};

export default DragResize;
