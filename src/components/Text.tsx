"use client";
import { useEffect, useRef, useState } from "react";
import DragResize from "./DragResize";
import type { Text } from "@/interfaces/Text.interface";

const Text: React.FC<{ textItem: Text }> = ({ textItem }) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<boolean>(false);

  const modifyTextElement = (val: string) => {
    // здесь будет patch запрос с редактированием стилей
  };

  useEffect(() => {
    const observeTarget = textRef.current;
    const initialWidth = observeTarget?.clientWidth || 0;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.clientWidth > initialWidth) {
          entry.target.style.fontSize = entry.target.clientWidth / 2 + "px";
          modifyTextElement(entry.target.clientWidth / 2 + "px");
        }
      }
    });

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
  return (
    <DragResize
      setActive={(val) => setActive(val)}
      active={active}
      coords={textItem.coords}
      resizeBoth={false}
    >
      <div ref={textRef} style={textItem.style} className="leading-none">
        {textItem.text}
      </div>
    </DragResize>
  );
};

export default Text;
