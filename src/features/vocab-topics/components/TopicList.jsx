import React from 'react';
import TopicCard from './TopicCard';

const TopicList = ({ topics }) => {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 py-4">
            {topics.map(topic => (
                <TopicCard key={topic.id} topic={topic} topicLength={topics.length} />
            ))}
        </ul>
    );
};

export default TopicList;
