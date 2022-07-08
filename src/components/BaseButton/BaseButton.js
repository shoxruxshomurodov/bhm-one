import React from 'react';
import classNames from "classnames";

const BaseButton = ({
                        className = "btn-primary",
                        children,
                        style = {marginTop: '22px', height: '35px'},
                        disabled=false,
                        handleBtn = () => {
                            console.log('Handling...')
                        }
                    }) => {
    return (
        <button type="button" disabled={disabled} onClick={() => handleBtn()} className={classNames(`btn ${className}`)}
                style={style}>{children}</button>
    );
};

export default BaseButton;
