import React from 'react';

function ItemHead(props) {
    const {head} = props;
    return (
        <thead>
        <tr>
            {head &&
            head.map((th, index) => {
                return <th className="text-muted sortable" key={index}>{th}</th>;
            })}
        </tr>
        </thead>
    );
}

export default ItemHead;