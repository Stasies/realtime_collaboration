"use client";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
type PropFunction = (value: any) => void;
const DragResize: React.FC<{
  coords: number[];
  size: { width: string; height: string };
  still: boolean;
  children: ReactNode;
  active: boolean;
  resizeBoth: boolean;
  setActive: PropFunction;
  updateCoordinates: PropFunction;
}> = ({
  coords,
  size,
  still,
  children,
  active,
  resizeBoth,
  setActive,
  updateCoordinates,
}) => {
  const [coordinates, setCoords] = useState<number[]>(coords);
  const [pressed, setPressed] = useState<boolean>(false);
  const [initialOffset, setInitialOffset] = useState<number[]>([0, 0]);
  const draggable = useRef<HTMLDivElement | null>(null);
  const handleDrag = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (pressed) {
        setCoords([e.clientX - initialOffset[0], e.clientY - initialOffset[1]]);
      }
    },
    [initialOffset, pressed]
  );
  const handleMouseDown = (e: React.MouseEvent) => {
    setInitialOffset([
      e.clientX - (draggable.current?.offsetLeft || 0),
      e.clientY - (draggable.current?.offsetTop || 0),
    ]);
    setPressed(true);
  };
  useEffect(() => {
    document.addEventListener("mousedown", (e) =>
      setActive(!!draggable.current?.contains(e.target as Node))
    );
    if (pressed && !still) {
      document.addEventListener("mousemove", handleDrag, false);
    }
    return () => {
      document.removeEventListener("mousemove", handleDrag, false);
    };
  }, [pressed, handleDrag, setActive]);

  return (
    <div
      ref={draggable}
      className="p-3 overflow-hidden fixed"
      style={{
        width: size?.width ? size?.width : "fit-content",
        height: size?.height ? size?.height : "fit-content",
        resize: resizeBoth ? "both" : "horizontal",
        top: coordinates[1] + "px",
        left: coordinates[0] + "px",
        border: active ? "1px solid purple" : "1px solid transparent",
        userSelect: pressed ? "none" : "auto",
      }}
    >
      <div
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={() => {
          setPressed(false);
          updateCoordinates(coordinates);
        }}
        className="h-full box-content"
      >
        {children}
      </div>
    </div>
  );
};

export default DragResize;
