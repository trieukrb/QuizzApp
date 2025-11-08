import React, {useEffect, useState} from 'react';
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebaseConfig.js";
import useAuthStore from "../../stores/useAuthStore.js";
import {useNavigate} from "react-router-dom";

const UserScore = () => {
    const {user} = useAuthStore()
    const navigate = useNavigate()
    const [scoreData, setScoreData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!user){
                alert('Bạn cần đăng nhập để thực hiện chức năng này')
                setLoading(false)
                navigate('/')
                return
            }
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
                // ===================================

                setScoreData(sortedScores);
                // setScoreData(userScore)
            }
            catch (err){
                console.log("Không tải được câu hỏi", err)
            }
            finally {
                setLoading(false)

            }
        }
        fetchQuestions()
    }, [user]);
    return (
        <div className="flex justify-center items-center">
            <div className="my-15 md:my-20 w-4/5 sm:w-9/10 border-2 border-p-400 p-5 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3">
                {loading? (<div>danbg loai</div>) :
                    <div className="w-full">
                        <div className="w-full  py-3 px-5 ">
                            <h1 className="font-bold text-xl text-center text-n-600">Your Score</h1>
                        </div>
                        <div className="flex flex-col w-full ">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y-2 divide-gray-300">
                                            <thead>
                                            <tr>
                                                <th scope="col"
                                                    className=" px-6 py-3 text-center text-sm font-medium text-n-900 uppercase">Name
                                                </th>
                                                <th scope="col"
                                                    className=" px-6 py-3 text-center text-sm font-medium text-n-900 uppercase">Topic
                                                    Title
                                                </th>
                                                <th scope="col"
                                                    className=" px-6 py-3 text-center text-sm font-medium text-n-900 uppercase">Date
                                                </th>
                                                <th scope="col"
                                                    className=" px-6 py-3 text-center text-sm font-medium text-n-900 uppercase">Time
                                                </th>
                                                <th scope="col"
                                                    className=" px-6 py-3 text-center text-sm font-medium text-n-900 uppercase">Score
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                            {
                                                scoreData.map((q, index) => (
                                                    <tr key={index}>
                                                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-n-600">{q.email.split('@')[0]}</td>
                                                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-n-600">{q.topic}</td>
                                                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-n-600">{q.day}/{q.month}</td>
                                                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-n-600">{q.hours}:{q.minutes < 10 ? (`0${q.minutes}`) :q.minutes }</td>
                                                        {/*<td className="text-center px-6 py-4 whitespace-nowrap text-sm text-n-600"><span className={`${q.score < 5 ? 'bg-red-200 text-red-500': 'bg-green-200 text-green-500'} text-shadow-sm font-bold px-6 py-2 rounded-sm`}>{q.score}</span></td>*/}
                                                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-n-600"><span className={`${q.score < 5 ? (q.score < 2.5 ?'bg-red-200 text-red-500' :'bg-purple-200 text-purple-500'): (q.score < 7.5 ?'bg-sky-200 text-sky-500' :'bg-green-200 text-green-500')} text-shadow-sm font-bold px-6 py-2 rounded-sm`}>{q.score}</span></td>


                                                    </tr>
                                                ))
                                            }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

            </div>
        </div>
    );
};

export default UserScore;