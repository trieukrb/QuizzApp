import React from 'react';
import {Link} from "react-router-dom"
const Navigation = ({datalength, onPrev, onNext, quenstionnum, handlesubmit}) => {
    return (
        <div className='nav__btn'>
            {
                quenstionnum === 0 ? (
                    <Link to='/'>
                        <button className='nav nav__pev'>Previous</button>
                    </Link>
                ) : (<button className='nav nav__pev'
                             onClick={onPrev}
                >Previous</button>)
            }
            <button className='nav nav__next'
                    onClick={quenstionnum === datalength - 1 ? handlesubmit : onNext}
            >{quenstionnum === datalength - 1 ? 'Submit' : 'Next'}</button>
        </div>
    );
};

export default Navigation;