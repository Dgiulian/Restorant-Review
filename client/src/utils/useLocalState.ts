import { useState, useEffect } from 'react';

export function useLocalState<S = undefined>(key: string, initialValue: S) {
  const [value, setValue] = useState<S>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
      return initialValue;
    }
  });
  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
  return [value, setValue] as [typeof value, typeof setValue];
}
