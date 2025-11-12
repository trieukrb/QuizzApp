import React, {useState} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import SideBar from "./SideBar.jsx";

const Layout = () => {
    // widthside: chiều dài của sidebar
    const [widthside, setWidthside] = useState(300)
    // isShowSidebar: trạng thái của sidebar
    const [isShowSidebar, setIsShowSidebar] = useState(false)

    // --- Logic thay đổi class --- //
    // gọi hook location
    const location = useLocation();
    // currentPath lấy ra vị trí hiện tại đừng dẫn đang ở
    const currentPath = location.pathname;
    // tạo một class mặt định và một class linh hoạt để gán khi đường dẫn thay đổi
    const baseClass = "flex-1 h-screen flex flex-col relative";
    let dynamicClass = "";
    // nếu đường dẫn là / thì áp dụng và còn lại
    if (currentPath === '/') {
        dynamicClass = "overflow-visible";
    } else  {
        dynamicClass = "overflow-y-auto";
    }

    // --- Logic của sidebar --- //
    // Màn hình lớn: Điều kiệu nếu giá trị cũ là 1 thì return 300 và ngược lại là 1
    const handleHideSideBar = () => {
        setWidthside(prev => prev === 1 ? 300 : 1 )
    }
    //Màn hình nhỏ: ẩn hiện sidebar
    const handleShowSideBar = () => {
        setIsShowSidebar(!isShowSidebar)
    }

    return (
        <>
            <div className="flex  bg-radial from-n-500/10 to-n-100/10  h-screen overflow-hidden">
                <div className="h-full overflow-hidden flex-col justify-between z-10 bg-n-50 text-md font-bold text-n-700 relative shadow-2xl/50 hidden md:flex"
                     style={{width: `${widthside}px`}}>
                    {/*Home*/}
                    <SideBar/>
                </div>
                <div className={`${baseClass} ${dynamicClass}`}>
                    {/*Show sidebar in large screen*/}
                    <button className={`fixed hidden md:block z-10 ${widthside === 1 ? ('top-3 left-4') : ('top-3 left-80')}`}
                            onClick={handleHideSideBar}>
                        <div className="text-n-700 bg-n-100 transition duration-300 hover:scale-105 hover:bg-p-100  border-2 border-p-500 p-1 rounded-md cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    </button>
                    {/*Show sidebar in small screen*/}
                    <button className={`${isShowSidebar ? 'hidden' : 'fixed top-3 left-4 z-10 block md:hidden'}`}
                            onClick={handleShowSideBar}>
                        <div className="text-n-700 bg-n-100 border-2 border-p-500 p-1 rounded-md cursor-pointer">
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
                    <div className="w-1/2 h-full bg-n-50 text-md font-bold text-n-700 flex flex-col justify-between">
                        <SideBar/>
                    </div>
                </div>
            }
        </>
    );
};

export default Layout;