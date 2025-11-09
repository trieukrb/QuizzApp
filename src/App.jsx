
import './App.css'
import {Routes} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Quiz from "./features/quiz/Quiz.jsx";
import Register from "./pages/Register.jsx";
import {Route} from "react-router-dom";
import QuestionManagement from "./features/question-management/QuestionManagement.jsx"
import QuizStart from "./features/quiz/QuizStart.jsx";
import VocabHome from "./features/vocab-topics/VocabHome.jsx";
import FlashCard from "./features/flash-card/FlashCard.jsx";
import Login from "./pages/Login.jsx";
import useAuthStore from "./stores/useAuthStore.js";
import {useEffect} from "react";
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "./firebaseConfig.js";
import Home from "./pages/Home.jsx";
import UserScore from "./features/user-score/UserScore.jsx"; // Import "người gác cổng"

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
              <Route path='addquestion' element={<QuestionManagement/>}/>
              <Route path='quiz-start' element={<QuizStart/>}/>
              <Route path='quiz/:topicName' element={<Quiz/>}/>
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
