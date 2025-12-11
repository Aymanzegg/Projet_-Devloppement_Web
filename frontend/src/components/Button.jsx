import React from 'react';
import '../index.css';



const Button = ({ text, onClick, type = "button", styleType = "primary" }) => {
    return (
        <button type={type} onClick={onClick} className={`btn btn-${styleType}`}>
            {text}
        </button>
    );
};

export default Button;