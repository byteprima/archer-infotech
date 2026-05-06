"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const targetNumber = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const isDecimal = targetNumber % 1 !== 0;
  const finalDisplay = isDecimal ? targetNumber.toFixed(1) : targetNumber.toString();

  // Initial state matches the final value so SSR / first paint shows the real number
  // (Googlebot and AI crawlers without JS see the truth, not "0").
  const [displayValue, setDisplayValue] = useState(finalDisplay);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateFromZero();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  const animateFromZero = () => {
    setDisplayValue(isDecimal ? "0.0" : "0");
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = targetNumber * easeOutQuart;

      if (isDecimal) {
        setDisplayValue(currentValue.toFixed(1));
      } else {
        setDisplayValue(Math.floor(currentValue).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(finalDisplay);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
}
