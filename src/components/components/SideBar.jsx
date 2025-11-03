import React, {useState} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore.js";
import { auth } from '../../firebaseConfig'; // Import auth
import { signOut } from 'firebase/auth'; // Import hàm đăng xuất
const SideBar = () => {
    // Đọc trạng thái từ store
    const { user, loading } = useAuthStore();
    const navigate = useNavigate();

    // Hàm xử lý khi nhấn nút Đăng Xuất
    const handleLogout = async () => {
        try {
            await signOut(auth); // Gọi hàm đăng xuất của Firebase
            // "Người gác cổng" (ở App.jsx) sẽ tự động phát hiện
            // và cập nhật store, giao diện sẽ tự thay đổi.
            navigate('/'); // Chuyển về trang login
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
        }
    };
    // Khi "người gác cổng" đang kiểm tra, ta không hiển thị gì
    if (loading) {
        return <div>Đang tải...</div>;
    }
    return (
        <>
            <div className="px-4 flex flex-col gap-3">
                <h1 className="font-bold text-3xl text-center py-6">TQuizlet</h1>
                <NavLink to="/">
                    {({isActive}) => (
                        <div className={`nav-item ${isActive ? 'bg-p-100/70 border-1 border-solid border-p-500' : 'hover:bg-n-300/30 hover:shadow-lg transition delay-70 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102'}`}>
                            <div className="w-9 h-9 sm:w-10 sm:h-10 p-2 bg-p-200 border-solid border-1 border-p-400 rounded-full overflow-hidden cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 h-full w-full rounded-full text-p-800">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                </svg>
                            </div>
                            <span className="min-w-20 sm:min-w-35 text-left">Home</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hidden sm:block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>)}
                </NavLink>
                <NavLink to="/vocalquiz">
                    {({isActive}) => (
                        <div className={`nav-item ${isActive ? 'bg-p-100/70 border-1 border-solid border-p-500 ' : 'hover:bg-n-300/30 hover:shadow-lg transition delay-70 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102'}`}>
                            <div className="w-9 h-9 sm:w-10 sm:h-10 p-2 bg-p-200 border-solid border-1 border-p-400 rounded-full overflow-hidden cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-full w-full rounded-full text-p-800">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                            </div>
                            <span className="min-w-20 sm:min-w-35 text-left">Vocabulary Topic</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hidden sm:block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>)}
                </NavLink>
                <NavLink to="/addquestion">
                    {({isActive}) => (
                        <div className={`nav-item ${isActive ? 'bg-p-100/70 border-1 border-solid border-p-500' : 'hover:bg-n-300/30 hover:shadow-lg transition delay-70 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102 '}`}>
                            <div className="w-9 h-9 sm:w-10 sm:h-10 p-2 bg-p-200 border-solid border-1 border-p-400 rounded-full overflow-hidden cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-full w-full rounded-full text-p-800">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                </svg>
                            </div>
                            <span className="min-w-20 sm:min-w-35 text-left">Question Manager</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hidden sm:block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>)}
                </NavLink>

                {/*Play Quizz*/}
                <NavLink to="/quiz-start">
                    {({isActive}) => (
                        <div className={`nav-item ${isActive ? 'bg-p-100/70 border-1 border-solid border-p-500' : 'hover:bg-n-300/30 hover:shadow-lg transition delay-70 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102'}`}>
                            <div className="w-9 h-9 sm:w-10 sm:h-10 p-2 bg-p-200 border-solid border-1 border-p-400 rounded-full overflow-hidden cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-full w-full rounded-full text-p-800">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                </svg>
                            </div>
                            <span className="min-w-20 sm:min-w-35 text-left">Play Quiz</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hidden sm:block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>)}

                </NavLink>
            </div>
            <div className="px-4 py-2 mb-5">
                {/*<div className="relative cursor-default" onClick={() => setIsShowLogoutForm(!isShowLogoutForm)}>*/}
                {/*    <span className="">{user.email}</span>*/}
                {/*    /!*{isShowLogoutForm && <button className="absolute bg-p-200 rounded-2xl right-0 -top-10 w-full py-2" onClick={handleLogout}>logout</button>}*!/*/}
                {/*    <button className="bg-p-200 rounded-2xl w-full py-2" onClick={handleLogout}>logout</button>*/}
                {/*</div>*/}
                {/*<Link to="/register" className="w-5">*/}
                {/*    Register*/}
                {/*</Link>*/}
                {/*<div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hidden sm:block">*/}
                {/*    <img className="h-full w-full rounded-full object-cover" src="src/assets/Images/img.png" alt=""/>*/}
                {/*</div>*/}
                {/*<p className="font-medium text-sm sm:text-md">sostrieu@gmail.com</p>*/}
                {user ? (
                    // TRƯỜNG HỢP 1: ĐÃ ĐĂNG NHẬP
                    <div className="px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                        <span>{user.email}</span> {/* Hiển thị email user */}
                        <div className="flex justify-center w-full sm:w-auto border-2 border-p-500 p-2 rounded-xl cursor-pointer transition duration-300 hover:bg-p-200 hover:scale-105" onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    // TRƯỜNG HỢP 2: CHƯA ĐĂNG NHẬP
                    <div className="w-full flex justify-center gap-5">
                        <NavLink to="/login" className=" px-3 py-1 rounded-xl text-center border-1 bg-p-100 shadow-xl border-p-500 cursor-pointer transition duration-300 hover:shadow-xl/20 hover:scale-105">Đăng Nhập</NavLink>
                        <NavLink to="/register" className=" px-3 py-1 rounded-xl text-center border-1 bg-p-100 shadow-xl border-p-500 cursor-pointer transition duration-300 hover:shadow-xl/20 hover:scale-105">Đăng Ký</NavLink>
                    </div>
                )}
            </div>
        </>
    );
};

export default SideBar;