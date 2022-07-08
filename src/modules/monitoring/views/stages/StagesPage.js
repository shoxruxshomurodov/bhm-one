import React, {useEffect, useState} from 'react';
import FilterAside from "../../../../components/FilterAside";
import TemplateTable from "../../../../components/TemplateTable";
import Toolbar from "../../../../components/Toolbar";
import Pagination from "../../../../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import StagesScheme from "../../../../schema/Stages";
import {get, isEmpty, isEqual} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {Link, useHistory} from "react-router-dom";
import classNames from "classnames"
import {withTranslation} from "react-i18next";
import moment from "moment";
function StagesPage(props) {
    const {t} = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [active, setActive] = useState("")
    const data = useSelector(state => get(state, "normalize.data.credit-monitoring-stages.result", []));
    const isFetchedData = useSelector(state => get(state, "normalize.data.credit-monitoring-stages.isFetched", true));
    const meta = useSelector(state => get(state, "normalize.data.credit-monitoring-stages.result._meta", []));
    const entities = useSelector(state => get(state, "normalize.entities", []));
    const stages = get(Normalizer.Denormalize(data, {data: [StagesScheme]}, entities), "data", []);
    const getAllStages = (params = {}) => {
        const storeName = "credit-monitoring-stages";
        const entityName = "stage";
        const scheme = {data: [StagesScheme]}
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: "/monitoring/stages",
                config: {
                    params: {
                        ...params
                    }
                },
                scheme,
                storeName,
                entityName
            }
        });
    }
    const pagination = (page = 1) => {
        getAllStages({page})
    };
    const onSearch = (search) => {
        getAllStages({search})
    }
    useEffect(() => {
        getAllStages({});
    }, []);
    return (
        <div className={"d-flex flex fixed-content mt-2"}>
            <FilterAside title={t("Stages")}>
                <div className="scrollable hover">
                    <div className="sidenav p-2">
                        <nav className="nav-active-text-primary" data-nav>
                            <ul className="nav">
                                <li><a href="app.user.html#all" data-pjax-state><span className="nav-text">All</span>
                                    <span
                                        className="nav-badge"><b className="badge badge-sm badge-pill gd-danger">15</b></span></a>
                                </li>
                                <li><a href="app.user.html#company" data-pjax-state><span
                                    className="nav-text">Company</span> <span
                                    className="nav-badge"><b className="badge badge-sm badge-pill gd-info">3</b></span></a>
                                </li>
                                <li><a href="app.user.html#personal" data-pjax-state><span
                                    className="nav-text">Personal</span></a></li>
                                <li><a href="app.user.html#team" data-pjax-state><span className="nav-text">Team</span></a>
                                </li>
                                <li className="nav-header hidden-folded mt-2"><span
                                    className="d-block pt-1 text-sm text-muted">Tags</span></li>
                                <li><a href="app.user.html#client" data-pjax-state><span className="mx-2"><b
                                    className="badge badge-circle sm text-primary"/> </span><span
                                    className="nav-text">Clients</span></a>
                                </li>
                                <li><a href="app.user.html#supplier" data-pjax-state><span className="mx-2"><b
                                    className="badge badge-circle sm text-info"/> </span><span
                                    className="nav-text">Suppliers</span></a>
                                </li>
                                <li><a href="app.user.html#competitor" data-pjax-state><span className="mx-2"><b
                                    className="badge badge-circle sm text-success"/> </span><span
                                    className="nav-text">Competitors</span></a>
                                </li>
                                <li><a href="app.user.html#corp" data-pjax-state><span className="mx-2"><b
                                    className="badge badge-circle sm text-warning"/> </span><span
                                    className="nav-text">Corps</span></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </FilterAside>

            <div className={"d-flex flex"} id={"content-body"}>

                <div className={"d-flex flex-column flex"} id={"user-list"}>
                    <div className={"mx-3 mb-2"}>
                        <Link to={"/credit-monitoring/stages/create"}
                              className={"btn w-xs btn-primary ml-auto d-block mr-2 mb-2"}>{t("Yaratish")}</Link>
                        <Toolbar classname={"mx-2"}>
                            <form className="flex">
                                <div className="input-group"><input type="text"
                                                                    onChange={e => onSearch(get(e, "target.value"))}
                                                                    className="form-control form-control-theme form-control-sm search"
                                                                    placeholder={t("Search")} required/> <span
                                    className="input-group-append"><button
                                    className="btn btn-white no-border btn-sm" type="button"><span
                                    className="d-flex text-muted"><svg
                                    xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                    className="feather feather-search"><circle cx={11} cy={11} r={8}/><line x1={21}
                                                                                                            y1={21}
                                                                                                            x2="16.65"
                                                                                                            y2="16.65"/></svg></span></button></span>
                                </div>
                            </form>
                        </Toolbar>
                    </div>
                    {isFetchedData ?
                        <TemplateTable
                            head={[t("ID"), t("Title"), t("Comment"),t("Start day"), t("Expire day"), t("Created at"),t("Updated at")]}>
                            {stages && stages.map(stage => {
                                return (
                                    <tr
                                        key={get(stage, "id")}
                                        className={classNames("v-middle cursor-pointer text-hover", {
                                            active: isEqual(get(stage, "id"), active)
                                        })}
                                        onClick={() => setActive(get(stage, "id"))}
                                        onDoubleClick={() => history.push(`/credit-monitoring/stages/view/${get(stage, "id")}`)}>
                                        <td className={"text-muted"}>{get(stage, "id")}</td>
                                        <td className={"text-muted "}>{get(stage, "title")}</td>
                                        <td className={"text-muted "}>{get(stage, "comment")}</td>
                                        <td className={"text-muted "}>{get(stage, "start_day")}</td>
                                        <td className={"text-muted "}>{get(stage, "expire_day")}</td>
                                        <td className={"text-muted "}>{moment.unix(get(stage, "created_at")).format("DD-MM-YYYY")}</td>
                                        <td className={"text-muted "}>{moment.unix(get(stage, "updated_at")).format("DD-MM-YYYY")}</td>
                                    </tr>
                                )
                            })}
                        </TemplateTable>
                        :
                        <Loader/>
                    }
                    {!isEmpty(stages) && isFetchedData && <div className={"px-3 py-3 mt-auto"}>
                        <Pagination meta={meta} onChange={pagination}/>
                    </div>}
                    {isEmpty(stages) && isFetchedData && <div className="no-result card mx-3 mt-5">
                        <div className="p-4 text-center">{t("No Results")}</div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default withTranslation("bhm_one")(StagesPage);
