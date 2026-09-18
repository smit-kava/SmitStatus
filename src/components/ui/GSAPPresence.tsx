import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface GSAPPresenceProps {
  isPresent: boolean;
  children: React.ReactNode;
  /** Function that returns a GSAP animation to play when the component enters */
  enterAnimation?: (el: HTMLElement) => gsap.core.Animation;
  /** Function that returns a GSAP animation to play when the component exits */
  exitAnimation?: (el: HTMLElement) => gsap.core.Animation;
  /** Optional class name for the wrapper div */
  className?: string;
  /** Optional style for the wrapper div */
  style?: React.CSSProperties;
}

/**
 * A utility component to replace framer-motion's <AnimatePresence>.
 * It keeps children mounted while the exitAnimation plays, and unmounts them afterward.
 */
export function GSAPPresence({
  isPresent,
  children,
  enterAnimation,
  exitAnimation,
  className,
  style,
}: GSAPPresenceProps) {
  const [shouldRender, setShouldRender] = useState(isPresent);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPresent) {
      setShouldRender(true);
    } else if (!isPresent && shouldRender) {
      if (containerRef.current && exitAnimation) {
        // Trigger exit animation and unmount on complete
        const anim = exitAnimation(containerRef.current);
        anim.eventCallback("onComplete", () => {
          setShouldRender(false);
        });
      } else {
        // No exit animation provided, unmount immediately
        setShouldRender(false);
      }
    }
  }, [isPresent, shouldRender, exitAnimation]);

  // Run enter animation when the component mounts and is present
  useGSAP(
    () => {
      if (isPresent && shouldRender && enterAnimation && containerRef.current) {
        enterAnimation(containerRef.current);
      }
    },
    { dependencies: [isPresent, shouldRender, enterAnimation], scope: containerRef }
  );

  if (!shouldRender) return null;

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
}
