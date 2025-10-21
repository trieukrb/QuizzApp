import React from 'react';

const HeaderAdd = ({searchTerm,setSearchTerm,setIsShowModelAdd}) => {
    return (
        <div className='add__container'>
            <h1 className='add__title'>Kết quả</h1>
            <input type="text"
                   value={searchTerm}
                   placeholder='Tìm câu hỏi'
                   onChange={(e) => setSearchTerm(e.target.value)}
                   style={{ width: '40%', padding: '8px', marginBottom: '15px', borderRadius: '10px'}}
            />
            <button className='add__btn'
                    onClick={setIsShowModelAdd}>+ Add question</button>
        </div>
    );
};

export default HeaderAdd;