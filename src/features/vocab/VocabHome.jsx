import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import useAuthStore from "../../stores/useAuthStore.js";

export default function VocabHome() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "topics"));
                const topicslist = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                // topicsList la mot array nhu the  [{id: 'sdf', name: 'Marketing', path: 'marketing'},{}]
                // console.log(topicslist)
                const allowedTopics = topicslist.filter(topic => {
                    if(topic.isPublic){
                        return true
                    }
                    return user != null
                })
                setTopics(allowedTopics)
            }
            catch (err){
                console.log("loi khi tai du lieu", err)
            }
            finally {
                setLoading(false)
            }
        }
        fetchTopics()
    }, [user]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:3000/db");
    //             setTopics(Object.keys(res.data));
    //         }
    //         catch (err) {
    //             console.log("Lỗi khi tải dữ liệu:", err);
    //         }
    //     };
    //     fetchData();
    // }, []);
    // console.log(topics)
    return (
        // <div className="flex justify-center items-center">
        //     <div className="my-15 ..."> {/* ... các class cũ của bạn ... */}
        //         <h3 className="my-4 text-xl font-bold">📚 Danh sách chủ đề TOEIC</h3>
        //         {loading ? (
        //             <p>Đang tải dữ liệu...</p>
        //         ) : (
        //             <ul className="flex flex-wrap justify-center gap-5 py-4 ">
        //                 {/* 3. Map qua danh sách đã được lọc */}
        //                 {topics.map(topic =>
        //                     <li key={topic.id} className="..."> {/* ... class cũ ... */}
        //                         <div className="flex items-center text-lg ...">
        //                             {/* Dùng "name" từ database */}
        //                             {topic.name}
        //                         </div>
        //                         <div className="flex gap-3 px-2 text-n-950">
        //                             {/* Dùng "path" từ database */}
        //                             <Link to={`/flashcard/${topic.path}`} className="...">
        //                                 Flash Card
        //                             </Link>
        //                             <Link to={`/quiz/${topic.path}`} className="...">
        //                                 Quiz
        //                             </Link>
        //                         </div>
        //                     </li>
        //                 )}
        //             </ul>
        //         )}
        //     </div>
        // </div>
        <div className="flex justify-center items-center">
            <div className="my-15 md:my-20 w-4/5 md:w-3/4 lg:w-8/10 p-5 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3">
                <h3 className="my-4 text-xl font-bold">📚 Danh sách chủ đề TOEIC</h3>
                {loading ?
                     (<p>Đang tải dữ liệu...</p>
                ) : (<ul className="flex flex-wrap justify-center gap-5 py-4 ">
                       {topics.map(topic =>
                           <li key={topic.id} className="px-2 py-4 w-60 sm:w-70 border-2 bg-p-100/50 border-p-500 rounded-lg shadow-lg hover:shadow-2xl transition delay-70 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102">
                               <div className="flex items-center text-lg justify-center h-20 p-2 text-n-700 font-bold ">
                                   {topic.name}
                               </div>
                               <div className="flex gap-3 px-2 text-n-950">
                                   <Link to={`/flashcard/${topic.path}`} className="bg-p-300/70 shadow-lg py-2 rounded-xl w-full text-center  cursor-pointer hover:bg-p-400">
                                       Flash Card
                                   </Link>
                                   <Link to={`/quiz/${topic.path}`} className="bg-p-300/70 py-2 shadow-lg rounded-xl w-full text-center cursor-pointer hover:bg-p-400">
                                       Quiz
                                   </Link>
                               </div>
                           </li>)}
                </ul>)}
            </div>

        </div>
    );
}
