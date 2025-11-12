import React from 'react';

const ScoreTableRow = ({ scoreItem }) => {
    const { email, topic, day, month, hours, minutes, score } = scoreItem;

    return (
        <tr>
            <td className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-n-600">{email.split('@')[0]}</td>
            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-n-600">{topic}</td>
            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-n-600">{day}/{month}</td>
            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-n-600">{hours}:{minutes < 10 ? (`0${minutes}`) : minutes}</td>
            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-n-600">
                <span
                    className={`${score < 5 ? (score < 2.5 ? 'bg-red-200 text-red-500' : 'bg-purple-200 text-purple-500') : (score < 7.5 ? 'bg-sky-200 text-sky-500' : 'bg-green-200 text-green-500')} text-shadow-sm font-bold px-6 py-2 rounded-sm`}>
                    {score}
                </span>
            </td>
        </tr>
    );
};

export default ScoreTableRow;
