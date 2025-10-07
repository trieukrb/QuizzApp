import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Quizz from "./components/Quizz.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
        <Quizz/>
    </div>
  )
}

export default App
