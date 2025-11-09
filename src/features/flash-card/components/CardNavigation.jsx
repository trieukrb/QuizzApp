import React from 'react';

const CardNavigation = ({ onPrev, onNext, isFirst, isLast }) => {
    return (
        <div className="flex justify-between gap-2 mt-3 font-medium">
            {isFirst ? (
                <button
                    className="px-5 py-1 rounded-lg cursor-default border-2 border-p-500 opacity-30"
                    disabled
                >
                    Previous
                </button>
            ) : (
                <button
                    className="px-5 py-1 transition duration-400 hover:scale-105 rounded-lg hover:bg-p-200 cursor-pointer border-2 border-p-500"
                    onClick={onPrev}
                >
                    Previous
                </button>
            )}
            {isLast ? (
                <button
                    className="px-5 py-1 rounded-lg cursor-default border-2 border-p-500 opacity-30"
                    disabled
                >
                    Next
                </button>
            ) : (
                <button
                    className="px-5 py-1 transition duration-400 hover:scale-105 rounded-lg hover:bg-p-200 cursor-pointer border-2 border-p-500"
                    onClick={onNext}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default CardNavigation;
