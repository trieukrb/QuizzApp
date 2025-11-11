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
                    // return user != null;
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

    return (
        <div className="flex justify-center items-center">
            <div className="my-15 md:my-20 w-4/5 sm:w-9/10 border-1 border-p-200/60 p-5 bg-neutral-100/20 backdrop-blur-md flex items-center flex-col rounded-2xl shadow-2xl gap-3">
                {/*<h3 className="my-4 text-4xl text-shadow-lg font-bold text-n-100">Vocabulary Topics</h3>*/}
                {loading ? <Loading /> : <TopicList topics={topics} />}
            </div>
        </div>
    );
}
