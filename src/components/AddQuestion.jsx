import React, {useEffect, useRef, useState} from 'react';
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
    const [correctAnswerValue, setCorrectAnswerValue] = useState(null)

    const [editingId, setEditingId] = useState(null)
    const [editingData, setEditingData] = useState({
        question: "",
        options: ["", "", "", ""],
        answer: ""
    })
    const [isShowModelAdd, setIsShowModelAdd] = useState(false)
    const [isShowModelEdit, setIsShowModelEdit] = useState(false)
    const inputAddRef = useRef(null)
    useEffect(() => {
        const fetchQuestions = async () => {
            try{
                const res = await axios.get('http://localhost:3000/questions')
                const questionData = res.data;
                setQuestions(questionData);
            }
            catch(err){
                setError("Không thể tải được câu hỏi, vui lòng thử lại.");
                console.error("Lỗi khi gọi API:", err);
            } finally {
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


    const handleSubmit = async (event) => {
        event.preventDefault();
        //Logic kiểm tra 4 đáp án có trùng nhau không
        // 1. Gom các đáp án vào một mảng và bỏ khoảng trống
        const options = [answerValue1.trim(), answerValue2.trim(), answerValue3.trim(), answerValue4.trim()];


        // 3. Kiểm tra trùng lặp bằng Set
        const uniqueOptions = new Set(options);
        // Nếu kích thước Set nhỏ hơn 4, tức là có trùng lặp
        if (uniqueOptions.size < options.length) {
            alert("Các đáp án không được trùng nhau!");
            return; // Dừng hàm, không submit
        }
        //Logic lấy value answer từ radio
        let answerText = "";
        if (correctAnswerValue === '1') {
            answerText = answerValue1;
        } else if (correctAnswerValue === '2') {
            answerText = answerValue2;
        } else if (correctAnswerValue === '3') {
            answerText = answerValue3;
        } else if (correctAnswerValue === '4') {
            answerText = answerValue4;
        }
        // Kiểm tra có radio có được chọn chưa
        if (correctAnswerValue === null){
            alert('Vui lòng chọn đáp án đúng')
            return;
        }
        const newQuestion = {
            question: questionValue.trim(),
            options: options,
            answer: answerText
        }
        try {
            const res = await axios.post('http://localhost:3000/questions', newQuestion)
            const newQues = res.data
            setQuestions([...questions, newQues])
            // setQuestionValue("")
            // setAnswerValue1("")
            // setAnswerValue2("")
            // setAnswerValue3("")
            // setAnswerValue4("")
            // setCorrectAnswerValue(null)
            // inputAddRef.current.focus()
        }
        catch(err){
            console.error('them cau hỏi that bai', err)
        }
        finally {
            setQuestionValue("")
            setAnswerValue1("")
            setAnswerValue2("")
            setAnswerValue3("")
            setAnswerValue4("")
            setCorrectAnswerValue(null)
            inputAddRef.current?.focus()

        }
    }
    // Hàm để xoá
    const handeleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/questions/${id}`)
            // window.location.reload()
            console.log(res)
            if (res.status === 200) {
                // Cập nhật lại state mà không cần reload trang
                setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
            }
        }
        catch(err){
            console.error('xoa cau hoi that bai', err)
        }
    }


    const handleShowEditForm = (question) => {
        setIsShowModelEdit(true)
        setEditingId(question.id)
        setEditingData(question)
    }
    const handleEditFormChange = (e) => {
        const {name, value} = e.target
        setEditingData(predata => ({...predata, [name]: value}))
    }
    const handleEditOptionChange = (e, index) => {
        const newOptionArray = [...editingData.options]
        newOptionArray[index] = e.target.value
        console.log(newOptionArray)
        setEditingData(predata => ({...predata, options: newOptionArray}))
    }

    const handleSubmitEditForm = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:3000/questions/${editingId}`, editingData)
            console.log(response.data)
            setQuestions(prevState => prevState.map((q) => q.id === editingId ? response.data: q ))
            setIsShowModelEdit(false)
        }
        catch (err){
            console.log('loi')
        }
    }
    const handlestopPropagation = (e) => {
        e.stopPropagation()
    }
    return (
        <>
            <div className='container'>
                <div className='add__container'>
                    <h1 className='add__title'>Kết quả</h1>
                    <button className='add__btn'
                            onClick={() => setIsShowModelAdd(true)}>+ Add question</button>
                </div>
                {questions.map((question, index)  => (
                    <div className='edit__question-container' key={question.id}>
                            <p className='edit__question-title'>Cau {index+1}: {question.question}</p>
                            <div className="edit__question-btn">
                                <button className="edit__btn edit__btn_change"
                                        onClick={() => handleShowEditForm(question)}
                                >Sửa</button>
                                <button className="edit__btn dit__btn_delete"
                                        onClick={() =>handeleDelete(question.id)}
                                >Xoá</button>
                            </div>
                    </div>

                ) )}
                <Link to='/'>
                    <button className='result_return'>Quay lại</button>
                </Link>
            </div>
            {isShowModelEdit &&
                <div className='form_edit' onClick={() => setIsShowModelEdit(false)}>
                    <form action="" className="form_edit_submit" onSubmit={handleSubmitEditForm} onClick={handlestopPropagation}>
                        <h1>sua cau hoi {editingId}</h1>
                        <label htmlFor="">Edit Question</label>
                        <input type="text"
                               placeholder='question'
                               name='question'
                               required
                               value={editingData.question}
                               onChange={handleEditFormChange}
                        />

                        {editingData.options.map((option, index) => (
                            <div key={index}>
                                <label htmlFor="">Edit option {index + 1}</label>
                                <input type="text"
                                       value={option}
                                       required
                                       placeholder='edit option'
                                        onChange={(e) => handleEditOptionChange(e, index)}
                                />
                            </div>
                            ))
                        }
                        <label htmlFor="">Edit Answer</label>
                        <input type="text"
                               name='answer'
                               placeholder='edit answer'
                               required
                               value={editingData.answer}
                               onChange={handleEditFormChange}
                        />
                        <div className="btn_edit">
                            <button className="btn_edit_save"
                                type='submit'
                            >Save</button>
                            <button className="btn_edit_quit"
                                    onClick={() => setIsShowModelEdit(false)}
                            >Quit</button>
                        </div>
                    </form>
                </div>

            }
            {
                isShowModelAdd && (
                    <div className='form_add' onClick={() => setIsShowModelAdd(false)} >
                        <form onSubmit={handleSubmit} className='form_edit_add' onClick={handlestopPropagation}>
                            <div className='form__add-header'>
                                <h1 className='add-header-title'>Create question</h1>
                                <p className='add-header-icon' onClick={() => setIsShowModelAdd(false)}>X</p>
                            </div>
                            {/*Add Question*/}
                            <div className="question">
                                <label className='answer-label'>Question</label>
                                <input type="text" placeholder='Nhập câu hỏi'
                                       className='answer-input'
                                       required
                                       ref={inputAddRef}
                                       value={questionValue}
                                       onChange={(e) => setQuestionValue(e.target.value) }
                                />
                            </div>
                            {/*Add Option*/}
                            <div className="edit__answer">
                                <label className='answer-label'>Answer 1</label>
                                <input type="text" placeholder='Nhập câu trả lời'
                                       className='answer-input'
                                       required
                                       value={answerValue1}
                                       onChange={(e) => setAnswerValue1(e.target.value) }
                                />
                                <input type="radio"
                                        name='option'
                                       value='1'
                                       onChange={(e) => setCorrectAnswerValue(e.target.value)}
                                       checked={correctAnswerValue === '1'}
                                />
                                <label className='answer-label'>Answer 2</label>
                                <input type="text" placeholder='Nhập câu trả lời'
                                       className='answer-input'
                                       required
                                       value={answerValue2}
                                       onChange={(e) => setAnswerValue2(e.target.value) }
                                />
                                <input type="radio"
                                        name='option'
                                       value='2'
                                       onChange={(e) => setCorrectAnswerValue(e.target.value)}
                                       checked={correctAnswerValue === '2'}
                                />
                                <label className='answer-label'>Answer 3</label>
                                <input type="text" placeholder='Nhập câu trả lời'
                                       className='answer-input'
                                       required
                                       value={answerValue3}
                                       onChange={(e) => setAnswerValue3(e.target.value) }
                                />
                                <input type="radio"
                                        name='option'
                                       value='3'
                                       onChange={(e) => setCorrectAnswerValue(e.target.value)}
                                       checked={correctAnswerValue === '3'}
                                />
                                <label className='answer-label'>Answer 4</label>
                                <input type="text" placeholder='Nhập câu trả lời'
                                       className='answer-input'
                                       required
                                       value={answerValue4}
                                       onChange={(e) => setAnswerValue4(e.target.value) }
                                />
                                <input type="radio"
                                        name='option'
                                       value='4'
                                       onChange={(e) => setCorrectAnswerValue(e.target.value)}
                                       checked={correctAnswerValue === '4'}
                                />
                            </div>
                            {/*Add answer*/}
                            {/*<div className="correct_answer">*/}
                            {/*    <label className='answer-label'>Correct Answer</label>*/}
                            {/*    <input type="text" placeholder='Nhập câu trả lời đúng'*/}
                            {/*           className='answer-input'*/}
                            {/*           value={correctAnswerValue}*/}
                            {/*           onChange={(e) => setCorrectAnswerValue(e.target.value)} />*/}
                            {/*</div>*/}
                            <div className='model__nav-add'>
                                <button onClick={() => setIsShowModelAdd(false)} className='model__btn-add model__btn-add-quit'>Quit</button>
                                <button type='submit' className='model__btn-add model__btn-add-submit'>Add Question</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </>

    );
};

export default AddQuestion;