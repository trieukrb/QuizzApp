import React from 'react';
import ScoreTableRow from './ScoreTableRow';

const ScoreTable = ({ scoreData }) => {
    return (
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
                                    scoreData.map((q) => (
                                        <ScoreTableRow key={q.id} scoreItem={q} />
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ScoreTable;
