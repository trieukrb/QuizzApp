import React from 'react';
import { Link } from 'react-router-dom';

const TopicCard = ({ topic }) => {
    return (
        <li className="px-2 py-4 border-2 bg-n-50 border-p-400 rounded-lg shadow-lg hover:shadow-2xl transition delay-70 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102">
            <div className="flex items-center text-lg text-center text-wrap justify-center h-20 p-2 text-n-700 font-bold ">
                {topic.name}
            </div>
            <div className="flex gap-3 px-2 text-n-950">
                <Link to={`/flash-card/${topic.path}`} className="bg-p-300/70 shadow-lg py-2 px-1 text-wrap rounded-xl w-full text-center  cursor-pointer hover:bg-p-400 flex items-center justify-center">
                    Flash Card
                </Link>
                <Link to={`/quiz/${topic.path}`} className="bg-p-300/70 py-2 px-1 shadow-lg rounded-xl w-full text-center cursor-pointer hover:bg-p-400 flex items-center justify-center">
                    Quiz
                </Link>
            </div>
        </li>
    );
};

export default TopicCard;
