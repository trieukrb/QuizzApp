import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
const Result = ({score, question, questions, correctarray,reset}) => {
  return (
     <div className='h-full flex flex-col gap-10 justify-start items-center'>
        <div className="w-5/6 md:w-4/6 p-5 border-2 border-p-300 bg-neutral-50 mt-20 flex flex-col rounded-2xl shadow-lg gap-3">
            <div className='w-full flex flex-col items-center gap-2'>
                <h1 className="font-bold text-3xl">Quiz Completed</h1>
            </div>
            <div className="w-full px-1 flex justify-center gap-10">
                <div className="bg-blue-300/20 p-5 rounded-xl w-full flex flex-col items-center gap-3 text-blue-700 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                    <span className="font-bold text-xl">{score} / {question}</span>
                    <p>Correct Questions</p>
                </div>
                {/*<div className="bg-violet-300/20 p-5 w-full rounded-xl flex flex-col items-center gap-3 text-violet-700 text-center">*/}
                <div className={` p-5 w-full rounded-xl flex flex-col items-center gap-3 text-center ${score < 5 ? (score < 2.5 ?'bg-red-100 text-red-500' :'bg-purple-100 text-purple-500'): (score < 7.5 ?'bg-sky-100 text-sky-500' :'bg-green-100 text-green-500')}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                    </svg>


                    <span className="font-bold text-xl">{parseFloat(((score/question)*10).toFixed(1))} đ</span>
                    {/*<span className="font-bold text-xl">{Math.floor((score/question)*100)}%</span>*/}
                    <p>Your Score</p>
                </div>
            </div>
            <div className="h-100 overflow-y-scroll">
                {questions.map((quiz, numques)  => (
                    <div className={`p-3 rounded-xl mb-5 correct_question ${quiz.options[correctarray[numques]] === quiz.answer ? 'correct_question': 'incorrect_question'}`} key={numques} >
                        <div className='font-bold mb-3 text-center '>{quiz.question}</div>
                        {quiz.options.map((option, index) => (
                            <button
                                className={`result__option  
                            ${correctarray[numques] === index
                                    ?
                                    (quiz.options[correctarray[numques]] === quiz.answer ? 'correct_result' : 'incorrect_result')
                                    : quiz.answer === option ? 'correct_result': '' } `}
                                key={index}
                            >{option}</button>
                        ))
                        }
                    </div>
                ) )}
            </div>
            <div className="flex gap-5 px-5">
                <Link to="/vocabquiz" className="flex text-center gap-3 bg-linear-to-r from-blue-500 to-violet-500 w-full justify-center py-3 rounded-xl text-neutral-100 cursor-pointer hover:opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hidden sm:block">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        <p>Back to Topic</p>
                </Link>
                <div className='flex justify-center text-center gap-3 bg-linear-to-r from-blue-500 to-violet-500 w-full  py-3 rounded-xl text-neutral-100 cursor-pointer hover:opacity-50' onClick={reset}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hidden sm:block">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <p>Take Quiz Again</p>
                </div>
            </div>

        </div>
     </div>
  );
};
export default Result;

