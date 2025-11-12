import React from 'react';

const ProgressBar = ({ current, total }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    return (
        <div className="w-full h-2 bg-neutral-300 rounded-lg">
            <div
                className="bg-linear-to-r from-fuchsia-400 to-sky-400 h-full rounded-lg"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
