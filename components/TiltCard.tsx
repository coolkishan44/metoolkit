"use client";

import { useRef } from "react";

export default function TiltCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * -12;
    const rotateY = (x / rect.width) * 12;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  }

  return (
    <div
      className="perspective-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className={className}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out"
        }}
      >
        {children}
      </div>
    </div>
  );
}
