
import './App.css'
import {Routes} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Quizz from "./features/quiz/Quizz.jsx";
import Login from "./components/Login.jsx";
import {Route} from "react-router-dom";
import AddQuestion from "./features/question-management/AddQuestion.jsx"
import QuizzStart from "./features/quiz/QuizzStart.jsx";
import Notice from "./components/Notice.jsx";
import VocalHome from "./features/vocal-quiz/VocalHome.jsx";

const Welcome = () => <h2>Chào mừng đến với Quizzlet!</h2>;

function App() {
  return (
      <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index element={<Welcome />} />
              <Route path='addquestion' element={<AddQuestion/>}/>
              <Route path='quiz-start' element={<QuizzStart/>}/>
              <Route path='quiz/:topicName' element={<Quizz/>}/>
              <Route path='notice' element={<Notice/>}/>
              <Route path='vocalquiz' element={<VocalHome/>}/>
          </Route>
          <Route path='login' element={<Login/>}/>

      </Routes>
  )
}

export default App
