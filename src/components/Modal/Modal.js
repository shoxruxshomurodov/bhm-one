import React from 'react';
import {Modal} from 'antd';
import classNames from 'classnames';

export default (props) => {
    const {
        title = '',
        visible,
        onOk = () => {
        },
        onCancel = () => {
        },
        okText = '',
        cancelText = '',
        children,
        className = '',
        hasFooter = true
    } = props;
    return (
        <Modal
            className={classNames(className)}
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
            footer={hasFooter ? "" : null}
        >
            {children}
        </Modal>
    );
};
