import React from "react";
import {withTranslation} from "react-i18next";


import {get, has} from "lodash";
import ContingentLiability from "./ContingentLiability";

const StepSeven = (props) => {
    const {data} = props;
    const contingent_liabilities = get(data,'contingent_liabilities.contingent_liability')
    return (
        <div>
            <div className="katm-step-row">
                <div className="katm-step-row__num">7.</div>
                <div className="katm-step-row__name">УСЛОВНЫЕ ОБЯЗАТЕЛЬСТВА</div>
            </div>

            {contingent_liabilities && has(contingent_liabilities,'subject_type') ?
                <ContingentLiability data={contingent_liabilities} index ={1}/> : ''
            }
            {contingent_liabilities && !has(contingent_liabilities,'subject_type') &&
            contingent_liabilities.map((value, index, ) => {
                    return (
                        <ContingentLiability key={index} data={contingent_liabilities} index ={index+1} />
                    );

                }
            )}
        </div>
    );
}

export default withTranslation('bhm_one')((StepSeven));