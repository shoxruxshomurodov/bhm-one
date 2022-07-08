import React, {useEffect, useState} from 'react';
import FilterAside from "../../../../components/FilterAside";
import TemplateTable from "../../../../components/TemplateTable";
import Toolbar from "../../../../components/Toolbar";
import Pagination from "../../../../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import ProductScheme from "../../../../schema/Product";
import {get, isEmpty, isEqual, isNil} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {useHistory} from "react-router-dom";
import classNames from "classnames"
import {withTranslation} from "react-i18next";

function RequirementsPage(props) {
    const {t} = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [active, setActive] = useState("")
    const data = useSelector(state => get(state, "normalize.data.credit-monitoring-products.result", []));
    const isFetchedData = useSelector(state => get(state, "normalize.data.credit-monitoring-products.isFetched", true));
    const meta = useSelector(state => get(state, "normalize.data.credit-monitoring-products.result._meta", []));
    const entities = useSelector(state => get(state, "normalize.entities", []));
    const products = get(Normalizer.Denormalize(data, {data: [ProductScheme]}, entities), "data", [])
    const getAllProducts = (params = {}) => {
        const storeName = "credit-monitoring-products";
        const entityName = "product";
        const scheme = {data: [ProductScheme]}
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: "/monitoring/products",
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
        getAllProducts({page})
    };
    const onSearch = (search) => {
        getAllProducts({search})
    }
    useEffect(() => {
        getAllProducts({"filter[condition]":"A"})
    }, [])
    return (
        <div className={"d-flex flex fixed-content mt-2"}>
            <FilterAside title={t("Products")}>
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
                    <Toolbar classname={"mx-2"}>
                        <>
                            <select style={{width:"100px"}} onChange={e => getAllProducts({"filter[condition]":get(e,"target.value")})} className="form-control form-control-sm">
                                <option value={"A"}>{t("Актив")}</option>
                                <option value={"P"}>{t("Пассив")}</option>
                            </select>
                            <select onChange={e => getAllProducts({"filter[group_id]":get(e,"target.value")})} className="form-control w-25 form-control-sm">
                                <option value={""}>{t("Выбирать")}</option>
                                <option value={"-3"}>{t("Кредит на пластиковую карту (овердрафт)")}</option>
                                <option value={"-7"}>{t("Поручительства")}</option>
                                <option value={"-5"}>{t("Потребительский кредит")}</option>
                                <option value={"-6"}>{t("Компенсация")}</option>
                                <option value={"-1"}>{t("Овердрафт")}</option>
                                <option value={"-10"}>{t("Овердрафт с отправкой лимита")}</option>
                                <option value={"1"}>{t("Хар бир оила тадбиркор")}</option>
                                <option value={"-8"}>{t("Учёт кредитный карты")}</option>
                                <option value={"-9"}>{t("Учет контокоррентных кредитов")}</option>
                                <option value={"0"}>{t("Другое")}</option>
                                <option value={"3"}>{t("Юридик мижозлар")}</option>
                                <option value={"2"}>{t("Открытый кредитная линия для физических лиц")}</option>
                            </select>
                            <form className="flex">
                                <div className="input-group"><input type="text"
                                                                    onChange={e => onSearch(get(e, "target.value"))}
                                                                    className="form-control form-control-theme form-control-sm search"
                                                                    placeholder="Search" required/> <span
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
                        </>
                    </Toolbar>
                    {isFetchedData ?
                        <TemplateTable
                            head={[t("ID"), t("Product"), t("Имя группы"),t("Состояние"), t("Непрерывные дни"), t("Целенаправленные дни"), t("Активировано в"), t("Деактивировано в")]}>
                            {products && products.map(product => {
                                return (
                                    <tr
                                        key={get(product, "id")}
                                        className={classNames("v-middle cursor-pointer text-hover", {
                                            active: isEqual(get(product, "id"), active)
                                        })}
                                        onClick={() => setActive(get(product, "id"))}
                                        onDoubleClick={() => history.push(`/credit-monitoring/product/view/${get(product, "id")}`)}
                                    >
                                        <td className={"text-muted"}>{get(product, "id")}</td>
                                        <td className={"text-muted "}>{get(product, "name")}</td>
                                        <td className={"text-muted "}>{get(product, "group_name")}</td>
                                        <td className={"text-muted"}>{get(product, "condition_name")}</td>
                                        <td className={"text-muted"}>{isNil(get(product, "continuous_days")) ? "Не указан" : get(product, "continuous_days")}</td>
                                        <td className={"text-muted"}>{isNil(get(product, "purposive_days")) ? "Не указан" : get(product, "purposive_days")}</td>
                                        <td className={"text-muted"}>{get(product, "activated_at")}</td>
                                        <td className={"text-muted"}>{get(product, "deactivated_at")}</td>
                                    </tr>
                                )
                            })}
                        </TemplateTable>
                        :
                        <Loader/>
                    }
                    {!isEmpty(products) && isFetchedData && <div className={"px-3 py-3 mt-auto"}>
                        <Pagination meta={meta} onChange={pagination}/>
                    </div>}
                    {isEmpty(products) && isFetchedData && <div className="no-result card mx-3 mt-5">
                        <div className="p-4 text-center">{t("No Results")}</div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default withTranslation("bhm_one")(RequirementsPage);
