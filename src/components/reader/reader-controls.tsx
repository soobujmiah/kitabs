"use client";

import { useState } from "react";

type Size = "normal" | "large" | "larger";
type Theme = "paper" | "night";

export function ReaderControls({ children }: { children: React.ReactNode }) {
  const [size, setSize] = useState<Size>("normal");
  const [theme, setTheme] = useState<Theme>("paper");

  return (
    <div className={`reader-shell reader-${theme} reader-size-${size}`}>
      <div className="reader-toolbar" aria-label="Reading preferences">
        <div className="reader-toolbar-inner">
          <span className="reader-toolbar-label">Reading settings</span>
          <div className="reader-control-group" role="group" aria-label="Text size">
            <span>Text</span>
            <button type="button" aria-label="Decrease text size" disabled={size === "normal"} onClick={() => setSize(size === "larger" ? "large" : "normal")}>A−</button>
            <button type="button" aria-label="Increase text size" disabled={size === "larger"} onClick={() => setSize(size === "normal" ? "large" : "larger")}>A+</button>
          </div>
          <div className="reader-control-group" role="group" aria-label="Reading theme">
            <button type="button" aria-pressed={theme === "paper"} onClick={() => setTheme("paper")}>Paper</button>
            <button type="button" aria-pressed={theme === "night"} onClick={() => setTheme("night")}>Night</button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
