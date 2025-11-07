import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import useAuthStore from "../../stores/useAuthStore.js";
import img from "../../assets/Images/book1.png"
import * as url from "node:url";
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
                    // return user != null
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
    return (
        <div className="flex justify-center items-center">
            <div className="my-15 md:my-20 w-4/5 md:w-3/4 lg:w-8/10 border-2 border-p-400 p-5 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3">
                <h3 className="my-4 text-3xl font-medium">Toeic Topics</h3>
                {loading ?
                    (<div class="flex-col gap-4 w-full flex items-center justify-center">
                        <div class="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                        </div>
                    </div>
                    )
                    :
                    (<ul className="flex flex-wrap justify-center gap-5 py-4 ">
                        {topics.map(topic =>
                            <li key={topic.id}
                                className="px-2 py-4 w-60 sm:w-70 border-2 bg-p-100/50 border-p-500 rounded-lg shadow-lg hover:shadow-2xl transition delay-70 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102">
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
