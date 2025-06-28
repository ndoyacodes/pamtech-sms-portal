import React from 'react';

interface ProgressProps {
  value: number; 
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, className }) => (
  <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className || ''}`}>
    <div
      className="bg-blue-600 h-2 transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

export { Progress };