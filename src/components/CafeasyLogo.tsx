/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CafeasyLogoProps {
  className?: string;
  strokeWidth?: number;
}

export function CafeasyLogo({ className = 'w-16 h-16', strokeWidth = 5 }: CafeasyLogoProps) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full currentColor"
      >
        {/* Outer stylized F frame */}
        <path
          d="M 25,20 
             H 75 
             V 45 
             H 48 
             V 58 
             H 68 
             V 70 
             H 48 
             V 85 
             H 35 
             V 32 
             H 25 
             Z"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Diagonal stripes on upper-middle loop */}
        <line
          x1="38" y1="28"
          x2="46" y2="20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="46" y1="28"
          x2="54" y2="20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="54" y1="28"
          x2="62" y2="20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
