import React from 'react';
import {Link} from "react-router-dom"
const Navigation = ({onPrev, onNext, handlesubmit, isFirstQuestion, isLastQuestion}) => {
    return (
        <div className='nav__btn'>
            {
                isFirstQuestion ? (
                    <Link to='/'>
                        <button className='nav nav__pev'>Previous</button>
                    </Link>
                ) : (<button className='nav nav__pev'
                             onClick={onPrev}
                >Previous</button>)
            }
            <button className='nav nav__next'
                    onClick={isLastQuestion ? handlesubmit : onNext}
            >{isLastQuestion ? 'Submit' : 'Next'}</button>
        </div>
    );
};

export default Navigation;