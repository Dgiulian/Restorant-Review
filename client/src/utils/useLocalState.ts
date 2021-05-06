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
      if (typeof value !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      } else {
        window.localStorage.removeItem(key);
      }
    }
  }, [key, value]);
  return [value, setValue] as [typeof value, typeof setValue];
}
