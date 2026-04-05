/**
 * useCountUp — Animates a number from 0 to target value.
 * Duration: 800ms with ease-out curve.
 */
import { useState, useEffect, useRef } from 'react';

export const useCountUp = (target, duration = 800) => {
  const [value, setValue] = useState(0);
  const startTime = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }

    startTime.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration]);

  return value;
};
