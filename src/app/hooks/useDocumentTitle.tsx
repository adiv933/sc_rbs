"use client";
import { useRef, useEffect } from "react";

function useDocumentTitle(title: string, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = defaultTitle.current + " | " + title;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    [title, prevailOnUnmount]
  );
}

export default useDocumentTitle;
