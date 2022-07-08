import Button from 'antd-button-color';
import React from 'react'
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';

function CustomButton(props) {
    return <Button {...props}>
        {props.children}
    </Button>;
}

export default React.memo(CustomButton);