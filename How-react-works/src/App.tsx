import { useState } from 'react';

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

function App() {
    return (
        <div>
            <Tabbed content={content} />
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
        <button className={activeTab === num ? 'tab active' : 'tab'} onClick={() => onClick(num)}>
            Tab {num + 1}
        </button>
    );
}

type TabbedProps = {
    content: ContentDetails[];
};

function Tabbed({ content }: TabbedProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className='tabs'>
                <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
                <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
                <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
                <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
            </div>

            {activeTab <= 2 ? <TabContent item={content[activeTab]} key={content[activeTab].summary} /> : <DifferentContent />}
        </div>
    );
}

type TabContentProps = { item: ContentDetails };

function TabContent({ item }: TabContentProps) {
    const [showDetails, setShowDetails] = useState(true);
    const [likes, setLikes] = useState(0);

    console.log('RENDER');

    function handleInc() {
        setLikes((likes) => likes + 1);
    }

    function handleTripleInc() {
        setLikes((likes) => likes + 1);
        setLikes((likes) => likes + 1);
        setLikes((likes) => likes + 1);
    }

    function handleUndo() {
        setShowDetails(true);
        setLikes(0);
    }

    function handleLaterUndo() {
        setTimeout(handleUndo, 2000);
    }

    return (
        <div className='tab-content'>
            <h4>{item.summary}</h4>
            {showDetails && <p>{item.details}</p>}

            <div className='tab-actions'>
                <button onClick={() => setShowDetails((h) => !h)}>{showDetails ? 'Hide' : 'Show'} details</button>

                <div className='hearts-counter'>
                    <span>{likes} ❤️</span>
                    <button onClick={handleInc}>+</button>
                    <button onClick={handleTripleInc}>+++</button>
                </div>
            </div>

            <div className='tab-undo'>
                <button onClick={handleUndo}>Undo</button>
                <button onClick={handleLaterUndo}>Undo in 2s</button>
            </div>
        </div>
    );
}

function DifferentContent() {
    return (
        <div className='tab-content'>
            <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
        </div>
    );
}

export default App;
