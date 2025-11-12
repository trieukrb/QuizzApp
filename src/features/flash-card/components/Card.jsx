import React from 'react';

const Card = ({ isFlipped, onClick, frontContent, backContent }) => {
    return (
        <div
            className="w-60 sm:w-75 lg:w-100 h-120 sm:h-150 [perspective:1000px] cursor-pointer"
            onClick={onClick}
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? 'rotate-y-180' : ''}`}
            >
                <div className="absolute w-full h-full bg-blue-500 text-white rounded-lg flex items-center justify-center p-4 backface-hidden">
                    <h2 className="text-3xl font-bold text-center">
                        {frontContent}
                    </h2>
                </div>
                <div className="absolute w-full h-full bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-center p-4 rotate-y-180 backface-hidden">
                    <h2 className="text-2xl font-bold text-center">
                        {backContent}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Card;
