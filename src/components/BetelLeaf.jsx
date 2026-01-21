import React from 'react';

const BetelLeaf = ({ size = 24, color = "currentColor", fill = "none", ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={fill}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Betel Leaf Shape - Heart-like but with distinct proportions */}
            <path d="M12 21.5C7.5 17 3.5 13 3.5 8.5C3.5 5.5 6 3 9 3C10.5 3 12 4 12 4C12 4 13.5 3 15 3C18 3 20.5 5.5 20.5 8.5C20.5 13 16.5 17 12 21.5Z" />
            {/* Central Vein */}
            <path d="M12 4C12 4 12 12 12 15" />
            {/* Side Veins */}
            <path d="M12 10L9 7" />
            <path d="M12 10L15 7" />
        </svg>
    );
};

export default BetelLeaf;
