"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook to generate a text excerpt
 * @param text - The original text
 * @param length - The maximum length of the excerpt
 * @param suffix - The suffix to append if the text is longer than the specified length
 * @returns The excerpt
 */
function useTextExcerpt(
  text: string,
  length: number,
  suffix: string = "..."
): string {
  const [excerpt, setExcerpt] = useState<string>("");

  useEffect(() => {
    if (text.length > length) {
      setExcerpt(text.substring(0, length) + suffix);
    } else {
      setExcerpt(text);
    }
  }, [text, length, suffix]);

  return excerpt;
}

export default useTextExcerpt;
