"use client";
import React from 'react';



const AboutPage = () => {
    const [count, setCount] = React.useState(0);
    const increment = () => setCount(count + 1);

    return (
        <>
            <h1 className="text-3xl font-bold underline">About Page</h1>
            <p className="text-lg">This is the about page.</p>
            <button onClick={increment} className="bg-blue-500 text-white p-2 rounded">
                Count: {count}
            </button>
        </>
    )
}

export default AboutPage;