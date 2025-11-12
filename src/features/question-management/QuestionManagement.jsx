import React, {useEffect, useRef, useState} from 'react';
import FormAdd from "./component/FormAdd.jsx";
import FormEdit from "./component/FormEdit.jsx";
import HeaderAdd from "./component/HeaderAdd.jsx";
import AddBody from "./component/AddBody.jsx";
import FormDetail from "./component/FormDetail.jsx";
import { db } from '../../firebaseConfig';
import {collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where} from "firebase/firestore";
import useAuthStore from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import Loading from "../../components/Loading.jsx";
import Error from "../../components/Error.jsx";

const QuestionManagement = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    // "questions" data chính
    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(true);
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
    // state handle việc phân trang và tìm kiếm
    const [currentPage, setCurrentPage] = useState(1)
    const [questionsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")

    // Lấy data câu hỏi
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!user){
                alert('Bạn cần đăng nhập để thực hiện chức năng này')
                setQuestions([])
                setLoading(false)
                navigate('/')
                return
            }
            setLoading(true)
            try{
                const q = query(collection(db, "user_questions"), where("userId", "==", user.uid))
                const querySnapshot = await getDocs(q);
                const userQuestions = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setQuestions(userQuestions)

            }
            catch (err){
                console.log("Không tải được câu hỏi", err)
                setError(true)
            }
            finally {
                setLoading(false)
            }
        }
        fetchQuestions()
    }, [user]);

    // --- Xử lý việc thêm câu hỏi --- //
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Kiểm tra người dùng đã đăng nhập chưa
        if (!user){
            alert("You must log in to use this function.")
            return
        }

        // --- 'options' array chưa đáp án
        //Logic kiểm tra 4 đáp án có trùng nhau không
        //Gom các đáp án vào một mảng và bỏ khoảng trống
        const options = [answerValue1.trim(), answerValue2.trim(), answerValue3.trim(), answerValue4.trim()];

        // Kiểm tra trùng lặp bằng Set(Set chỉ lưu một giá trị duy nhất không lặp)
        const uniqueOptions = new Set(options);
        //Dùng size kiểm tra số lượng phần tử có trong uniqueOptions
        if (uniqueOptions.size < options.length) {
            alert("Các đáp án không được trùng nhau!");
            return;
        }
        // --- 'answerText' Lấy dữ liệu từ đáp án
        //Logic lấy value answer từ radio
        let answer = "";
        if (correctAnswerValue === '1') {
            answer = answerValue1;
        } else if (correctAnswerValue === '2') {
            answer = answerValue2;
        } else if (correctAnswerValue === '3') {
            answer = answerValue3;
        } else if (correctAnswerValue === '4') {
            answer = answerValue4;
        }
        // Kiểm tra có radio có được chọn chưa
        if (correctAnswerValue === null){
            alert('Please choose the correct answer')
            return;
        }
        // Data hoàn chỉnh để add
        const newQuestion = {
            question: questionValue.trim(),
            options: options,
            answer: answer,
            userId: user.uid
        }
        try {
            const docRef = await  addDoc(collection(db, "user_questions"), newQuestion)
            setQuestions(prevQuestions => [...prevQuestions, { ...newQuestion, id: docRef.id }]);
            console.log("Done Add")
        }
        catch(err){
            console.error("Error Add")
            setError(true)
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

    // --- Xử lý việc xóa câu hỏi --- //
    const handleDelete = async (id) => {
        if (!user) {
            return;
        }
        try {
            await deleteDoc(doc(db, "user_questions", id))
            setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
            console.log("Done Delete")
        }
        catch(err){
            console.error("Error Delete")
            setError(true)
        }
    }

    // Hiển thị formDetail
    const handleShowDetailForm = (question) => {
        setIsShowModelDetail(true)
        //gán dữ liệu vào formDT
        setDetailData(question)
    }

    // --- Xử lý việc edit câu hỏi --- //
    // Hiển thị formEdit
    const handleShowEditForm = (question) => {
        setIsShowModelEdit(true)
        // same
        setEditingId(question.id)
        setEditingData(question)
    }

    // handle cả hai việc thay đổi của question và answer
    const handleEditQuestionChange = (e) => {
        const {name, value} = e.target
        setEditingData(predata => ({...predata, [name]: value}))
    }

    // handle xử lý option
    const handleEditOptionChange = (e, index) => {
        const newOptionArray = [...editingData.options]
        newOptionArray[index] = e.target.value
        setEditingData(predata => ({...predata, options: newOptionArray}))
    }
    // xử lý việt submit formEdit
    const handleSubmitEditForm = async (e) => {
        e.preventDefault()
        if (!user) {
            return;
        }
        try {
            // chỉ lấy nhưng thứ cần thay đổi vì data có cả id của user không cần lấy
            const updateData = {
                question: editingData.question,
                options: editingData.options,
                answer: editingData.answer
            }
            await updateDoc(doc(db, "user_questions", editingId), updateData)
            setQuestions(prevState => prevState.map((q) => q.id === editingId ? {...q, ...updateData} : q))
            setIsShowModelEdit(false)
            console.log("Done Edit")
        }
        catch (err){
            console.log('Error Edit')
            setError(true)
        }
    }

    // Bắt nổi bọt
    const handlestopPropagation = (e) => {
        e.stopPropagation()
    }
    // Khi tắt form cần clear dữ liệu
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
    // logic tiền kiếm
    const filteredQuestions = questions.filter(question =>
        question.question.toLowerCase().includes(searchTerm?.toLowerCase()));
    // Tính toán số của câu hỏi cuối cùng trên trang hiện tại
    const indexOfLastQuestion = currentPage * questionsPerPage;
    // Tính toán số của câu hỏi đầu tiên trên trang hiện tại
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    // "Cắt" mảng questions để lấy ra đúng các câu hỏi cho trang hiện tại
    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    // Tính tổng số trang
    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

    if (error){
        return (<Error/>)
    }
    return (
        <>
            <div className='h-full flex flex-col gap-10 justify-center items-center'>
                <div className="w-8/10 md:w-8/10 p-5 lg:max-w-230 border-2 border-p-400 bg-neutral-50 mt-10 flex flex-col rounded-2xl shadow-lg gap-3 ">
                    {loading ?
                        (<Loading/>)
                        :
                        (<>
                            <HeaderAdd
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                setIsShowModelAdd={() => setIsShowModelAdd(true)}
                            />
                            {/*Show câu hỏi*/}
                            <AddBody
                                currentQuestions ={currentQuestions}
                                ShowEditForm={handleShowEditForm}
                                handeleDelete={handleDelete}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                ShowDetailForm={handleShowDetailForm}

                            />
                        </>)
                    }
                </div>
            </div>
            {
                isShowModelDetail && <FormDetail
                    showfalse={() => setIsShowModelDetail(false)}
                    handlestopPropagation={handlestopPropagation}
                    DetailData={DetailData}
                />
            }
            {isShowModelEdit && <FormEdit
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

export default QuestionManagement;