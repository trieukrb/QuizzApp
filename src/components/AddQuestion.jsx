import React, {useEffect, useState} from 'react';
import {quizData} from "./data.jsx";
import {Link} from "react-router-dom";
import axios from "axios";

const AddQuestion = () => {
    const [questions, setQuestions] = useState([]);
    // `loading`: Cờ xác định trạng thái tải dữ liệu (true khi đang tải).
    const [loading, setLoading] = useState(true);
    // `error`: Lưu thông báo lỗi nếu không tải được dữ liệu.
    const [error, setError] = useState(null);
    const [questionValue, setQuestionValue] = useState("")
    const [answerValue1, setAnswerValue1] = useState("")
    const [answerValue2, setAnswerValue2] = useState("")
    const [answerValue3, setAnswerValue3] = useState("")
    const [answerValue4, setAnswerValue4] = useState("")
    const [correctAnswerValue, setCorrectAnswerValue] = useState("")


    useEffect(() => {
        const fetchQuestions = async () => {
            try{
                const res = await axios.get('http://localhost:3000/questions')
                const questionData = res.data;
                // Trộn ngẫu nhiên các phương án trả lời.
                // formattedQuestions.forEach(q => q.options.sort(() => Math.random() - 0.5));

                // Cập nhật state sau khi xử lý dữ liệu thành công.
                setQuestions(questionData);

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
    // Hiển thị màn hình loading trong khi tải dữ liệu.
    if (loading) {
        return <div className='container'><h1>Đang tải câu hỏi... ⏳</h1></div>;
    }

    // Hiển thị lỗi nếu không tải được câu hỏi.
    if (error) {
        return <div className='container'><h1>{error} 😥</h1></div>;
    }


    const handleSubmit =async (event) => {
        event.preventDefault();
        const newQuestion = {
            question: questionValue,
            options: [answerValue1, answerValue2, answerValue3, answerValue4],
            answer: correctAnswerValue
        }
        try {
            await axios.post('http://localhost:3000/questions', newQuestion)
                .then(res => {
                    console.log(res)
                    console.log(res.data)
                    setQuestionValue("")
                    setAnswerValue1("")
                    setAnswerValue2("")
                    setAnswerValue3("")
                    setAnswerValue4("")
                    setCorrectAnswerValue("")
                })
        }
        catch(err){
            console.error('them cau hỏi that bai', err)
        }
    }
    return (
        <div className='container'>
            <div className='result__heading'>
                <h1 className='result__heading-title'>Kết quả</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="question">
                        <label>Question</label>
                        <input type="text" placeholder='Nhập câu hỏi'
                               value={questionValue}
                               onChange={(e) => setQuestionValue(e.target.value) }
                        />
                    </div>
                    <div className="answer">
                        <label>Answer</label>
                        <input type="text" placeholder='Nhập câu trả lời'
                               value={answerValue1}
                               onChange={(e) => setAnswerValue1(e.target.value) }
                        />
                        <input type="text" placeholder='Nhập câu trả lời'
                               value={answerValue2}
                               onChange={(e) => setAnswerValue2(e.target.value) }
                        />
                        <input type="text" placeholder='Nhập câu trả lời'
                               value={answerValue3}
                               onChange={(e) => setAnswerValue3(e.target.value) }
                        />
                        <input type="text" placeholder='Nhập câu trả lời'
                               value={answerValue4}
                               onChange={(e) => setAnswerValue4(e.target.value) }
                        />
                    </div>
                    <div className="correct_answer">
                        <label>Correct Answer</label>
                        <input type="text" placeholder='Nhập câu trả lời đúng'
                               value={correctAnswerValue}
                               onChange={(e) => setCorrectAnswerValue(e.target.value)} />
                    </div>
                    <button type='submit' >Thêm câu hỏi</button>
                </form>

            </div>
            {questions.map((quiz, numques)  => (
                <div className='result_container' key={numques} >

                    <div className='result_title'>Cau {numques+1}: {quiz.question}</div>
                    {quiz.options.map((option, index) => (
                        <button
                            className={`result__option`}
                            key={index}
                        >{option}</button>
                    ))
                    }
                </div>

            ) )}
            <Link to='/'>
                <button className='result_return'>Làm lại</button>
            </Link>
        </div>
    );
};

export default AddQuestion;