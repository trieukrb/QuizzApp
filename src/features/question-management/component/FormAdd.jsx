import React from 'react';

const FormAdd = ({showfalse,
                 handleSubmit,
                 handlestopPropagation,
                 inputAddRef,
                 setCorrectAnswerValue,
                 questionValue,
                 setQuestionValue,
                 correctAnswerValue,
                 answerValue1,
                 answerValue2,
                 answerValue3,
                 answerValue4,
                 setAnswerValue1,
                 setAnswerValue2,
                 setAnswerValue3,
                 setAnswerValue4,
                }) => {
    return (
        <div className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-500/30 flex justify-center items-center' onClick={showfalse} >
            <form onSubmit={handleSubmit} className='bg-neutral-100 p-5 rounded-xl  shadow-xl sm:min-w-100 md:min-w-120 lg:min-w-150 ' onClick={handlestopPropagation}>
                <div className='flex justify-between font-bold text-lg mb-2'>
                    <h1 className=''>Create question</h1>
                    <div className="cursor-pointer" onClick={showfalse}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                {/*Add Question*/}
                <div className="mb-3">
                    <label className='block mb-1 font-medium'>Question</label>
                    <input type="text" placeholder='Enter Question Title'
                           className='border-1 border-solid border-neutral-400 px-2 py-3 rounded-lg w-full placeholder:text-neutral-400/90'
                           required
                           ref={inputAddRef}
                           value={questionValue}
                           onChange={setQuestionValue}
                    />
                </div>
                {/*Add Option*/}
                <div className="">
                    <label className='font-medium block mb-1'>Answer 1</label>
                    <div className='w-full mb-2 flex justify-between border-1 border-solid border-neutral-400 rounded-lg '>
                        <input type="text" placeholder='Enter Answer'
                               className='w-full py-3 px-2 border-r-1 border-solid border-neutral-400 placeholder:text-neutral-400/90 outline-none'
                               required
                               value={answerValue1}
                               onChange={setAnswerValue1}
                        />
                        <input type="radio"
                               name='option'
                               className='mx-3'
                               value='1'
                               onChange={setCorrectAnswerValue}
                               checked={correctAnswerValue === '1'}
                        />
                    </div>
                    <label className='font-medium block mb-1'>Answer 2</label>
                    <div className='w-full mb-2 flex justify-between border-1 border-solid border-neutral-400 rounded-lg'>
                        <input type="text" placeholder='Enter Answer'
                               className='w-full py-3 px-2 border-r-1 border-solid border-neutral-400 placeholder:text-neutral-400/90 outline-none'
                               required
                               value={answerValue2}
                               onChange={setAnswerValue2}
                        />
                        <input type="radio"
                               name='option'
                               className='mx-3'
                               value='2'
                               onChange={setCorrectAnswerValue}
                               checked={correctAnswerValue === '2'}
                        />
                    </div>
                    <label className='font-medium block mb-1'>Answer 3</label>
                    <div className='w-full mb-2 flex justify-between border-1 border-solid border-neutral-400 rounded-lg'>
                        <input type="text" placeholder='Enter Answer'
                               className='w-full py-3 px-2 border-r-1 border-solid border-neutral-400 placeholder:text-neutral-400/90 outline-none'
                               required
                               value={answerValue3}
                               onChange={setAnswerValue3}
                        />
                        <input type="radio"
                               name='option'
                               className='mx-3'
                               value='3'
                               onChange={setCorrectAnswerValue}
                               checked={correctAnswerValue === '3'}
                        />
                    </div>
                    <label className='font-medium block mb-1'>Answer 4</label>
                    <div className='w-full mb-2 flex justify-between border-1 border-solid border-neutral-400 rounded-lg'>
                        <input type="text" placeholder='Enter Answer'
                               className='w-full py-3 px-2 border-r-1 border-solid border-neutral-400 placeholder:text-neutral-400/90 outline-none'
                               required
                               value={answerValue4}
                               onChange={setAnswerValue4}
                        />
                        <input type="radio"
                               name='option'
                               className='mx-3'
                               value='4'
                               onChange={setCorrectAnswerValue}
                               checked={correctAnswerValue === '4'}
                        />
                    </div>
                </div>
                <div className='flex justify-end gap-3 mt-8'>
                    <button onClick={showfalse} className='bg-neutral-200 px-3 py-1 rounded-md hover:opacity-40 cursor-pointer'>Quit</button>
                    <button type='submit' className='bg-blue-950 text-neutral-100 px-3 py-1 rounded-md hover:opacity-40 cursor-pointer'>Add Question</button>
                </div>
            </form>
        </div>
    );
};

export default FormAdd;