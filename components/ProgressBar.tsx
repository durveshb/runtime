import React from "react";

const STROKE_WIDTH = 15;

const ProgressBar = ({
  radius,
  progress,
  children,
}: {
  radius: number;
  progress: number;
  children: React.ReactNode;
}) => {
  const dimension = radius * 2;
  const progressBarRadius = radius - STROKE_WIDTH;
  const circumference = 2 * progressBarRadius * Math.PI;
  return (
    <div
      className="flex relative items-center justify-center"
      style={{
        height: `${dimension}px`,
        width: `${dimension}px`,
      }}
    >
      <svg
        height={dimension}
        width={dimension}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="fixed"
      >
        <circle
          cx={radius}
          cy={radius}
          stroke="center"
          strokeWidth={STROKE_WIDTH}
          r={radius - STROKE_WIDTH}
          className="fill-none stroke-slate-800"
        />
        <circle
          cx={radius}
          cy={radius}
          stroke="center"
          strokeWidth={STROKE_WIDTH}
          r={radius - STROKE_WIDTH}
          className="fill-none stroke-green-600"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * progress) / 100}
          transform={`rotate(-90 ${radius} ${radius})`}
          strokeLinecap="round"
        />
      </svg>
      {children}
    </div>
  );
};

export default ProgressBar;
