import React, {useState} from 'react';
import {NavLink,Link, Outlet} from "react-router-dom";
import SideBar from "./SideBar.jsx";

const Section = () => {
    const [widthside, setWidthside] = useState(300)
    const [isShowSidebar, setIsShowSidebar] = useState(false)
    const handleHideSideBar = () => {
        setWidthside(prev => prev === 1 ? 300 : 1 )
    }
    const handleShowSideBar = () => {
        setIsShowSidebar(!isShowSidebar)
    }
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <div className="h-full overflow-hidden flex-col justify-between z-10 bg-n-50 text-md font-bold text-n-700 relative shadow-2xl/50 hidden md:flex"
                     style={{width: `${widthside}px`}}>
                    {/*Home*/}
                    <SideBar/>
                </div>
                <div className="flex-1 h-screen flex flex-col relative overflow-y-scroll">
                    {/*Show side bar in large screen*/}
                    {/*<button className="fixed top-3 left-4 hidden md:block"*/}
                    <button className={`fixed hidden md:block z-10 ${widthside === 1 ? ('top-3 left-4') : ('top-3 left-80')}`}
                            onClick={handleHideSideBar}>
                        <div className="text-n-700 bg-n-100 transition duration-300 hover:scale-105 hover:bg-p-100  border-2 border-p-500 p-1 rounded-md cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    </button>
                    {/*Show side bar in small screen*/}
                    <button className="fixed top-3 left-4 md:hidden"
                            onClick={handleShowSideBar}>
                        <div className="text-n-700 bg-n-100 border-2 border-p-500 p-1 rounded-md cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            {/*    "absolute top-3 left-4 md:hidden" */}
                            </svg>
                        </div>
                    </button>
                    <Outlet/>
                </div>
            </div>
            {
                isShowSidebar &&
                <div className="fixed top-0 right-0 left-0 bottom-0 bg-neutral-500/30 flex justify-start items-center md:hidden" onClick={() => setIsShowSidebar(false)}>
                    <div className="w-1/2 h-full bg-n-50 text-md font-bold text-n-700 flex flex-col justify-between">
                        <SideBar/>
                    </div>
                </div>
            }
        </>
    );
};

export default Section;