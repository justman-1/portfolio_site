// hooks/useWindowWidth.js
import { useEffect, useState } from "react";

const THROTTLE_MS = 150;

export default function useWindowWidth() {
  const [width, setWidth] = useState(() => {
    // На сервере window нет — возвращаем 0 или любое значение по умолчанию
    if (typeof window === "undefined") return 0;
    return window.innerWidth;
  });

  useEffect(() => {
    // Эта часть выполняется только на клиенте
    let timeoutId: null | NodeJS.Timeout = null;

    const handleResize = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
        timeoutId = null;
      }, THROTTLE_MS);
    };

    window.addEventListener("resize", handleResize);
    setWidth(window.innerWidth); // синхронизируем при монтировании

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return width;
}
