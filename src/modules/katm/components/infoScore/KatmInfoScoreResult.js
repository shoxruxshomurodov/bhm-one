import React, { Component } from 'react';

import isNil from 'lodash/isNil';
import get from 'lodash/get';
import { Result, Button, notification } from 'antd';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import actions from '../../../Actions';
import isEqual from 'lodash/isEqual';
import KatmInfoScoreContainer from "./KatmInfoScoreContainer";

class KatmInfoScoreResult extends Component {
    refreshService = () => {
        const { refresh_service, name = 'katm',client_type } = this.props;
        refresh_service({ name, client_type });
    };
    componentDidUpdate(prevProps) {
        const { isFetched: isFetchedPrev } = prevProps;
        const { isFetched, message } = this.props;
        if (isEqual(message, 'success') && !isEqual(isFetchedPrev, isFetched) && isFetched) {
            this.successNotification();
        }
        if (!isEqual(message, 'success') && !isEqual(isFetchedPrev, isFetched) && isFetched) {
            this.errorNotification();
        }
    }

    successNotification = () => {
        notification.success({
            message: `Katm data successfully refreshed`,
        });
    };

    errorNotification = () => {
        const { message } = this.props;
        notification.error({
            message: 'Katm data is not refreshed',
            description: `${message}`,
        });
    };

    render() {
        const { client_id } = this.props;
        return (
            <div
                id="ckoring_k"
                style={{
                    margin: 'auto',
                    width: '960px',
                    lineHeight: 'normal',
                    backgroundColor: '#fff',
                    padding: '10px',
                }}
            >
                <KatmInfoScoreContainer client_id={client_id}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refresh_service: ({ name, client }) => {
            dispatch({ type: actions.REFRESH_SERVICES.REQUEST, payload: { name, client } });
        },
    };
};

const mapStateToProps = (state) => {
    return {
        isFetched: get(state, 'admin.katm.isFetched', false),
        message: get(state, 'admin.katm.data.message'),
    };
};

export default withTranslation('bhm_one')(connect(mapStateToProps, mapDispatchToProps)(KatmInfoScoreResult));
