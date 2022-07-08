import React from "react";
import {withTranslation} from "react-i18next";

import {get, has,isEmpty} from "lodash";
const StepNine = (props) => {
    const {data} = props;
    const blackList = get(data,'blacklist.blacklist_info');
    return (
        <div>
            <div className="katm-step-row">
                <div className="katm-step-row__num">9.</div>
                <div className="katm-step-row__name">НЕГАТИВНЫЕ СЛУЧАИ <span className="katm-color--grey">(НЕГАТИВНЫЙ СПИСОК)</span>
                </div>
            </div>
            <div className="katm-table-row">
                <table className="katm-table" border="0">
                    <thead>
                    <tr>
                        <th width="15" className="katm-table-nums">№</th>
                        <th className="katm-text--left">
                            ДАТА
                            <br/>
                            ВКЛЮЧЕНИЯ
                        </th>
                        <th className="katm-text--left">
                            ДАТА <br/>
                            ИСКЛЮЧЕНИЯ
                        </th>
                        <th className="katm-text--left">
                            ОРГАНИЗАЦИЯ, ПРЕДСТАВИВШАЯ ИНФОРМАЦИЮ О НЕГАТИВНОМ СЛУЧАЕ
                        </th>

                        <th className="katm-text--right">№ ЗАЯВКИ</th>
                        <th className="katm-text--right">№ И ДАТА <br/>СОГЛАСИЯ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blackList && has(blackList,'claim_id') ?
                        <tr>
                            <td>{get(blackList,'claim_id')}</td>
                            <td> {get(blackList,'inclusion_date')}</td>
                            <td> {get(blackList,'exclusion_date')}</td>
                            <td className="katm-text--left">
                                {get(blackList,'org')}
                            </td>

                            <td className="katm-text--right">{get(blackList,'claim_id')}</td>
                            <td className="katm-text--right">{get(blackList,'claim_date')}</td>
                        </tr> : ''
                    }
                    {blackList && !has(blackList,'claim_id') &&
                    blackList.map((value, index, ) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td> {get(value,'inclusion_date')}</td>
                                    <td> {get(value,'exclusion_date')}</td>
                                    <td className="katm-text--left">
                                        {get(value,'org')}
                                    </td>

                                    <td className="katm-text--right">{get(value,'claim_id')}</td>
                                    <td className="katm-text--right">{get(value,'claim_date')}</td>
                                </tr>
                            );

                        }
                    )}
                    </tbody>
                </table>
                {isEmpty(get(blackList, "claim_id")) && <p style={{ textAlign: "center",fontWeight:"bold" }}>Не имеется</p>}
            </div>
        </div>
    );
}

export default withTranslation('bhm_one')((StepNine));