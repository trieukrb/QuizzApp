import React from 'react';
import {NavLink,Link, Outlet} from "react-router-dom";

const Section = ({nomarlinfo}) => {
    return (
        <section className="min-lg:flex ">
            <div className="p-2 bg-blue-950 mt-15 text-neutral-50 h-[calc(100lvh-3.75rem)] flex flex-col gap-4 max-lg:hidden min-lg:top-15 min-lg:sticky">
                {/*Home*/}
                <NavLink to="/">
                    {({isActive}) => (
                        <div className={`nav-item ${isActive ? 'bg-neutral-500/40' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="size-6 ">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                        </svg>
                        {nomarlinfo ? <span className="min-w-35">Home</span> : ''}
                        </div>)}
                </NavLink>
                <NavLink to="/addquestion">
                    {({isActive}) => (
                        <div className={`nav-item ${isActive ? 'bg-neutral-500/40' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                            </svg>
                            {nomarlinfo ? <span className="min-w-35">Question Manager</span> : ''}
                        </div>)}
                </NavLink>
                <div className="nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    {nomarlinfo ? <span className="min-w-35">Notice</span> : ''}
                </div>
                {/*Play Quizz*/}
                <NavLink to="/quiz-start">
                    {({isActive}) => (
                        <div className={`nav-item ${isActive ? 'bg-neutral-500/40' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>

                            {nomarlinfo ? <span className="min-w-35">Play Quiz</span> : ''}
                        </div>)}
                </NavLink>

                <hr className="text-neutral-50/30"/>
            </div>
            <div className="mt-15 w-full max-lg:mt-0 min-lg:grow">
                    <Outlet/>
            </div>
        </section>
    );
};

export default Section;