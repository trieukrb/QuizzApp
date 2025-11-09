import React from 'react';

const Loading = () => {
    return (
        <div className="w-full gap-x-2 flex flex-col justify-center items-center">
            <div className="w-40 h-40 animate-float">
                <img className="w-full h-full" src="/satellite.png" alt=""/>
            </div>
            <div className="text-n-500 font-bold text-xl">Loading...</div>
        </div>
    );
};

export default Loading;