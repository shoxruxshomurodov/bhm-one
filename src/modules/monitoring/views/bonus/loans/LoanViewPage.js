import React, {useEffect} from "react";
import LoansScheme from "../../../../../schema/Loans";
import ApiActions from "../../../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {get} from "lodash";
import Normalizer from "../../../../../services/normalizr";
import Loader from "../../../../../components/Loader";
import {withTranslation} from "react-i18next";
function LoanView(props) {
    const {t} = props;
    const {loan_id: id} = useParams();
    const entities = useSelector((state) => get(state, "normalize.entities", {}));
    let data = useSelector((state) =>
        get(state, "normalize.data.monitoring-loan.result", {})
    );
    let isFetched = useSelector((state) =>
        get(state, "normalize.data.monitoring-loan.isFetched", false)
    );
    data = Normalizer.Denormalize(data, LoansScheme, entities);
    const dispatch = useDispatch();
    const getLoan = () => {
        const storeName = "monitoring-loan";
        const entityName = "loan";
        const scheme = {LoansScheme};
        dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `bonus/bonus-loan/${id}`,
                config: {
                    params: {
                        include: "region"
                    },
                },
                scheme,
                storeName,
                entityName,
            },
        });
    };
    const first_name = get(data, "client_name")?.split(" ")[1]
    const last_name = get(data, "client_name")?.split(" ")[0]
    const middle_name = get(data, "client_name")?.split(" ")[2]
    useEffect(() => {
        getLoan();
    }, []);
    if (!isFetched) {
        return <Loader/>;
    }
    return (
        <>
            <div className="d-flex flex" id="content-body">
                <div className="d-flex flex-column flex">
                    <div className="p-3">
                        <div className="toolbar">
                            <button
                                onClick={() => window.history.back()}
                                className="btn btn-sm btn-white"
                                data-pjax-state
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-arrow-left"
                                >
                                    <line x1={19} y1={12} x2={5} y2={12}/>
                                    <polyline points="12 19 5 12 12 5"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="scroll-y mx-3 card">
                        <div className="p-4 d-sm-flex no-shrink b-b">
                            <div
                                className={"avatar w-96 gd-info"}
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    fontSize: "25px",
                                }}
                            >
                                {`${last_name?.charAt(0)}.${first_name?.charAt(0)}.${middle_name?.charAt(0)}`}
                            </div>
                            <div className="px-sm-4 my-3 my-sm-0 flex">
                                <h2 className="text-md">
                                    {get(data, "id")} - {get(data, "client_name")}
                                </h2>
                                <div className="my-3">
                                    <a data-pjax-state>
                                        <strong>{t("Даври")} {" "}</strong>
                                        <span className="text-muted">
                                            {get(data, "open_date")} / {get(data, "close_date")}
                                        </span>
                                    </a>
                                </div>
                                <div>
                                    <strong>{t("Filial")}</strong>{" "}
                                    <span className={"text-muted"}>
                                        {get(data, "filial_code")} - {get(data, "region.name")}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div
                                className={`col-md-8`}
                            >
                                <div className="p-4">
                                    <div className="b-b">
                                        <div className="nav-active-border b-primary bottom">
                                            <ul className="nav" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link active"
                                                        id="detail-tab"
                                                        data-toggle="tab"
                                                        href="#detail"
                                                        role="tab"
                                                        aria-controls="detail"
                                                        aria-selected="false"
                                                    >
                                                        {t("Details")}
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        id="contact-tab"
                                                        data-toggle="tab"
                                                        href="#contact3"
                                                        role="tab"
                                                        aria-controls="contact"
                                                        aria-selected="false"
                                                    >
                                                        {t("История")}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tab-content p-3">
                                        <div
                                            className="tab-pane fade active show"
                                            id="detail"
                                            role="tabpanel"
                                            aria-labelledby="detail-tab"
                                        >
                                            <div className="alert alert-info" role="alert">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={16}
                                                    height={16}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-info"
                                                >
                                                    <circle cx={12} cy={12} r={10}/>
                                                    <line x1={12} y1={16} x2={12} y2={12}/>
                                                    <line x1={12} y1={8} x2={12} y2={8}/>
                                                </svg>
                                                <span className="mx-2">
                              {t("Ma'lumot mavjud emas")}
                            </span>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="contact3"
                                            role="tabpanel"
                                            aria-labelledby="contact-tab"
                                        >
                                            <div className="alert alert-info" role="alert">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={16}
                                                    height={16}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-info"
                                                >
                                                    <circle cx={12} cy={12} r={10}/>
                                                    <line x1={12} y1={16} x2={12} y2={12}/>
                                                    <line x1={12} y1={8} x2={12} y2={8}/>
                                                </svg>
                                                <span className="mx-2">
                              {t("Ma'lumot mavjud emas")}
                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-4"}>
                                <div className={"p-4"}>
                                    <div className="list list-row">
                                       <h1>TEST</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation("bhm_one")(LoanView);
