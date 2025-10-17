
import './App.css'
import {Routes} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Quizz from "./components/Quizz.jsx";
import Login from "./components/Login.jsx";
import {Route} from "react-router-dom";
import AddQuestion from "./components/AddQuestion.jsx"

const Welcome = () => <h2>Chào mừng đến với Quizzlet!</h2>;

function App() {
  return (
      <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index element={<Welcome />} />
          </Route>
          <Route path='quiz' element={<Quizz/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='achieve' element={<AddQuestion/>}/>
      </Routes>
  )
}

export default App
