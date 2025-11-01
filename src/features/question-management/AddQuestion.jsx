import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import FormAdd from "./component/FormAdd.jsx";
import FromEdit from "./component/FromEdit.jsx";
import HeaderAdd from "./component/HeaderAdd.jsx";
import AddBody from "./component/AddBody.jsx";
import FormDetail from "./component/FormDetail.jsx";

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
    const [DetailData, setDetailData] = useState({
        question: "",
        options: ["", "", "", ""],
        answer: ""
    })
    const [isShowModelAdd, setIsShowModelAdd] = useState(false)
    const [isShowModelEdit, setIsShowModelEdit] = useState(false)
    const [isShowModelDetail, setIsShowModelDetail] = useState(false)
    const inputAddRef = useRef(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [questionsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")

    // Lấy data câu hỏi
    useEffect(() => {
        const fetchQuestions = async () => {
            try{
                const res = await axios.get('http://localhost:3000/custom')
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

    // Xử lý thêm câu hỏi
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Logic kiểm tra 4 đáp án có trùng nhau không
        //Gom các đáp án vào một mảng và bỏ khoảng trống
        const options = [answerValue1.trim(), answerValue2.trim(), answerValue3.trim(), answerValue4.trim()];

        // Kiểm tra trùng lặp bằng Set
        const uniqueOptions = new Set(options);
        if (uniqueOptions.size < options.length) {
            alert("Các đáp án không được trùng nhau!");
            return;
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
            const res = await axios.post('http://localhost:3000/custom', newQuestion)
            const newQues = res.data
            setQuestions([...questions, newQues])
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
    // Sử lý lggic xoá
    const handeleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/custom/${id}`)
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
    // Show formDetail
    const handleShowDetailForm = (question) => {
        setIsShowModelDetail(true)
        setDetailData(question)
    }
    // Sử lý logic chỉnh sửa
    const handleShowEditForm = (question) => {
        setIsShowModelEdit(true)
        setEditingId(question.id)
        setEditingData(question)
    }
    const handleEditQuestionChange = (e) => {
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
            const response = await axios.put(`http://localhost:3000/custom/${editingId}`, editingData)
            console.log(response.data)
            setQuestions(prevState => prevState.map((q) => q.id === editingId ? response.data: q ))
            setIsShowModelEdit(false)
        }
        catch (err){
            console.log('loi')
        }
    }

    // Bắt nổi bọt
    const handlestopPropagation = (e) => {
        e.stopPropagation()
    }
    const handleHideAddForm = () => {
        setQuestionValue("")
        setAnswerValue1("")
        setAnswerValue2("")
        setAnswerValue3("")
        setAnswerValue4("")
        setCorrectAnswerValue(null)
        setIsShowModelAdd(false)
    }

    //Logic phân trang và tìm kiếm
    const filteredQuestions = questions.filter(question =>
        question.question.toLowerCase().includes(searchTerm?.toLowerCase()));
    // Tính toán chỉ số của câu hỏi cuối cùng trên trang hiện tại
    const indexOfLastQuestion = currentPage * questionsPerPage;
    // Tính toán chỉ số của câu hỏi đầu tiên trên trang hiện tại
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    // "Cắt" mảng questions để lấy ra đúng các câu hỏi cho trang hiện tại
    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    // Tính tổng số trang
    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);


    return (
        <>
            <div className='h-full flex flex-col gap-10 justify-center items-center'>
                <div className="w-8/10 md:w-8/10 p-5 lg:max-w-230 bg-neutral-50 mt-10 flex flex-col rounded-2xl shadow-lg gap-3 ">
                    <HeaderAdd
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        setIsShowModelAdd={() => setIsShowModelAdd(true)}
                    />
                    {/*Show câu hỏi*/}
                    <AddBody
                        currentQuestions ={currentQuestions}
                        ShowEditForm ={handleShowEditForm}
                        handeleDelete ={handeleDelete}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        ShowDetailForm ={handleShowDetailForm}

                    />
                </div>
            </div>
            {
                isShowModelDetail && <FormDetail
                    showfalse={() => setIsShowModelDetail(false)}
                    handlestopPropagation={handlestopPropagation}
                    DetailData={DetailData}
                />
            }
            {isShowModelEdit && <FromEdit
                showfalse={() => setIsShowModelEdit(false)}
                handleSubmitEditForm={handleSubmitEditForm}
                questiondata={editingData.question}
                optionsdata={editingData.options}
                answerdata={editingData.answer}
                handleEditQuestionChange={handleEditQuestionChange}
                handleEditOptionChange={handleEditOptionChange}
                handlestopPropagation={handlestopPropagation}/>}
            {isShowModelAdd && <FormAdd
                 showfalse = {handleHideAddForm}
                 // showfalse = {() => setIsShowModelAdd(false)}
                 handleSubmit={handleSubmit}
                 handlestopPropagation={handlestopPropagation}
                 inputAddRef={inputAddRef}
                 setCorrectAnswerValue={(e) => setCorrectAnswerValue(e.target.value)}
                 questionValue = {questionValue}
                 setQuestionValue={(e) => setQuestionValue(e.target.value)}
                 correctAnswerValue={correctAnswerValue}
                 answerValue1={answerValue1}
                 answerValue2={answerValue2}
                 answerValue3={answerValue3}
                 answerValue4={answerValue4}
                 setAnswerValue1={(e) => setAnswerValue1(e.target.value)}
                 setAnswerValue2={(e) => setAnswerValue2(e.target.value)}
                 setAnswerValue3={(e) => setAnswerValue3(e.target.value)}
                 setAnswerValue4={(e) => setAnswerValue4(e.target.value)}/>}
        </>

    );
};

export default AddQuestion;