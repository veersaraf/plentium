// This is a custom version of 'FadeIn' from the 'react-fade-in' library to accomodate initialDelay and threshold 
// for animation initialisaton only when object is in view
// Check it out the great original version https://www.npmjs.com/package/react-fade-in
// GPT4o helped in the customization

import React, { useEffect, useState, useRef } from "react";


export const InViewFade = ({ children, initialDelay = 0, delay = 50, transitionDuration = 400, threshold = 0, className, childClassName, onComplete}) => {
 
  const [maxIsVisible, setMaxIsVisible] = useState(0);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const containerRef = useRef();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isAnimationStarted) return;
    const timer = setTimeout(() => setIsAnimationStarted(true), initialDelay);
    return () => clearTimeout(timer);
  }, [isInView, isAnimationStarted, initialDelay]);

  useEffect(() => {
    if (!isAnimationStarted) return;
    const count = React.Children.count(children);
    if (count === maxIsVisible) {
      const timeout = setTimeout(() => onComplete?.(), transitionDuration);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(
      () => setMaxIsVisible((prev) => prev + (count > prev ? 1 : -1)),
      delay
    );
    return () => clearTimeout(timeout);
  }, [isAnimationStarted, children, delay, maxIsVisible, transitionDuration, onComplete]);

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child, i) => (
        <div
          className={`${childClassName} flex-1`}
          style={{
            transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
            transform: maxIsVisible > i ? "none" : "translateY(20px)",
            opacity: maxIsVisible > i ? 1 : 0,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
