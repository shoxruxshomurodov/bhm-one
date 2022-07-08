import React, {Component} from 'react';
import actions from "../../katm/actions";
import {get, isEmpty, isEqual, isNull} from "lodash";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Title from "../../../components/Title/Title";
import KATM from "../components/Katm";
import KatmNotFound from "../components/Katm/KatmNotFound";
class MonitoringViewContainer extends Component {
    componentDidMount() {
        const {getMonitoringView, match: {params: {id}}} = this.props;
        getMonitoringView({id});

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {getMonitoring,monitoringById,match: {params: {id}},getMonitoringView} = this.props
        const {monitoringById:prevMonitoring,match: {params: {id:prevId}}} = prevProps;
        if(!isEqual(get(monitoringById,"nps"),get(prevMonitoring,"nps")) && !isNull(get(monitoringById,"nps"))) {
            getMonitoring({params:{nps:get(monitoringById,"nps")}})
        }
        if(!isEqual(id,prevId)) {
            getMonitoringView({id});
        }
    }

    render() {
        let {monitoringById, t,monitoring} = this.props;
        if(isEmpty(monitoringById)) {
            return "Loading ..."
        }
        return (
            <div className={"page-content padding"}>
                <div className="row">
                    <div className="col-md-12">
                        <Title>{t("Monitoring")}</Title>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            isEqual(get(monitoringById, "status"), "COMPLETED")
                            ? <KATM {...get(monitoringById, "scoring.report")} monitoring={monitoring} rwd={get(monitoringById, "rwd")} monitoringById={monitoringById}/>
                            : <KatmNotFound monitoringById={monitoringById} t={t} />
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMonitoringView: (id) => {
            dispatch({type: actions.GET_VIEW_MONITORING.REQUEST, payload: id});
        },
        getMonitoring: (params) => {
            dispatch({type: actions.GET_MONITORING.REQUEST, payload: params});
        },
    };
};

const mapStateToProps = (state) => {
    return {
        monitoringById: get(state, "katm.monitoringById", {}),
        monitoring:get(state, "katm.monitoring", []),
        isFetched: get(state, "katm.isFetched", false),
    };
};
export default withTranslation("bhm_one")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MonitoringViewContainer)));
