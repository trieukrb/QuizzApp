import React, {useEffect, useState} from 'react';
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebaseConfig.js";
import useAuthStore from "../../stores/useAuthStore.js";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/Loading.jsx";
import ScoreTable from "./components/ScoreTable.jsx";

const UserScore = () => {
    const {user} = useAuthStore()
    const navigate = useNavigate()
    const [scoreData, setScoreData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchScores = async () => {
            if (!user){
                setLoading(false)
                navigate('/')
                return
            }
            setLoading(true);
            try{
                const q = query(collection(db, "score"), where("userId", "==", user.uid))
                const querySnapshot = await getDocs(q);
                const userScore = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                const sortedScores = userScore.sort((a, b) => {
                    const year = new Date().getFullYear();
                    const dateA = new Date(year, a.month - 1, a.day, a.hours, a.minutes);
                    const dateB = new Date(year, b.month - 1, b.day, b.hours, b.minutes);
                    return dateB - dateA;
                });

                setScoreData(sortedScores);
            }
            catch (err){
                console.log("Không tải được điểm", err)
            }
            finally {
                setLoading(false)
            }
        }
        fetchScores()
    }, [user, navigate]);

    return (
        <div className="flex justify-center items-center">
            <div className="my-15 md:my-20 w-4/5 sm:w-9/10 border-2 border-p-400 p-5 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3">
                {loading ?
                    (<Loading/>)
                    :
                    (<ScoreTable scoreData={scoreData} />)
                }
            </div>
        </div>
    );
};

export default UserScore;
