import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {get} from "lodash";

class KatmNotFound extends Component {

    render() {
        let {monitoringById, t} = this.props;

        return (
            <>
                <h2>NOT COMPLETED</h2>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="card p-4">
                            <div className="row">
                                <div className="col-5">
                                    <strong>{t("Status")}: </strong>
                                    <span>{get(monitoringById, 'status')}</span>
                                </div>

                                <div className="col-5">
                                    <strong>{t("Passport Serial")}: </strong>
                                    <span>{get(monitoringById, 'passportSerial')}</span>
                                </div>

                                <div className="col-5">
                                    <strong>{t("Passport Number")}: </strong>
                                    <span>{get(monitoringById, 'passportNumber')}</span>
                                </div>

                                <div className="col-5">
                                    <strong>{t("Nps")}: </strong>
                                    <span>{get(monitoringById, 'nps')}</span>
                                </div>

                                <div className="col-5">
                                    <strong>{t("Mfo")}: </strong>
                                    <span>{get(monitoringById, 'mfo')}</span>
                                </div>

                                <div className="col-5">
                                    <strong>{t("Info Type")}: </strong>
                                    <span>{get(monitoringById, 'infoType')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withTranslation('bhm_one')(connect(null, null)(KatmNotFound));