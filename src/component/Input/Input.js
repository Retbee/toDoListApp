import React from 'react';

const Input = () => {

    const [value, setValue] = React.useState("ТЕКСТ В ИНПУТЕ")

    const handleInput = (event) => {
        event.preventDefault()
        setValue(event.target.value)
    }

    return (
        <div>
            <h1>{value}</h1>
            <input
                type="text"
                value={value}
                onChange={handleInput}
            />
        </div>
    );
};

export default Input;