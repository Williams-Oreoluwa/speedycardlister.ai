import React from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth });
  }

  React.useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}
