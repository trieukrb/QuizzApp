import React from 'react';
import question from "../../quiz/component/Question.jsx";

const FormDetail = ({showfalse, handlestopPropagation, DetailData}) => {
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-neutral-500/30 flex justify-center items-center" onClick={showfalse}>
            <div className="bg-n-50 p-5 rounded-xl  shadow-xl sm:min-w-100 md:min-w-120 lg:min-w-150 " onClick={handlestopPropagation}>
                <div className='flex justify-between font-bold text-lg mb-2'>
                    <h1 className=''>Question Details</h1>
                    <div className="cursor-pointer" onClick={showfalse}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="p-1">
                    <h1 className="font-medium text-3xl mb-3 text-center">{DetailData.question}</h1>
                    {DetailData.options.map((option, index) => (
                        <p className={` mb-2 rounded-lg px-3 py-2 border-1 border-solid  ${option === DetailData.answer ? "bg-green-200/50 border-green-400" : "border-neutral-400"} `} key={index}>{option}</p>
                    ))}
                </div>
                <div className="flex justify-end gap-3 mt-2">
                    <button onClick={showfalse} className="bg-neutral-200 px-3 py-1 rounded-md hover:opacity-40 cursor-pointer">Quit</button>
                </div>
            </div>
        </div>
    );
};

export default FormDetail;