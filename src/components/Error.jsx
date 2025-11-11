import React from 'react';
import error_img from "../assets/images/items_img/error_img.png";

const Error = () => {
    return (
        <div className="w-full gap-x-2 flex flex-col justify-center items-center">
            <div className="w-50 h-50 animate-float">
                <img className="w-full h-full" src={error_img} alt=""/>
            </div>
            <div className="text-red-500 font-bold text-xl">Error!</div>
        </div>
    );
};

export default Error;