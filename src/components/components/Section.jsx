import React, {useState} from 'react';
import {NavLink,Link, Outlet} from "react-router-dom";
import SideBar from "./SideBar.jsx";

const Section = ({nomarlinfo}) => {
    const [widthside, setWidthside] = useState(250)
    const [isShowSidebar, setIsShowSidebar] = useState(false)
    const handleHideSideBar = () => {
        setWidthside(prev => prev === 1 ? 250 : 1 )
    }
    const handleShowSideBar = () => {
        setIsShowSidebar(!isShowSidebar)
    }
    return (
        <>
            <div className="bg-neutral-100 flex h-screen overflow-hidden">
                <div className="h-full overflow-hidden flex-col justify-between bg-blue-950 text-neutral-50 relative hidden md:flex"
                     style={{width: `${widthside}px`}}>
                    {/*Home*/}
                    <SideBar/>
                </div>
                <div className="flex-1 h-screen flex flex-col relative overflow-y-scroll">
                    {/*Show side bar in large screen*/}
                    <button className="absolute top-3 left-4 hidden md:block"
                            onClick={handleHideSideBar}>
                        <div className="text-neutral-100 bg-blue-950 p-1 rounded-md cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    </button>
                    {/*Show side bar in small screen*/}
                    <button className="absolute top-3 left-4 md:hidden"
                            onClick={handleShowSideBar}>
                        <div className="text-neutral-100 bg-blue-950 p-1 rounded-md cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    </button>
                    <Outlet/>
                </div>
            </div>
            {
                isShowSidebar &&
                <div className="fixed top-0 right-0 left-0 bottom-0 bg-neutral-500/30 flex justify-start items-center md:hidden" onClick={() => setIsShowSidebar(false)}>
                    <div className="w-1/2 h-full bg-blue-950 flex flex-col justify-between text-neutral-100">
                        <SideBar/>
                    </div>
                </div>
            }
        </>
    );
};

export default Section;