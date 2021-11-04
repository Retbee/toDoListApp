import React from 'react';

const Counter = () => {

    const [likes, setLikes] = React.useState(0)

    const handleIncrement = () => {
        setLikes(likes + 1)
    }

    const handleDecrement = () => {
        setLikes(likes - 1)
    }
    return (
        <div>
            <h1>{likes}</h1>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
        </div>
    );
};

export default Counter;