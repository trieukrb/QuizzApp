import React, {useEffect, useState} from 'react';
import {quizData} from './data.jsx'
import Result from "./Result.jsx";
const Quizz = () => {

    //Tang giam cau hoi
    const [quenstionnum, setQuenstionnum] = useState(0)
    const [Arrayoptions, setArrayoptions] = useState(Array.from({length: quizData.length}))
    const [questionanswer, setQuestionanswer] = useState('')
    const [score, setScore] = useState(0)
    const handleAnswer = (option, index) => {
        setQuestionanswer(option)
        const newArrayoptions = [...Arrayoptions]
        newArrayoptions[quenstionnum] = index
        setArrayoptions(newArrayoptions)
    }

    useEffect(() => {
        const answer = Arrayoptions[quenstionnum]
        const preoption = quizData[quenstionnum].options[answer]
        if (answer !== undefined){
            setQuestionanswer(preoption)
        }
        else{
            setQuestionanswer('')
        }
    }, [quenstionnum]);

    const pevquestion =() => {
        setQuenstionnum(prevState => prevState-1)
    }

    const nextquestion =() => {
        setQuenstionnum(prevState => prevState+1)
    }
    const handlesubmit = () => {
        let scores = 0
        Arrayoptions.forEach((ans, index) => {
            if (quizData[index].options[ans] === quizData[index].answer) {
                scores++
            }
        })
        setScore(scores)
        setSunmit(true)
    }
    const reset = () => {
        setQuenstionnum(0)
        setArrayoptions(Array.from({length: quizData.length}))
        setQuestionanswer('')
        setScore(0)
        setSunmit(false)
    }
    const [sunmit, setSunmit] = useState(false)
    if (sunmit){
        return (
            <Result
            score = {score}
            question = {quizData.length}
            correctarray = {Arrayoptions}
            reset = {reset}
        />)
    }

    return (
    <>
        <h1>App Quizz học tiếng anh của Triều</h1>
        <p className="quizz__content">Question {quenstionnum + 1}: {quizData[quenstionnum].question}</p>
        {
            quizData[quenstionnum].options.map((option, index) => (
                <button className={`option ${questionanswer === option ? 'confirm' : ''} `}
                        key={index}
                        onClick={() => handleAnswer(option, index)}
                >{option}</button>
            ))
        }
        <div className='nav__btn'>
            <button className='nav nav__pev'
                    onClick={pevquestion}
                    disabled={quenstionnum === 0}
            >Previous</button>
            <button className='nav nav__next'
                    onClick={quenstionnum === quizData.length-1 ? handlesubmit : nextquestion}
            >{quenstionnum === quizData.length-1 ? 'Submit' : 'Next'}</button>
        </div>

    </>
  );
};

export default Quizz;