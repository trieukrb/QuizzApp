import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebaseConfig.js";
import { useNavigate } from 'react-router-dom';
import useAuthStore from "../../stores/useAuthStore.js";
import Loading from "../../components/Loading.jsx";
import Error from "../../components/Error.jsx";

const QuizStart = () => {
    const navigate = useNavigate()
    const {user} = useAuthStore()
    // state chứa data chính
    const [quesionData, setQuesionData] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // Lấy dữ liệu từ data user
    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true)
            setError(null)
            try{
                if (!user) {
                    navigate('/')
                    return
                }
                // dùng where để lọc lấy dữ liệu từ những data co userId
                // trùng với userid người dùng đang đăng nhập
                const q = query(
                    collection(db, "user_questions"),
                    where("userId", "==", user.uid)
                )
                const querySnapshot = await getDocs(q)
                const fetchedQuestions = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setQuesionData(fetchedQuestions)
            }
            catch (err){
                console.log(err)
                setError(true)
            }
            finally {
                setLoading(false);
            }
        }
        fetchQuestions()
    },[user,navigate])

    if (error){
        return (<Error/>)
    }
    return (
        <div className="h-full flex justify-center items-center" >
            {loading ?
                (<div className="w-9/10 md:w-4/5 lg:w-3/5 p-8 border-2 border-p-400 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3">
                    <Loading/>
                </div>)
                :
                (
                    <div className="w-9/10 md:w-4/5 lg:w-3/5 p-8 border-2 border-p-400 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-3xl font-bold text-n-800">Custom quiz and flash card</h1>
                            <p className="text-n-500">Have fun with your custom topic</p>
                        </div>
                    <div className="flex gap-5 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="bg-p-100 border-2 border-p-400 gap-1 flex flex-col items-center px-5 py-3 rounded-xl">
                                <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>

                                </div>
                                <span className="text-p-500 font-bold text-2xl text-center">{quesionData.length}</span>
                                <div className="text-lg sm:text-xl font-medium">Flash Card</div>
                            </div>
                            <Link to="/flash-card/user_questions" className="">
                                <div className="flex items-center justify-center gap-3 w-full bg-linear-to-r from-blue-500 to-violet-500 transition duration-500 hover:scale-105 hover:opacity-60 px-6 py-2 rounded-xl text-neutral-50 cursor-pointer">
                                    <p className="text-xl font-medium text-center">Start !</p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <div className="bg-p-100 border-2 border-p-400 gap-1 flex flex-col items-center px-5 py-3 rounded-xl">
                                <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                    </svg>
                                </div>
                                <span className="text-p-500 font-bold text-2xl text-center">{quesionData.length}</span>
                                <div className="text-lg sm:text-xl font-medium">Questions</div>
                            </div>
                            <Link to="/quiz/user_questions" className="">
                                <div
                                    className="flex items-center justify-center gap-3 w-full bg-linear-to-r from-blue-500 to-violet-500 transition duration-500 hover:scale-105 hover:opacity-60 px-6 py-2 rounded-xl text-neutral-50 cursor-pointer">
                                    <p className="text-xl font-medium text-center">Start !</p>
                                </div>
                            </Link>
                        </div>
                    </div>

            </div>)}
        </div>
    );
};

export default QuizStart;