import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
export default (props) => {
    const {filterBy, className = 'w-100', name = '' } = props;
    return (
        <DatePicker
            className={classNames(className)}
            defaultValue={moment(new Date(), "DD-MM-YYYY")}
            allowClear={true}
            format={"DD-MM-YYYY"}
            onChange={(date,dateString) => {
                filterBy(name,dateString)
            }}
        />
    );
};
