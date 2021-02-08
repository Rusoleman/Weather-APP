import React from 'react';
import "./component-styles.css";

const Button = ({content,nameFunction}) => {
    return(
        <div className="container-button">
            <button onClick={nameFunction} className="button-style">
                {content}
            </button>
        </div>
    );
}

export default Button;