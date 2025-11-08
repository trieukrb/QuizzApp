
import './App.css'
import {Routes} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Quizz from "./features/quiz/Quizz.jsx";
import Register from "./components/Register.jsx";
import {Route} from "react-router-dom";
import AddQuestion from "./features/question-management/AddQuestion.jsx"
import QuizzStart from "./features/quiz/QuizzStart.jsx";
import Notice from "./components/Notice.jsx";
import VocabHome from "./features/vocab/VocabHome.jsx";
import FlashCard from "./features/flashCard/FlashCard.jsx";
import Login from "./components/Login.jsx";
import useAuthStore from "./stores/useAuthStore.js";
import {useEffect} from "react";
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "./firebaseConfig.js";
import Home from "./components/Home.jsx";
import UserScore from "./features/userScore/UserScore.jsx"; // Import "người gác cổng"

function App() {
    // Lấy hàm setUser từ store
    const setUser = useAuthStore((state) => state.setUser);

    // Dùng useEffect để lắng nghe trạng thái auth MỘT LẦN KHI APP KHỞI ĐỘNG
    useEffect(() => {
        // onAuthStateChanged trả về một hàm "unsubscribe"
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Khi Firebase kiểm tra xong:
            if (user) {
                // Nếu có user, lưu user vào store
                setUser(user);
            } else {
                // Nếu không có user, lưu `null` vào store
                setUser(null);
            }
        });

        // Cleanup: Gỡ bỏ listener khi component bị unmount
        return () => unsubscribe();
    }, [setUser]); // Thêm setUser vào dependency array
  return (
      <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>} />
              <Route path='addquestion' element={<AddQuestion/>}/>
              <Route path='quiz-start' element={<QuizzStart/>}/>
              <Route path='quiz/:topicName' element={<Quizz/>}/>
              <Route path='vocabquiz' element={<VocabHome/>}/>
              <Route path='flashcard/:topicName' element={<FlashCard/>}/>
              <Route path='userscore' element={<UserScore/>}/>
          </Route>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>

      </Routes>
  )
}

export default App
