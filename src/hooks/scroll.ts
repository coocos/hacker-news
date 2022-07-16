import { useEffect } from "react";

export function useScrollToTop() {
  return useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
