import React from 'react';
const Title = ({children}) => {
    return (
        <div className={"row"}>
            <div className="col-md-12">
                <h2 className={"text-md text-highlight mode-text-dark"}>{
                    children
                }</h2>
            </div>
        </div>
    );
};

export default Title;
