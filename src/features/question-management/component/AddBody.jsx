import React from 'react';
import {Link} from "react-router-dom";

const AddBody = ({currentQuestions,ShowEditForm,handeleDelete,totalPages,setCurrentPage,currentPage}) => {
    return (
        <>
            {currentQuestions.map((question, index)  => (
                <div className='edit__question-container' key={question.id}>
                    <p className='edit__question-title'>Cau {question.id}: {question.question}</p>
                    <div className="edit__question-btn">
                        <button className="edit__btn edit__btn_change"
                                onClick={() => ShowEditForm(question)}
                        >Sửa</button>
                        <button className="edit__btn dit__btn_delete"
                                onClick={handeleDelete}
                        >Xoá</button>
                    </div>
                </div>
            ) )}
            <div className='pagination'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`pagination-btn ${currentPage === number ? 'pagination-btn-active' : ''}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <Link to='/'>
                <button className='result_return'>Quay lại</button>
            </Link>
        </>
    );
};

export default AddBody;