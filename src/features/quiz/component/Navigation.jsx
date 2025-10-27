import React from 'react';
import {Link} from "react-router-dom"
const Navigation = ({onPrev, onNext, handlesubmit, isFirstQuestion, isLastQuestion, selectedAnswers}) => {
    return (
        <div className='flex justify-between'>
            {
                isFirstQuestion ? (
                        <button className='funtion-btn-disable opacity-40 cursor-default' disabled>Previous</button>

                ) :
                    (<div className='funtion-btn'
                             onClick={onPrev}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        <p>Previous</p>
                    </div>)
            }
            {selectedAnswers !== undefined ?
                <div className='funtion-btn'
                // onClick={isLastQuestion ? handlesubmit : onNext}
                  onClick={isLastQuestion ? handlesubmit : onNext}
                >
                {isLastQuestion ? 'Submit' : 'Next'}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                    </svg>
                </div>
                :
                <div className='funtion-btn-disable' disabled
                >
                    {isLastQuestion ? 'Submit' : 'Next'}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                    </svg>
                </div>
            }
        </div>
    );
};

export default Navigation;