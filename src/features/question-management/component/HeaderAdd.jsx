import React from 'react';

const HeaderAdd = ({searchTerm,setSearchTerm,setIsShowModelAdd}) => {
    return (
        <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
            <label className="flex gap-2 items-center w-4/5 bg-n-50  md:w-3/5 p-2 rounded-3xl shadow-sm border-2 border-neutral-300 placeholder:text-neutral-400" htmlFor='search-bar'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="text"
                        id="search-bar"
                       className="placeholder:text-neutral-400 outline-none"
                       value={searchTerm}
                       placeholder='Search Question'
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
            </label>
            <div className='flex items-center gap-2 bg-p-500 hover:bg-p-700 px-3 py-2 rounded-xl text-neutral-50 font-bold cursor-pointer'
                    onClick={setIsShowModelAdd}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p className="text-center">Add Question</p>
            </div>
        </div>
    );
};

export default HeaderAdd;