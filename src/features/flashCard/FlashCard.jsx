import React, {useEffect, useState, useRef} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import hoverSound from "../../assets/sound/flipcard-91468.mp3";

const FlashCard = () => {
    const {topicName} = useParams()
    const [vocabs, setVocabs] = useState([]);
    const [isFlipped, setIsFlipped] = useState(false);
    const [vocabsNum, setVocabsNum] = useState(0)

    useEffect(() => {
        const fetchVocabs = async () => {
            try{
                const res = await axios.get(`http://localhost:3000/${topicName}`)
                setVocabs(res.data)
            }
            catch(err){
                console.log("loi", err)
            }
        }
        fetchVocabs()
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);
    const audioRef = useRef(null);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }
    }, []);
    const timeoutRef = useRef(null);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => {
                console.error("Lỗi phát âm thanh:", error);
            });
        }
    };
    const handlePrev = () => {
        setIsFlipped(false)
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setVocabsNum(prevState => prevState - 1)
        }, 200)
    }
    const handleNext = () => {
        setIsFlipped(false)
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setVocabsNum(prevState => prevState + 1)
        }, 200)
    }

    const currentVocabs = vocabs[vocabsNum];
    const precentageQuestions = ((vocabsNum+1) / vocabs.length) * 100



    return (
        <div className="flex justify-center items-center">
            <div className="my-15 md:my-20 w-4/5 md:w-3/4 lg:w-8/10 lg:max-w-6xl  p-5 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3 relative">
                <Link to="/vocalquiz" className="absolute left-5 top-3 px-3 py-1 border-2 cursor-pointer border-p-500 transition duration-300 hover:bg-p-200 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </Link>
                <h3 className="my-4 text-xl font-bold">Toeic Vocabulary</h3>
                <div className="w-full h-2 bg-neutral-300 rounded-lg">
                    <div className="bg-linear-to-r from-fuchsia-400 to-sky-400 h-full rounded-lg" style={{width: `${precentageQuestions}%`}}></div>
                </div>
                {vocabs.length ? (
                    <div>
                        <div
                            className="w-60 sm:w-75 lg:w-100 h-120 sm:h-150 [perspective:1000px] cursor-pointer"
                            onClick={handleClick}>
                            <div
                                className={`relative w-full h-full transition-transform duration-500 ] [transform-style:preserve-3d] ${isFlipped ? 'rotate-y-180' : ''}`}>
                                <div className="absolute w-full h-full bg-blue-500 text-white rounded-lg flex items-center justify-center p-4 backface-hidden">
                                    <h2 className="text-3xl font-bold text-center">
                                        {currentVocabs.question}
                                    </h2>
                                </div>
                                <div className="absolute w-full h-full bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-center p-4 rotate-y-180 backface-hidden">
                                    <h2 className="text-2xl font-bold text-center">
                                        {currentVocabs.answer}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between gap-2 mt-3 font-medium">
                            {vocabsNum === 0 ?
                                <button className="px-5 py-1  rounded-lg cursor-default border-2 border-p-500 opacity-30" disabled>Previous</button>
                                :
                                <button className="px-5 py-1 transition duration-400 hover:scale-105 rounded-lg hover:bg-p-200 cursor-pointer border-2 border-p-500" onClick={handlePrev}>Previous</button>
                            }
                            {vocabsNum+1 === vocabs.length ?
                                <button className="px-5 py-1  rounded-lg cursor-default border-2 border-p-500 opacity-30" disabled>Next</button>
                                :
                                <button className="px-5 py-1 transition duration-400 hover:scale-105 rounded-lg hover:bg-p-200 cursor-pointer border-2 border-p-500" onClick={handleNext}>Next</button>
                            }
                        </div>
                    </div>

                ) : <p>Đang tải dữ liệu...</p>}
                <audio ref={audioRef}
                       src={hoverSound}
                       preload="auto"/>
            </div>

        </div>
    );
};

export default FlashCard;