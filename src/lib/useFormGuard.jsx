"use client";
import { useEffect, useRef, useState } from "react";

// Anti-spam helper for forms: a hidden "website" field humans never see, plus
// the time the form was shown. Render {field} inside the <form>, and pass
// guard() to postEnquiry(). Pass a changing resetKey (e.g. modal isOpen) to
// restart the timer.
export function useFormGuard(resetKey) {
  const startedAt = useRef(Date.now());
  const [website, setWebsite] = useState("");
  useEffect(() => {
    startedAt.current = Date.now();
  }, [resetKey]);

  const field = (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </label>
    </div>
  );
  return { field, guard: () => ({ website, startedAt: startedAt.current }) };
}
