import React, {useEffect, useState} from 'react';
import {quizData} from './data.jsx'
import Result from "./Result.jsx";
import Navigation from "./Navigation.jsx";
import Question from "./Question.jsx";
import AnswerOptions from "./AnswerOptions.jsx";

/**
 * Component Quizz chịu trách nhiệm hiển thị giao diện bài trắc nghiệm,
 * xử lý logic và quản lý trạng thái của bài làm.
 */
const Quizz = () => {
    // =================================================================================================================
    // STATE MANAGEMENT (Quản lý trạng thái)
    // =================================================================================================================

    // Chỉ số của câu hỏi hiện tại
    const [quenstionnum, setQuenstionnum] = useState(0);
    // Mảng lưu chỉ số câu trả lời đã chọn cho mỗi câu hỏi
    const [Arrayoptions, setArrayoptions] = useState(Array.from({length: quizData.length}));
    // Điểm số của người dùng
    const [score, setScore] = useState(0);
    // Cờ xác định đã nộp bài hay chưa, để hiển thị component Result
    const [isSubmitted, setIsSubmitted] = useState(false);
    // Cờ xác định có quay về trang chủ hay không
    const [isHome, setIsHome] = useState(false);
    // Lấy chỉ số câu trả lời đã chọn cho câu hỏi hiện tại từ mảng Arrayoptions
    const selectedOptionIndex = Arrayoptions[quenstionnum]
    // =================================================================================================================
    // HANDLERS (Hàm xử lý sự kiện)
    // =================================================================================================================

    /**
     * Xử lý khi người dùng chọn một câu trả lời.
     * @param {string} option - Nội dung câu trả lời được chọn.
     * @param {number} index - Chỉ số của câu trả lời trong mảng options.
     */
    const handleAnswer = (option, index) => {
        const newArrayoptions = [...Arrayoptions];
        newArrayoptions[quenstionnum] = index;
        setArrayoptions(newArrayoptions);
    };

    /**
     * Chuyển đến câu hỏi phía trước.
     * Nếu đang ở câu đầu tiên, sẽ quay về trang chủ.
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
     * Xử lý khi người dùng nộp bài.
     * Tính điểm và hiển thị màn hình kết quả.z
     */
    const handlesubmit = () => {
        let scores = 0;
        Arrayoptions.forEach((ans, index) => {
            if (quizData[index].options[ans] === quizData[index].answer) {
                scores++;
            }
        });
        setScore(scores);
        setIsSubmitted(true);
    };

    /**
     * Reset lại toàn bộ trạng thái của bài trắc nghiệm để chơi lại.
     */
    const reset = () => {
        setQuenstionnum(0);
        setArrayoptions(Array.from({length: quizData.length}));
        setScore(0);
        setIsSubmitted(false);
        setIsHome(false);
    };

    // =================================================================================================================
    // EFFECTS (Xử lý hiệu ứng phụ)
    // =================================================================================================================

    // Lắng nghe sự kiện bàn phím để điều khiển bài trắc nghiệm.
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Chọn đáp án bằng phím 1, 2, 3, 4
            if (['1', '2', '3', '4'].includes(e.key)) {
                const index = parseInt(e.key) - 1;
                const option = quizData[quenstionnum].options[index];
                if (option) {
                    handleAnswer(option, index);
                }
            }
            // Quay lại câu trước bằng mũi tên trái
            else if (e.key === 'ArrowLeft') {
                onPrev();
            }
            // Nộp bài hoặc tới câu tiếp theo bằng mũi tên phải
            else if (e.key === 'ArrowRight') {
                if (quenstionnum === quizData.length - 1)
                    handlesubmit();
                else {
                    onNext();
                }
            }
            // Nộp bài hoặc tới câu tiếp theo bằng Enter
            else if (e.key === 'Enter') {
                if (quenstionnum === quizData.length - 1)
                    handlesubmit();
                else {
                    onNext();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        // Dọn dẹp listener khi component bị unmount
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [quenstionnum, Arrayoptions]); // Phụ thuộc vào câu hỏi hiện tại và mảng câu trả lời

    // =================================================================================================================
    // CONDITIONAL RENDERING (Hiển thị có điều kiện)
    // =================================================================================================================

    // Nếu đã nộp bài, hiển thị component Result
    if (isSubmitted) {
        return (
            <Result
                score={score}
                question={quizData.length}
                correctarray={Arrayoptions}
                reset={reset}
            />)
    }

    // Nếu chọn quay về trang chủ, hiển thị component isHome

    // =================================================================================================================
    // MAIN RENDER (Giao diện chính)
    // =================================================================================================================

    return (
        <div className='container'>
            <h1>App Quizz học tiếng anh của Triều</h1>
            {/* Hiển thị câu hỏi hiện tại */}
            <Question
                question = {quenstionnum + 1}
                questionData = {quizData[quenstionnum].question}
            />

            <AnswerOptions
                options = {quizData[quenstionnum].options}
                selectedOptionIndex = {selectedOptionIndex}
                quenstionnum = {quenstionnum}
                handleAnswer = {handleAnswer}
            />
            {/* Các nút điều hướng */}
            <Navigation
                onPrev = {onPrev}
                onNext = {onNext}
                datalength = {quizData.length}
                quenstionnum = {quenstionnum}
                handlesubmit = {handlesubmit}
            />
        </div>
    );
};

export default Quizz;
