import React from "react";
import {withTranslation} from "react-i18next";
import QrCode from '../web/qr_code.png';
import {get} from "lodash/object";

const ReportInfo = (props) => {
        const {data} = props;
        return (
            <div className="katm-report-info">
                <ul style={{paddingLeft:"0px"}} className="katm-report-info__content">
                    <li>
                        <span className="katm-color--grey">Тип кредитного отчёта: </span> <span
                        className="katm-color--black">177 "InfoScore" </span>
                    </li>
                    <li>
                        <span className="katm-color--grey">Пользователь кредитного отчёта: </span><span
                        className="katm-color--black">{get(data,'sysinfo.user_id')}</span>
                    </li>
                    <li>
                        <span className="katm-color--grey">Номер запроса: </span> <span
                        className="katm-color--black">{get(data,'sysinfo.demand_id')}</span>
                        <span className="katm-color--grey"> Время запроса: </span> <span
                        className="katm-color--black">{get(data,'sysinfo.demand_date_time')}</span>
                    </li>
                    <li>
                        <span className="katm-color--grey">Номер согласия: </span> <span
                        className="katm-color--black">{get(data,'sysinfo.consent_id')}</span>
                        <span className="katm-color--grey"> Дата согласия: </span> <span
                        className="katm-color--black">{get(data,'sysinfo.consent_date')}</span>
                    </li>
                    <li>
                        <span className="katm-color--grey">Номер заявки: </span> <span
                        className="katm-color--black"> {get(data,'sysinfo.claim_id')}</span>
                        <span className="katm-color--grey"> Дата заявки: </span> <span
                        className="katm-color--black"> {get(data,'sysinfo.claim_date')}</span>
                    </li>
                </ul>

                <div className="katm-report-info__qrcode">
                    <img
                        width="64"
                        height="64"
                        src={QrCode}
                        alt="qr"
                    />
                </div>
            </div>
        );
    }

export default withTranslation('bhm_one')((ReportInfo));