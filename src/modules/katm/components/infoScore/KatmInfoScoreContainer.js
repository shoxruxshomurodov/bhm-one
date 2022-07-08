import React, {Component, useEffect} from 'react';


import { withTranslation } from 'react-i18next';
import './css/score.css';
import StepOne from "./steps/StepOne";
import ReportInfo from "./steps/ReportInfo";
import Header from "./steps/Header";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import StepSix from "./steps/StepSix";
import StepSeven from "./steps/StepSeven";
import StepEight from "./steps/StepEight";
import StepNine from "./steps/StepNine";
import StepTen from "./steps/StepTen";
import ApiActions from "../../../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import get from "lodash/get";
import Normalizer from "../../../../../services/normalizer";
import Loader from "../../../../../components/Loader";
import KatmInfoScore from "../../../../../schema/KatmInfoScore";
import {Button, Result} from "antd";
import isNil from "lodash/isNil";
import Main from "../Main";
import Footer from "../Footer";

const KatmInfoScoreContainer = ({ t, client_id}) => {
    const dispatch = useDispatch();
    const entities = useSelector((state) => get(state, 'normalizer.entities'));
    const isFetchedData = useSelector((state) =>
        get(state, 'normalizer.data.client-katm-info-score.isFetched', false)
    );
    const result = useSelector((state) =>
        get(state, 'normalizer.data.client-katm-info-score.result', {})
    );
    const dataScore = Normalizer.Denormalize(result, KatmInfoScore, entities);
    const dataInfo = get(dataScore,'info');
    const score_grade = get(dataInfo, 'scorring.scoring_grade');
    const getData = (client_id) => {
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/crm/client/katm-info-score/${client_id}`,
                scheme: KatmInfoScore,
                storeName: 'client-katm-info-score',
                entityName: 'katmInfoScore',
            },
        });
    };

    useEffect(() => {
        getData(client_id);
    }, []);

    if (!isFetchedData) {
        return <Loader />;
    }

        return (
            <div>
                {isNil(score_grade) ? (
                    <Result
                        status="500"
                        title={t('Sorry')}
                        subTitle={t('Katm is not working.')}
                        extra={
                            <Button type="primary" onClick={() => this.refreshService()}>
                                Refresh
                            </Button>
                        }
                    />
                ) : (
                    <>
                        <div className="katm-main-page">
                            <div className="katm-sub-page">
                                <header id="header">
                                    <Header data={dataInfo}/>
                                </header>

                                <section id="report-info">
                                    <ReportInfo  data={dataInfo}/>
                                </section>

                                {/*СУБЪЕКТ КРЕДИТНОЙ ИНФОРМАЦИИ*/}
                                <section id="step-1">
                                    <StepOne data={dataInfo}/>
                                </section>

                                <section id="step-2">
                                    <StepTwo data={dataInfo}/>
                                </section>


                                <section id="step-3">
                                    <StepThree data={dataInfo}/>
                                </section>


                                <section id="step-4">
                                    <StepFour data={dataInfo} />
                                </section>


                                <section id="step-5">
                                    <StepFive data={dataInfo}/>
                                </section>


                                <section id="step-6">
                                    <StepSix data={dataInfo}/>
                                </section>


                                <section id="step-7">
                                    <StepSeven data={dataInfo}/>
                                </section>


                                <section id="step-8">
                                    <StepEight data={dataInfo}/>
                                </section>


                                <section id="step-9">
                                    <StepNine data={dataInfo}/>
                                </section>

                                <section id="step-10">
                                    <StepTen data={dataInfo}/>
                                </section>
                            </div>
                        </div>
                    </>
                )}
            </div>

        );
}





export default withTranslation('bhm_one')(KatmInfoScoreContainer);
