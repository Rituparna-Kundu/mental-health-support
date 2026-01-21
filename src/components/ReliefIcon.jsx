import React from 'react';

const ReliefIcon = ({ size = 40, ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 128 128"
            fill="none"
            {...props}
        >
            <defs>
                <style>
                    {`
            @keyframes sway {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(2deg); }
            }
            @keyframes breathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.02); }
            }
            @keyframes leafFlutter {
               0%, 100% { transform: translateY(0); }
               50% { transform: translateY(-0.5px); }
            }
            .organic-motion {
              animation: sway 5s ease-in-out infinite, breathe 7s ease-in-out infinite;
              transform-origin: 64px 110px; /* Base of the stem approx */
            }
            .leaf-node {
               animation: leafFlutter 3s ease-in-out infinite;
               transform-origin: center;
            }
            .leaf-node:nth-child(odd) { animation-delay: 0.5s; }
            .leaf-node:nth-child(even) { animation-delay: 1.2s; }
          `}
                </style>

                {/* Soft Drop Shadow */}
                <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                    <feOffset in="blur" dx="0" dy="2" result="offsetBlur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode in="offsetBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Realistic Gradients */}
                <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8BC34A" />
                    <stop offset="100%" stopColor="#558B2F" />
                </linearGradient>

                <linearGradient id="leafLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C5E1A5" />
                    <stop offset="100%" stopColor="#9CCC65" />
                </linearGradient>

                <linearGradient id="leafDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7CB342" />
                    <stop offset="100%" stopColor="#33691E" />
                </linearGradient>
            </defs>

            <g filter="url(#leafShadow)" className="organic-motion">
                {/* Stem */}
                <path fill="url(#stemGradient)" d="M68.5 98.4c-4.6 6-11.6 10.6-21.8 14.1l-2.6.9c-2.3-6.2 3.6-11.2 5.6-12.8 14-11.1 19.3-33.6 15.6-56-1.5-9.3-4.8-17-7.6-22.9l4.1-1.3c8.8 18.5 7.6 42.6 6.7 61 0 5-5.9 11.2 0 17z" />

                {/* --- LEAVES --- */}
                <g className="leaf-node">
                    {/* Top Leaf */}
                    <path fill="url(#leafLight)" d="M62.3 21.6c6 22.9 8.6 30.6.9 44.1 6.3-11.4 6-27.4-4.8-38.3-2.1-2.1 3.9-5.8 3.9-5.8z" />
                    <path fill="url(#leafDark)" d="M54.5 24.3c-1.3 12.1 1.7 20 8.7 41.4-1.7-12.8-5.3-29.4 1-38.6 1.1-1.7-8.3-4.3-9.7-2.8z" />
                </g>

                <g className="leaf-node">
                    {/* Top Right Leaf */}
                    <path fill="url(#leafLight)" d="M96.7 39.5c.9 23.6-.8 31.7-14.8 41.5 1.5-13-.9-27.9-14-36.2-2.5-1.6 4.9-4.9 28.8-5.3z" />
                    <path fill="url(#leafDark)" d="M67.3 47.9c12.2-1.2 20.3-1.6 44.5 0-11-6.7-28-5.2-36.4 2.8-1.5 1.4-9.3-1.6-8.1-2.8z" />
                </g>

                <g className="leaf-node">
                    {/* Top Left Leaf */}
                    <path fill="url(#leafLight)" d="M26.4 51c14.7 18.6 21 24.4 34.6 23.9-8.4-9.9-15.6-23.3-10.4-35.1 1-2.8-5.7 1.2-24.2 11.2z" />
                    <path fill="url(#leafDark)" d="M42.8 38.3c-4.4 11.3-8.1 18.6-16.4 40.5 8.9-9.1 23.9-17 28.1-25.7.8-1.6-7.3-16-11.7-14.8z" />
                </g>

                <g className="leaf-node">
                    {/* Mid Right Leaf */}
                    <path fill="url(#leafLight)" d="M100.3 64.6c-4.1 22.4-7.8 30-22.9 37.7 4.2-12.3 4.8-27.5-6.5-38.2-2.2-2.1 5.2-4.6 29.4.5z" />
                    <path fill="url(#leafDark)" d="M70.3 67.5c12.2-2.3 20.3-3.6 44.2 4.1-11.8-4.9-28.5-.6-35.8 8.1-1.3 1.5-9.6-9.9-8.4-12.2z" />
                </g>

                <g className="leaf-node">
                    {/* Mid Left Leaf */}
                    <path fill="url(#leafLight)" d="M28.7 82.5c17.5 16 24.3 20.8 37.5 18-9.8-8.6-18.7-20.9-15.1-33.3.7-2.9-6.3 3-22.4 15.3z" />
                    <path fill="url(#leafDark)" d="M43.7 65.6c-3.1 11.8-5.6 19.5-10.1 43.1 9.8-8.2 25.4-14.5 30.6-22.4.9-1.5-17.4-32.5-20.5-20.7z" />
                </g>

                <g className="leaf-node">
                    {/* Bottom Right Leaf (Small) */}
                    <path fill="url(#leafLight)" d="M96 89c-6.6 16.5-11.6 21.6-24.6 25.1 5.2-9 7.4-19.9-1.1-28.8-1.7-1.7 4.5-2.8 25.7 3.7z" />
                    <path fill="url(#leafDark)" d="M69.8 88.5c9-1.8 15-2.9 33.3 4.2-8.7-3.6-21.3.6-26.6 7.4-1 1.2-7.7-9.8-6.7-11.6z" />
                </g>

                <g className="leaf-node">
                    {/* Bottom Left Leaf (Small) */}
                    <path fill="url(#leafLight)" d="M37.5 106.5c13.2 12 18.2 15.7 28.2 13.5-7.4-6.4-14.1-15.7-11.4-25 .5-2.2-4.7 2.2-16.8 11.5z" />
                    <path fill="url(#leafDark)" d="M48.8 93.8c-2.3 8.8-4.2 14.6-7.6 32.3 7.4-6.1 19.1-10.9 23-16.8.7-1.1-13.1-24.3-15.4-15.5z" />
                </g>
            </g>
        </svg>
    );
};

export default ReliefIcon;
