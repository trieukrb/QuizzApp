import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

export default function VocalHome() {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/db");
                setTopics(Object.keys(res.data));
            }
            catch (err) {
                console.log("Lỗi khi tải dữ liệu:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="my-15 md:my-20 w-4/5 md:w-3/4 p-5 bg-neutral-50 flex items-center flex-col rounded-2xl shadow-2xl gap-3">
                <h3 className="my-4 text-xl font-bold">📚 Danh sách chủ đề TOEIC</h3>
                {topics.length ? (
                    <ul className="flex justify-center flex-wrap gap-4 py-4">
                        {topics.slice(1).map(k =>
                            <li key={k} value={k}>
                                <Link to={`/quiz/${k}`} className="block w-70 p-2 bg-p-200 text-neutral-200 rounded-lg text-center cursor-pointer">
                                    {k.charAt(0).toUpperCase() + k.slice(1)}
                                </Link>
                            </li>)}
                    </ul>
                ) : <p>Đang tải dữ liệu...</p>}
            </div>

        </div>
    );
}
