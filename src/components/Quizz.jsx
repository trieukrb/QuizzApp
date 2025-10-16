import React, {useEffect, useState} from 'react';
import {quizData} from './data.jsx'
import Result from "./Result.jsx";
import Navigation from "./Navigation.jsx";
import Question from "./Question.jsx";
import AnswerOptions from "./AnswerOptions.jsx";
import axios from "axios";
import he from 'he'

/**
 * Component Quizz: Chịu trách nhiệm hiển thị và quản lý toàn bộ logic của bài trắc nghiệm.
 */
const Quizz = () => {
    // --- STATE MANAGEMENT --- //

    // `questions`: Lưu trữ danh sách các câu hỏi lấy từ API.
    const [questions, setQuestions] = useState([]);
    // `loading`: Cờ xác định trạng thái tải dữ liệu (true khi đang tải).
    const [loading, setLoading] = useState(true);
    // `error`: Lưu thông báo lỗi nếu không tải được dữ liệu.
    const [error, setError] = useState(null);
    // `quenstionnum`: Chỉ số (index) của câu hỏi hiện tại.
    const [quenstionnum, setQuenstionnum] = useState(0);
    // `selectedAnswers`: Mảng lưu chỉ số câu trả lời người dùng đã chọn cho mỗi câu hỏi.
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    // `score`: Điểm số của người dùng.
    const [score, setScore] = useState(0);
    // `isSubmitted`: Cờ xác định người dùng đã nộp bài hay chưa.
    const [isSubmitted, setIsSubmitted] = useState(false);
    // `selectedOptionIndex`: Chỉ số của câu trả lời đã chọn cho câu hỏi hiện tại.
    const selectedOptionIndex = selectedAnswers[quenstionnum]

    // --- SIDE EFFECTS --- //

    /**
     * `useEffect` để lấy dữ liệu câu hỏi từ API khi component được mount.
     * Dữ liệu sau khi lấy về sẽ được xử lý (decode HTML entities, trộn đáp án) và cập nhật vào state.
     */
    useEffect(() => {
        const fetchQuestions = async () => {
            try{
                const res = await axios.get('http://localhost:3000/questions')
                const questionData = res.data;

                // Trộn ngẫu nhiên các phương án trả lời.
                // formattedQuestions.forEach(q => q.options.sort(() => Math.random() - 0.5));

                // Cập nhật state sau khi xử lý dữ liệu thành công.
                setQuestions(questionData);
                setSelectedAnswers(Array(questionData.length).fill(undefined));
            }
            catch(err){
                setError("Không thể tải được câu hỏi, vui lòng thử lại.");
                console.error("Lỗi khi gọi API:", err);

            } finally {
                // Tắt trạng thái loading sau khi hoàn tất (thành công hoặc thất bại).
                setLoading(false);
            }
        }
        fetchQuestions()
    }, []);

    /**
     * `useEffect` để lắng nghe sự kiện bàn phím cho việc điều hướng và chọn đáp án.
     */
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Phím 1, 2, 3, 4: Chọn đáp án tương ứng.
            if (['1', '2', '3', '4'].includes(e.key)) {
                const index = parseInt(e.key) - 1;
                const option = questions[quenstionnum].options[index];
                if (option) {
                    handleAnswer(option, index);
                }
            }
            // Mũi tên trái: Quay lại câu hỏi trước.
            else if (e.key === 'ArrowLeft') {
                onPrev();
            }
            // Mũi tên phải / Enter: Chuyển câu hỏi tiếp theo hoặc nộp bài.
            else if (e.key === 'ArrowRight' || e.key === 'Enter') {
                if (quenstionnum === questions.length - 1)
                    handlesubmit();
                else {
                    onNext();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        // Dọn dẹp event listener khi component unmount.
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [quenstionnum, selectedAnswers]);

    // --- EVENT HANDLERS --- //

    /**
     * Xử lý khi người dùng chọn một câu trả lời.
     * @param {string} option - Nội dung câu trả lời được chọn.
     * @param {number} index - Chỉ số của câu trả lời trong mảng options.
     */
    const handleAnswer = (option, index) => {
        const newArrayoptions = [...selectedAnswers];
        newArrayoptions[quenstionnum] = index;
        setSelectedAnswers(newArrayoptions);
    };

    /**
     * Chuyển đến câu hỏi phía trước.
     */
    const onPrev = () => {
        setQuenstionnum(prevState => prevState - 1);
    };

    /**
     * Chuyển đến câu hỏi tiếp theo.
     */
    const onNext = () => {
        setQuenstionnum(prevState => prevState + 1);
    };

    /**
     * Xử lý khi người dùng nộp bài. Tính điểm và hiển thị màn hình kết quả.
     */
    const handlesubmit = () => {
        let finalScore = 0;
        selectedAnswers.forEach((answerIndex, questionIndex) => {
            // lấy ra đáp án đúng trong db
            const correctAnswer = questions[questionIndex].answer;
            // lấy ra đáp án người dùng chọn trong array selectedAnswers
            const userAnswer = questions[questionIndex].options[answerIndex];
            // nếu này đúng khớp với nhau thì cộng một điểm
            if (userAnswer === correctAnswer) {
                finalScore++;
            }
        });
        setScore(finalScore);
        setIsSubmitted(true);
    };

    /**
     * Reset lại toàn bộ trạng thái của bài trắc nghiệm để chơi lại.
     */
    const reset = () => {
        setQuenstionnum(0);
        setSelectedAnswers([]);
        setScore(0);
        setIsSubmitted(false);
    };

    // --- CONDITIONAL RENDERING --- //

    // Hiển thị màn hình kết quả nếu đã nộp bài.
    if (isSubmitted) {
        return (
            <Result
                score={score}
                question={questions.length}
                correctarray={selectedAnswers}
                reset={reset}
            />)
    }

    // Hiển thị màn hình loading trong khi tải dữ liệu.
    if (loading) {
        return <div className='container'><h1>Đang tải câu hỏi... ⏳</h1></div>;
    }

    // Hiển thị lỗi nếu không tải được câu hỏi.
    if (error) {
        return <div className='container'><h1>{error} 😥</h1></div>;
    }

    // --- MAIN RENDER --- //

    const currentQuestion = questions[quenstionnum];
    return (
        <div className='container'>
            <h1>App Quizz học tiếng anh của Triều</h1>

            {/* Component hiển thị câu hỏi hiện tại */}
            <Question
                question = {quenstionnum + 1}
                questionData = {currentQuestion.question}
            />

            {/* Component hiển thị các phương án trả lời */}
            <AnswerOptions
                options = {currentQuestion.options}
                selectedOptionIndex = {selectedOptionIndex}
                handleAnswer = {handleAnswer}
            />

            {/* Component hiển thị các nút điều hướng (Trước, Sau, Nộp bài) */}
            <Navigation
                onPrev = {onPrev}
                onNext = {onNext}
                handlesubmit = {handlesubmit}
                isFirstQuestion= {quenstionnum === 0}
                isLastQuestion= {quenstionnum === questions.length - 1}
            />
        </div>
    );
};

export default Quizz;
