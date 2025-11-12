import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import useAuthStore from "../../stores/useAuthStore.js";
import Loading from "../../components/Loading.jsx";
import hoverSound from "../../assets/sound/flipcard-91468.mp3";
import ProgressBar from "./components/ProgressBar.jsx";
import Card from "./components/Card.jsx";
import CardNavigation from "./components/CardNavigation.jsx";
import Error from "../../components/Error.jsx";

const FlashCard = () => {
    //topicName: là đường dẫn từ component VocabHome truyền vào
    const { topicName } = useParams();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // vocabs: là dữ liệu của data
    const [vocabs, setVocabs] = useState([]);
    // isFlipped trạng thái của thẻ
    const [isFlipped, setIsFlipped] = useState(false);
    // currentVocabIndex: số thứ tự câu hỏi hiện tại
    const [currentVocabIndex, setCurrentVocabIndex] = useState(0);

    const audioRef = useRef(null);
    const timeoutRef = useRef(null);

    // --- Lấy dữ liệu câu hỏi từ db --- //
    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setError(null);
            // tại biến q để lọc điều kiện nếu người dùng chưa đăng nhập (!user)
            // thì không tải dữ liệu từ collection(db) user_questions (dự liệu ca nhân mỗi user)
            try {
                let q;
                if (topicName === 'user_questions') {
                    //không phải user (chưa đang nhập) thì trả về login và dùng
                    if (!user) {
                        navigate('/login');
                        return;
                    }
                    // nếu topic là user_questions thì tải câu hỏi từ collection user_questions
                    q = query(collection(db, "user_questions"), where("userId", "==", user.uid));
                } else {
                    //tải cau hỏi từ topicName truyền vào
                    q = query(collection(db, topicName));
                }
                // lấy câu hỏi từ db và set và state 'vocabs'
                const querySnapshot = await getDocs(q);
                const fetchedQuestions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setVocabs(fetchedQuestions);
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [topicName, user, navigate]);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    //xử lý mức âm lượng khi lật thẻ
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }
    }, []);

    //xử lý viện click vào thẻ
    const handleCardClick = () => {
        // set trạng thái lật
        setIsFlipped(!isFlipped);
        // xử lý âm thanh
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => {
                console.error("Error sound", error);
            });
        }
    };

    // xử lý lùi thẻ
    const handlePrev = () => {
        setIsFlipped(false);
        clearTimeout(timeoutRef.current);
        // xử lý việc delay khi tiến thẻ vì hiệu ứng lậy card có duration nên cần delay
        // việc lậy thẻ lại trước khi tiến sang thẻ khác để tránh lộ nội dung thẻ tiếp theo
        timeoutRef.current = setTimeout(() => {
            setCurrentVocabIndex(prev => prev - 1);
        }, 200);
    };
    // xử lý tiến thẻ
    const handleNext = () => {
        setIsFlipped(false);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrentVocabIndex(prev => prev + 1);
        }, 200);
    };

    const currentVocab = vocabs[currentVocabIndex];

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="my-15 md:my-20 w-4/5 md:w-3/4 lg:w-8/10 lg:max-w-6xl p-5 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3 relative">
                    <Loading />
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center">
                <div className="my-15 md:my-20 w-4/5 md:w-3/4 lg:w-8/10 lg:max-w-6xl p-5 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3 relative">
                    <Error/>
                </div>
            </div>
        );
    }
    return (
        <div className="flex justify-center items-center">
            <div className="my-15 md:my-20 w-4/5 md:w-3/4 lg:w-8/10 lg:max-w-6xl p-5 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3 relative">
                <Link to={`${topicName === 'user_questions' ? '/quiz-start' : '/vocab-quiz'}`}
                      className="absolute left-5 top-3 px-3 py-1 border-2 cursor-pointer border-p-500 transition duration-300 hover:bg-p-200 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </Link>
                <h3 className="mb-2 mt-8 text-xl font-bold">Topic {topicName}</h3>
                <ProgressBar current={currentVocabIndex + 1} total={vocabs.length} />
                
                {vocabs.length > 0 ? (
                    <div>
                        <Card
                            isFlipped={isFlipped}
                            onClick={handleCardClick}
                            frontContent={currentVocab.question}
                            backContent={currentVocab.answer}
                        />
                        <CardNavigation
                            onPrev={handlePrev}
                            onNext={handleNext}
                            isFirst={currentVocabIndex === 0}
                            isLast={currentVocabIndex + 1 === vocabs.length}
                        />
                    </div>
                ) : (
                    <p>There are no words in this topic.</p>
                )}
                
                <audio ref={audioRef} src={hoverSound} preload="auto" />
            </div>
        </div>
    );
};

export default FlashCard;
