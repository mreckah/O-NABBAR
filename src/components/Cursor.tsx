import { useEffect, useState, useRef } from 'react';
import { useReducedMotion, useMousePosition, useLerp } from '../hooks';

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const mousePos = useMousePosition();
  const lerpPos = useLerp(mousePos, 0.15);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    setIsVisible(true);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion || !isVisible) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          transform: `translate(${lerpPos.x - 3}px, ${lerpPos.y - 3}px)`,
          transition: isClicking ? 'transform 0.05s ease-out' : 'none',
        }}
      />
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block transition-all duration-150"
        style={{
          width: isHovering ? '32px' : '24px',
          height: isHovering ? '32px' : '24px',
          border: '1px solid rgba(0, 212, 170, 0.5)',
          backgroundColor: isHovering ? 'transparent' : 'rgba(0, 212, 170, 0.05)',
          transform: `translate(${lerpPos.x - (isHovering ? 16 : 12)}px, ${lerpPos.y - (isHovering ? 16 : 12)}px) scale(${isClicking ? 0.8 : 1})`,
        }}
      />
    </>
  );
}
