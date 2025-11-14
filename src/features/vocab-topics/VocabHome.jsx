import React, { useEffect, useState } from "react";
import { db } from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import useAuthStore from "../../stores/useAuthStore.js";
import Loading from "../../components/Loading.jsx";
import TopicList from "./components/TopicList.jsx";

export default function VocabHome() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState("")
    // Lấy dữ liệu từ cl db topics
    useEffect(() => {
        const fetchTopics = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "topics"));
                const topicslist = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const allowedTopics = topicslist.filter(topic => {
                    if (topic.isPublic) {
                        return true;
                    }
                });
                setTopics(allowedTopics);
            } catch (err) {
                console.log("loi khi tai du lieu", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTopics();
    }, [user]);
    const filteredQuestions = topics.filter(topic =>
        topic.name.toLowerCase().includes(searchTerm?.toLowerCase()));
    return (
        <div className="flex justify-center items-center">
            <div className="my-15 md:my-20 w-4/5 sm:w-9/10 border-1 border-p-200/60 p-5 bg-neutral-100/20 backdrop-blur-md flex items-center flex-col rounded-2xl shadow-2xl gap-3">
                {/*<h3 className="my-4 text-4xl text-shadow-lg font-bold text-n-100">Vocabulary Topics</h3>*/}
                <label className="flex gap-2 items-center w-4/5 bg-n-50  md:w-3/5 p-3 rounded-3xl shadow-lg  placeholder:text-neutral-400" htmlFor='search-bar'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input type="text"
                           id="search-bar"
                           className="placeholder:text-neutral-400 outline-none"
                           value={searchTerm}
                           placeholder='Search Topic'
                           onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </label>
                {loading ? <Loading /> : <TopicList topics={filteredQuestions} />}
            </div>
        </div>
    );
}
