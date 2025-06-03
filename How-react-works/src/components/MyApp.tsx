import React, { useState } from 'react';

type ContentDetails = {
    summary: string;
    details: string;
};

const content: ContentDetails[] = [
    {
        summary: 'React is a library for building UIs',
        details:
            'Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        summary: 'State management is like giving state a home',
        details:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        summary: 'We can think of props as the component API',
        details:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
];

export default function MyApp() {
    return (
        <div>
            <Tabbed content={content} />
        </div>
    );
}

type TabbedProps = {
    content: ContentDetails[];
};

function Tabbed({ content }: TabbedProps) {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className=''>
            <div>
                <Tab activeTab={activeTab} num={0} onClick={setActiveTab} />
                <Tab activeTab={activeTab} num={1} onClick={setActiveTab} />
                <Tab activeTab={activeTab} num={2} onClick={setActiveTab} />
                <Tab activeTab={activeTab} num={3} onClick={setActiveTab} />
            </div>

            {activeTab <= 2 ? <TabContent item={content[activeTab]} /> : <DifferentTab />}
        </div>
    );
}

type TabProps = {
    num: number;
    activeTab: number;
    onClick: React.Dispatch<React.SetStateAction<number>>;
};

function Tab({ num, activeTab, onClick }: TabProps) {
    return (
        <button className={`${num === activeTab && 'bg-red-500 text-white'} rounded px-3 py-2`} onClick={() => onClick(num)}>
            Tab {num + 1}
        </button>
    );
}

type TabContentProps = {
    item: ContentDetails;
};

function TabContent({ item }: TabContentProps) {
    const [showDetails, setShowDetails] = useState(true);
    const [likes, setLikes] = useState(0);

    const handleLike = () => {
        setLikes((l) => l + 1);
    };

    return (
        <div className='block'>
            <h2>{item.summary}</h2>
            <p>{showDetails && item.details}</p>

            <button onClick={() => setShowDetails((d) => !d)}>{showDetails ? 'Hide' : 'Show'} details</button>
            <div>
                <span>{likes} ❤️</span>
                <button onClick={handleLike}>Like</button>
            </div>
        </div>
    );
}

function DifferentTab() {
    return (
        <div>
            <h2>This is something diferent</h2>
            <p>When you arrive on this tab everything wil be reset.</p>
        </div>
    );
}
