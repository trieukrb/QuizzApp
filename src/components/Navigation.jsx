import React from 'react';

const Navigation = ({datalength, onPrev, onNext, quenstionnum, handlesubmit}) => {
    return (
        <div className='nav__btn'>
            <button className='nav nav__pev'
                    onClick={onPrev}
            >Previous
            </button>
            <button className='nav nav__next'
                    onClick={quenstionnum === datalength - 1 ? handlesubmit : onNext}
            >{quenstionnum === datalength - 1 ? 'Submit' : 'Next'}</button>
        </div>
    );
};

export default Navigation;