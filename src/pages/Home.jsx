import React, {useEffect, useState} from 'react';
import book1 from '../assets/images/items_img/book1.png';
import book2 from '../assets/images/items_img/book2.png';
import book3 from '../assets/images/items_img/book3.png';
import bg_img from '../assets/images/note.png'
import kid_img from '../assets/images/kid.png'
import girl_img from '../assets/images/items_img/girl.png'
import {Link} from "react-router-dom";
import useAuthStore from "../stores/useAuthStore.js";
import * as path from "node:path";

const Home = () => {
    const {user, loading} = useAuthStore();
    // const img_og = [bg_og1, bg_og2, bg_og3, bg_og4, bg_og5, bg_og1, bg_og1, bg_og1, bg_og1, bg_og1, bg_og1 ]
    const images = [book1, book2, book3]

    const [activeIndex, setActiveIndex] = useState(0);

    // useEffect này sẽ tự động chuyển ảnh sau mỗi 3 giây
    useEffect(() => {
        const timer = setInterval(() => {
            // Lấy index tiếp theo,
            // dùng phép chia % để quay về 0 nếu đang ở ảnh cuối
            const nextIndex = (activeIndex + 1) % images.length;
            setActiveIndex(nextIndex);
        }, 3000); // 3000ms = 3 giây

        // Dọn dẹp timer khi component bị unmount
        return () => clearInterval(timer);
    }, [activeIndex]); // Chạy lại effect này mỗi khi activeIndex thay đổi
    //bg-radial from-n-50/50 from-40% to-n-300/50
    return (<div className="z-0 relative w-full h-screen flex justify-center items-center font-playwrite">
        <div className="flex flex-col justify-center text-center">
            <div className="relative text-shadow-lg/10 text-n-800 text-6xl md:text-8xl lg:text-9xl">
                <h1>The best place to</h1>
                <div className="hidden lg:block w-70 h-70 absolute -top-40 -left-60 rotate-15">
                    <img src={bg_img} alt=""/>
                </div>
                <div className="hidden lg:block w-50 h-50 rounded-full shadow-xl/20 bg-purple-500/30 absolute animate-float -top-45 -right-30">
                    <div className="relative w-45 h-45">
                        <img className="absolute -top-25 left-2" src={kid_img} alt=""/>
                    </div>
                </div>
                <div className="hidden lg:block absolute -top-30 right-120">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-22 text-purple-400">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"/>
                    </svg>

                </div>
            </div>
            {/*<div className="flex justify-center">*/}
            {/*    <div className="w-max">*/}
            {/*        <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-p-400 pr-5 text-8xl text-p-400">*/}
            {/*            all in one*/}
            {/*        </h1>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <h1 className="text-5xl md:text-7xl lg:text-8xl mt-10 text-shadow-sm text-n-800"><span
                className=" text-shadow-sm text-pink-300 font-caveat ">Learn</span> and <span
                className="text-shadow-sm text-amber-300 font-caveat ">Practice</span></h1>
            <p className="mt-5 font-medium text-sm  md:text-lg text-shadow-2xs text-n-500">The latest learning methods to help you
                remember longer</p>
            <div className="relative mt-10">
                <Link to='/vocabquiz'
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
                <div className="animate-float hidden lg:block absolute w-65 h-65 bg-n-700/10 backdrop-blur-sm shadow-xl/20 rounded-full -bottom-50 -right-10 rotate-10">
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
                <div className="hidden lg:block absolute bg-purple-400/20 backdrop-blur-sm animate-float shadow-xl rounded-full w-80 h-80 -top-20 -left-20">
                    <div className="relative">
                        <img className="absolute" src={girl_img} alt=""/>
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
            {/*<div className="mt-10">*/}
            {/*    <Link to='/vocalquiz' className=" bg-p-200 px-7 py-4 rounded-3xl">Let's try now !</Link>*/}
            {/*</div>*/}
        </div>

        {/*<div className=" text-center">*/}
        {/*    {user ? <p>Hello {user.email}</p> : <p>Hello</p>}*/}
        {/*    <h1 className="font-bold text-2xl">How are you feeling today?</h1>*/}
        {/*    <p className="text-n-600">wedday, apt, sdf</p>*/}
        {/*</div>*/}
        {/*<div className="mt-10">*/}
        {/*    <div className="flex gap-3 justify-between items-center">*/}
        {/*        <div>*/}
        {/*            <h1 className="text-xl font-bold mb-2">TQuizlet</h1>*/}
        {/*            <p className="text-md font-medium text-n-600">The latest learning methods to help you remember longer</p>*/}
        {/*        </div>*/}
        {/*        <Link to='vocalquiz' className="px-5 py-2 rounded-xl bg-p-200">Let's Try</Link>*/}
        {/*    </div>*/}
        {/*    <ul className="w-full flex flex-col md:flex-row gap-5 mt-5">*/}
        {/*        <li className="bg-p-100 border-1 border-p-400 p-3 w-full rounded-lg flex items-center gap-3">*/}
        {/*            <div className="bg-n-50/60 p-2 rounded-md">*/}
        {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">*/}
        {/*                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />*/}
        {/*                </svg>*/}
        {/*            </div>*/}
        {/*            <p className="text-sm ">Learn with Flash Card</p>*/}
        {/*        </li>*/}
        {/*        <li className="bg-p-100 border-1 border-p-400 p-3 w-full rounded-lg flex items-center gap-3">*/}
        {/*            <div className="bg-n-50/60 p-2 rounded-md">*/}
        {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">*/}
        {/*                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />*/}
        {/*                </svg>*/}
        {/*            </div>*/}
        {/*            <p className="text-sm md:text-md">Learn with Flash Card</p>*/}
        {/*        </li>*/}
        {/*        <li className="bg-p-100 border-1 border-p-400 p-3 w-full rounded-lg flex items-center gap-3">*/}
        {/*            <div className="bg-n-50/60 p-2 rounded-md">*/}
        {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">*/}
        {/*                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />*/}
        {/*                </svg>*/}
        {/*            </div>*/}
        {/*            <p className="">Learn with Flash Card</p>*/}
        {/*        </li>*/}
        {/*    </ul>*/}
        {/*</div>*/}
        {/*/!*second*!/*/}
        {/*<div className="mt-20">*/}
        {/*    <div className="flex justify-between items-center">*/}
        {/*        <div>*/}
        {/*            <h1 className="text-xl font-bold mb-2">Content From Famous books</h1>*/}
        {/*            <p className="text-md font-medium text-n-600">The latest learning methods to help you remember longer</p>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <ul className="w-full flex flex-row md:flex-row gap-5 mt-5">*/}
        {/*        <li className=" p-3 w-full rounded-lg flex flex-col justify-between items-center gap-3">*/}
        {/*            <img className="rounded-2xl" src={book1} alt=""/>*/}
        {/*            <p>Learn with Flash Card</p>*/}
        {/*        </li>*/}
        {/*        <li className=" p-3 w-full rounded-lg flex flex-col justify-between items-center gap-3">*/}
        {/*            <img className="rounded-2xl" src={book2} alt=""/>*/}
        {/*            <p>Learn with Flash Card</p>*/}
        {/*        </li>*/}
        {/*        <li className=" p-3 w-full rounded-lg flex flex-col justify-between items-center gap-3">*/}
        {/*            <img className="rounded-2xl object-cover " src={book3} alt=""/>*/}
        {/*            <p>Learn with Flash Card</p>*/}
        {/*        </li>*/}
        {/*    </ul>*/}
        {/*</div>*/}
        {/*<div className=" text-center">*/}
        {/*    <p>heLLO Trieu</p>*/}
        {/*    <h1 className="font-bold text-2xl">How are you feeling today?</h1>*/}
        {/*    <p className="text-n-600">wedday, apt, sdf</p>*/}
        {/*    /!*<div className="grid grid-rows-4 grid-cols-3 gap-5">*!/*/}
        {/*    /!*    <div className="bg-p-200">1</div>*!/*/}
        {/*    /!*    <div className="bg-p-200">2</div>*!/*/}
        {/*    /!*    <div className="bg-p-200">3</div>*!/*/}
        {/*    /!*    <div className="bg-p-200">4</div>*!/*/}
        {/*    /!*    <div className="bg-p-200">5</div>*!/*/}
        {/*    /!*</div>*!/*/}


        {/*    /!*Main layout*!/*/}
        {/*    <div className="flex flex-col md:grid grid-cols-3 grid-rows-4 gap-5 mt-5 ">*/}
        {/*        <div style={{ backgroundImage: `url(${bg_img})` }} className="bg-cover transition duration-300 hover:scale-102 bg-amber-100 rounded-xl col-span-2 row-span-2 h-full flex">*/}
        {/*            <div className="shadow-md/10 relative rounded-xl w-full h-full bg-gradient-to-b from-n-50/30 to-n-900/40">*/}
        {/*                <Link to='/vocalquiz' className="absolute bottom-18 right-30 bg-p-200 border-1 border-p-400 px-5 py-2 rounded-3xl cursor-pointer transition duration-300 hover:bg-p-300 hover:scale-105">Learn now !</Link>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className="shadow-md/10 transition duration-300 hover:scale-102 bg-yellow-300 rounded-xl col-start-3">2</div>*/}
        {/*        <div className="shadow-md/10 transition duration-300 hover:scale-102 bg-green-300 rounded-xl col-start-3 row-start-2">3</div>*/}
        {/*        <div className="shadow-md/10 transition duration-300 hover:scale-102 bg-orange-300 rounded-xl row-span-2 row-start-3 p-2 flex flex-col gap-3 h-120 md:h-60 lg:h-90">*/}
        {/*            <h1 className="font-bold text-center text-xl text-n-700">Result form all books</h1>*/}
        {/*            <div className="relative w-full h-full overflow-hidden">*/}
        {/*                {images.map((imgSrc, index) => (*/}
        {/*                    <img*/}
        {/*                        key={imgSrc}*/}
        {/*                        src={imgSrc}*/}
        {/*                        alt="slideshow image"*/}
        {/*                        className={`rounded-3xl absolute inset-0 w-full h-full object-contain */}
        {/*                            transition-opacity duration-700 ease-in-out*/}
        {/*                            ${index === activeIndex ? 'opacity-100' : 'opacity-0'}*/}
        {/*                          `}*/}
        {/*                    />*/}
        {/*                ))}*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className=" transition duration-300 hover:scale-102 bg-pink-300 rounded-xl col-span-2 row-span-2 row-start-3 ">*/}
        {/*            <div className="relative h-120 md:h-60 lg:h-90 overflow-hidden flex p-5 items-end">*/}
        {/*                <div>*/}
        {/*                    <h1 className="text-n-800 font-bold text-xl">Contents</h1>*/}
        {/*                    <p className="text-n-500 text-sm">Content from major <br/> organizations around the world</p>*/}
        {/*                </div>*/}
        {/*                <ul className="absolute right-1 w-3/6 h-full overflow-hidden grid grid-cols-2 grid-rows-3 gap-7 -rotate-15">*/}
        {/*                    /!*{*!/*/}
        {/*                    /!*    img_og.map((img,index) => (*!/*/}

        {/*                    /!*        )*!/*/}
        {/*                    /!*    )*!/*/}
        {/*                    /!*}*!/*/}
        {/*                    <li className="shadow-md rounded-xl w-30 h-20 bg-n-100 flex justify-center items-center p-2"><img src={bg_og} alt=""/></li>*/}
        {/*                    <li className="shadow-md rounded-xl w-30 h-20 bg-yellow-300 flex justify-center items-center p-2"><img src={bg_og} alt=""/></li>*/}
        {/*                    <li className="shadow-md rounded-xl w-30 h-20 bg-yellow-300 flex justify-center items-center p-2"><img src={bg_og} alt=""/></li>*/}
        {/*                    <li className="shadow-md rounded-xl w-30 h-20 bg-yellow-300 flex justify-center items-center p-2"><img src={bg_og} alt=""/></li>*/}
        {/*                    <li className="shadow-md rounded-xl w-30 h-20 bg-yellow-300 flex justify-center items-center p-2"><img src={bg_og} alt=""/></li>*/}
        {/*                    <li className="shadow-md rounded-xl w-30 h-20 bg-yellow-300 flex justify-center items-center p-2"><img src={bg_og} alt=""/></li>*/}

        {/*                </ul>*/}
        {/*            </div>*/}

        {/*        </div>*/}
        {/*    </div>*/}


        {/*</div>*/}
    </div>);
};

export default Home;