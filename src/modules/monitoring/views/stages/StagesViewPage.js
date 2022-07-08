import React, {useEffect} from 'react';
import ApiActions from "../../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom";
import {get} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {withTranslation} from "react-i18next";
import StagesScheme from "../../../../schema/Stages";
function StagesViewPage(props) {
    const {t} = props;
    const {id} = useParams();
    const entities = useSelector(state => get(state, 'normalize.entities', {}));
    let stage = useSelector(state => get(state, 'normalize.data.get-monitoring-stages-one.result', {}));
    let isFetchedData = useSelector(state => get(state, 'normalize.data.get-monitoring-stages-one.isFetched', false));
    stage = Normalizer.Denormalize(stage, StagesScheme, entities);
    const dispatch = useDispatch();
    const getMonitoringStage = () => {
        const storeName = 'get-monitoring-stages-one';
        const entityName = 'stage';
        const scheme = {StagesScheme};
        dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `monitoring/stages/${id}`,
                config: {
                    params: {
                    }
                },
                scheme,
                storeName,
                entityName,
            },
        });
    }
    useEffect(() => {
        getMonitoringStage();
    }, [])
    if (!isFetchedData) {
        return <Loader/>
    }
    return (
        <>
            <div className="d-flex flex" id="content-body">
                <div className="d-flex flex-column flex">
                    <div className="p-3">
                        <div className="toolbar"><Link to={"/credit-monitoring/stages"}
                                                       className="btn btn-sm btn-white"
                                                       data-pjax-state>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                 className="feather feather-arrow-left">
                                <line x1={19} y1={12} x2={5} y2={12}/>
                                <polyline points="12 19 5 12 12 5"/>
                            </svg>
                        </Link>
                            <Link to={`/credit-monitoring/stages/update/${id}`}
                                  className={"btn w-xs btn-warning ml-auto d-block mr-2 mb-2"}>{t("Update")}</Link>
                        </div>
                    </div>
                    <div className="mx-3">
                        <h1>{t("Title")} :{get(stage,"title")}</h1>
                        <h1>{t("Comment")} :{get(stage,"comment")}</h1>
                        <h1>{t("Start day")} :{get(stage,"start_day")}</h1>
                        <h1>{t("Expire day")} :{get(stage,"expire_day")}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
export default withTranslation("bhm_one")(StagesViewPage);
