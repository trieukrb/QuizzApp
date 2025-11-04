import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const QuizzStart = () => {
    const [quesionData, setQuesionData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get("http://localhost:3000/custom")
                setQuesionData(res.data)
            }
            catch (err){
                console.log("Lỗi mạng", err)
            }
        }
        fetchData()
    }, []);
    return (
        <div className="h-full flex justify-center items-center" >
            <div className="w-4/5 md:w-3/5 lg:w-2/5 p-5 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3">
                <div className="w-17 h-17 rounded-full overflow-hidden cursor-pointer p-2 bg-linear-to-r from-violet-200 to-fuchsia-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-full w-full rounded-full object-cover">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                </div>
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-3xl font-bold text-n-800">Quiz test your knowlege</h1>
                    <p className="text-n-500">Make this quiz make you more smart</p>
                </div>
                <div className="bg-p-200 gap-1 flex flex-col items-center px-5 py-3 rounded-xl">
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                    <span className="text-p-500 font-bold text-2xl text-center">{quesionData.length}</span>
                    <div className="text-lg sm:text-xl font-medium">Questions</div>
                </div>
                <Link to="/quiz/user_questions" className="">
                    <div className="flex items-center justify-center gap-3 w-full bg-linear-to-r from-blue-500 to-violet-500 transition duration-500 hover:scale-105 hover:opacity-60 px-6 py-2 rounded-xl text-neutral-50 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 hidden md:block">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                        <p className="text-xl font-medium text-left">Play</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default QuizzStart;