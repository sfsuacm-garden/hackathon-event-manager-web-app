import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup if value changes before delay is over
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
