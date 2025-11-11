
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
import {auth, db} from "./firebaseConfig.js";
import Home from "./pages/Home.jsx";
import UserScore from "./features/user-score/UserScore.jsx";
import {doc, getDoc} from "firebase/firestore"; // Import "người gác cổng"

function App() {
    // Lấy hàm setUser từ store
    const setUser = useAuthStore((state) => state.setUser);
    const setLoading = useAuthStore((state) => state.setLoading); // Lấy hàm setLoading

    // Dùng useEffect để lắng nghe trạng thái auth MỘT LẦN KHI APP KHỞI ĐỘNG
    useEffect(() => {
        setLoading(true)
        // onAuthStateChanged trả về một hàm "unsubscribe"
        const unsubscribe = onAuthStateChanged(auth, async (auth_user) => {
            // Khi Firebase kiểm tra xong:
            if (auth_user) {
                const docRef = doc(db, "users", auth_user.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()){
                    const completeUser = {
                        ...auth_user,
                        ...docSnap.data(),
                    }
                    setUser(completeUser);
                }
                else{
                    setUser(auth_user)
                }
            } else {
                // Nếu không có user, lưu `null` vào store
                setUser(null);
            }
        });

        // Cleanup: Gỡ bỏ listener khi component bị unmount
        return () => unsubscribe();
    }, [setUser,setLoading]); // Thêm setUser vào dependency array
  return (
      <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>} />
              <Route path='question-management' element={<QuestionManagement/>}/>
              <Route path='quiz-start' element={<QuizStart/>}/>
              <Route path='quiz/:topicName' element={<Quiz/>}/>
              <Route path='vocab-quiz' element={<VocabHome/>}/>
              <Route path='flash-card/:topicName' element={<FlashCard/>}/>
              <Route path='user-score' element={<UserScore/>}/>
          </Route>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>

      </Routes>
  )
}

export default App
