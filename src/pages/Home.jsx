import React, {useEffect, useState} from 'react';
import book1 from '../assets/images/items_img/book1.png';
import book2 from '../assets/images/items_img/book2.png';
import book3 from '../assets/images/items_img/book3.png';
import main_book from '../assets/images/items_img/main_book_img.png'
import main_pencil from '../assets/images/items_img/main_pencil_img.png'
import main_check from '../assets/images/items_img/main_check_img.png'
import {Link} from "react-router-dom";
// import * as path from "node:path";

const Home = () => {
    const images = [book1, book2, book3]

    const [activeIndex, setActiveIndex] = useState(0);

    // --- logic để thay đổi ảnh ---//
    // useEffect này sẽ tự động chuyển ảnh sau mỗi 3 giây
    useEffect(() => {
        const timer = setInterval(() => {
            // Lấy index tiếp theo,
            // dùng phép chia % để quay về 0 nếu đang ở ảnh cuối
            const nextIndex = (activeIndex + 1) % images.length;
            setActiveIndex(nextIndex);
        }, 3000);

        // Dọn dẹp timer khi component bị unmount
        return () => clearInterval(timer);
    }, [activeIndex]);

    return (<div className="z-0 relative w-full h-screen bg-radial from-n-950/10 flex justify-center items-center font-playwrite">
        <div className="flex flex-col justify-center text-center">
            <div className="relative text-shadow-lg/10 text-n-50 font-bold text-6xl md:text-8xl lg:text-9xl">
                <h1>The best place to</h1>
                <div className="hidden animate-float lg:block w-60 h-60 absolute -top-55 -left-35 rotate-15">
                    <img src={main_pencil} alt=""/>
                </div>
                <div className="hidden lg:block w-60 h-60 rounded-full absolute animate-float -top-50 -right-30">
                        <img className=" -top-25 left-2" src={main_book} alt=""/>
                </div>
                <div className="animate-flzoom hidden lg:block absolute -top-30 right-120">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-22 text-purple-400">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"/>
                    </svg>
                </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl mt-13 text-shadow-lg/10 font-bold text-n-50"><span
                className=" text-shadow-sm text-pink-300 font-caveat ">Learn</span> and <span
                className="text-shadow-sm text-amber-300 font-caveat ">Practice</span></h1>
            <p className="mt-7 font-bold text-sm md:text-lg text-shadow-lg/20 text-n-50">Tquizlet is a website designed to learn vocabulary for the TOEIC exam.</p>
            <div className="relative mt-10">
                <Link to='/vocab-quiz'
                      className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                    <div
                        className="absolute inset-0 bg-gradient-to-l from-indigo-400 to-cyan-400 rounded-full transition-all duration-300 group-hover:scale-110 animate-gradient"></div>
                    <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-white blur-xl"></div>
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                        <div className="glitter-container">
                            <div className="glitter"></div>
                            <div className="glitter"></div>
                            <div className="glitter"></div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-0 rounded-full border-2 border-white opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-300"></div>

                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="wave"></div>
                    </div>
                    <span className="relative z-10 flex items-center gap-2">
                            <span className="tracking-wider">Let's get started!</span>
                            <svg
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                fill="none"
                                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1">
                              <path
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                  stroke-width="2"
                                  stroke-linejoin="round"
                                  stroke-linecap="round"/>
                            </svg>
                            <span
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </span>
                </Link>
                <div className="animate-float hidden xl:block absolute w-55 h-55 rounded-full -bottom-30 -right-10 rotate-10">
                    <div className="relative w-full h-full overflow-hidden">
                        {images.map((imgSrc, index) => (<img
                            key={imgSrc}
                            src={imgSrc}
                            alt="slideshow image"
                            className={`rounded-3xl absolute inset-0 w-full h-full object-contain 
                                    transition-opacity duration-700 ease-in-out
                                    ${index === activeIndex ? 'opacity-100' : 'opacity-0'}
                                  `}
                        />))}
                    </div>
                </div>
                <div className="hidden lg:block absolute animate-float rounded-full w-60 h-60 -top-20 -left-20 -rotate-10">
                    <div className="relative">
                        <img className="absolute" src={main_check} alt=""/>
                    </div>
                </div>
                <div className="hidden lg:block absolute top-30 left-80 animate-spins">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-25 text-emerald-400">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>);
};

export default Home;