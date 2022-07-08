import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import ScoreIndicator from "../../ScoreIndicator/ScoreIndicator";
import {get} from "lodash";


const StepTwo = (props) => {
    const {data} = props;
    return (
        <div>
            <div className="katm-step-row">
                <div className="katm-step-row__num">2.</div>
                <div className="katm-step-row__name"> SCORING CIAC</div>
            </div>

            <div className="katm-scoring">
                <ul className="katm-scoring-desc">
                    <li><span> Скоринговый балл: </span> <b> {get(data,'scorring.scoring_grade')} </b></li>
                    <li><span> Класс оценки: </span> <b> {get(data,'scorring.scoring_class')}, {get(data,'scorring.scoring_level')} </b></li>

                    <li><span> ВЕРСИЯ СКОРИНГА: </span> <b> {get(data,'scorring.scoring_version')} </b></li>
                </ul>
                <div className="katm-scoring-score">
                    <ScoreIndicator score_point={get(data,'scorring.scoring_grade',0)}/>
                </div>
                <div className="katm-scoring-ball">
                    <div className="katm-scoring-ball__lvl">{get(data,'scorring.scoring_class')}</div>
                    <b className="katm-scoring-ball__title">{get(data,'scorring.scoring_level')}</b>
                </div>
            </div>
        </div>
    );

}

export default withTranslation('bhm_one')((StepTwo));