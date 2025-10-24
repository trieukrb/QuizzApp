import React, {useState} from 'react';

const Header = ({shownavinfo}) => {
    const [isShowNavUser, setIsShowNavUser] = useState(false)

    return (
        <>
        <header className='bg-blue-950 text-neutral-50 flex justify-between px-5 h-15 items-center fixed w-full shadow-xl z-10'>
            <div onClick={shownavinfo} className="cursor-pointer flex gap-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <h1 className="font-bold text-xl">TQuizlet</h1>
            </div>

            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer" onClick={() => setIsShowNavUser(!isShowNavUser)}>
                <img className="h-full w-full rounded-full object-cover" src="src/assets/Images/img.png" alt=""/>
            </div>
            {isShowNavUser && <ul className="absolute top-18 right-5 bg-blue-950 p-3 rounded-lg">
                <li>Setting setting</li>
                <li>Setting</li>
                <li>Setting</li>
            </ul>}
        </header>
        </>
    );
};

export default Header;