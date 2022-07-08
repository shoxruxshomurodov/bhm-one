import React, {useEffect, useState} from "react";
import TemplateTable from "../../../../../components/TemplateTable";
import Pagination from "../../../../../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../../services/api/Actions";
import EmployeeScheme from "../../../../../schema/Employees";
import {get, isEmpty, isEqual} from "lodash";
import Normalizer from "../../../../../services/normalizr";
import Loader from "../../../../../components/Loader";
import classNames from "classnames";
import {withTranslation} from "react-i18next";
import Toolbar from "../component/ToolBar";
import Hat from "../../../../../components/Hat/Hat";
import {useHistory} from "react-router-dom";

function EmployeesBonusSheetPage(props) {
    const history = useHistory()
    const {t} = props;
    const dispatch = useDispatch();
    const [active, setActive] = useState("");
    let data = useSelector((state) =>
        get(state, "normalize.data.credit-monitoring-employees.result", [])
    );
    const isFetched = useSelector((state) =>
        get(state, "normalize.data.credit-monitoring-employees.isFetched", false)
    );
    const meta = useSelector((state) =>
        get(state, "normalize.data.credit-monitoring-employees.result._meta", [])
    );
    const entities = useSelector((state) => get(state, "normalize.entities", []));
    data = get(
        Normalizer.Denormalize(data, {data: [EmployeeScheme]}, entities),
        "data",
        []
    );
    const getAllEmployees = (params = {}) => {
        const storeName = "credit-monitoring-employees";
        const entityName = "employee";
        const scheme = {data: [EmployeeScheme]};
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: "/bonus/bonus-sheet",
                config: {
                    params: {
                        "per-page": 10,
                        ...params,
                    },
                },
                scheme,
                storeName,
                entityName,
            },
        });
    };
    const pagination = (page = 1) => {
        getAllEmployees({page,});
    };
    const onSearch = (event = "") => {
        getAllEmployees({search: get(event, "target.value")});
    };
    const onSelectFilter = (event) => {
        getAllEmployees({"filter[type]": get(event, "target.value")});
    };
    useEffect(() => {
        getAllEmployees();
    }, []);
    return (
        <div className={"d-flex flex fixed-content mt-2"}>
            <div
                className={"d-flex flex"}
                id={"content-body"}
            >
                <div
                    className={"d-flex flex-column flex"}
                    id={"user-list"}
                >
                    <Hat
                        name="Ходимлар бонуслари"
                        desc="Муддати ўтган кредитларни ундириш учун ҳодимлар рўйҳати"
                    />
                    <Toolbar
                        onSearch={onSearch}
                        onSelectFilter={onSelectFilter}
                    />
                    {isFetched ? (
                        <TemplateTable
                            head={[
                                t("Filial"),
                                t("Full name"),
                                t("Dep name"),
                                t("Post name"),
                                t("Passport"),
                                t("Pinfl"),
                                t("Type"),
                            ]}
                        >
                            {data &&
                                data.map((result) => {
                                    return (
                                        <tr
                                            key={get(result, "id")}
                                            className={classNames(
                                                "v-middle cursor-pointer text-hover",
                                                {
                                                    active: isEqual(get(result, "id"), active),
                                                }
                                            )}
                                            onClick={() => {
                                                setActive(get(result, "id"));
                                                history.push(`/credit-monitoring/employees/bonus/view/${get(result , 'id')}`)
                                            } }
                                        >
                                        <td className={"text-muted"}>{get(result, "filial_code")}</td>
                                        <td className={"text-muted "}>{`${get(result, "last_name")} ${get(result, "first_name")} ${get(result, "middle_name")}`}</td>
                                        <td className={"text-muted"}>{get(result, "dep_name")}</td>
                                        <td className={"text-muted"}>{get(result, "post_name")}</td>
                                        <td className={"text-muted"}>{get(result, "passport")}</td>
                                        <td className={"text-muted"}>{get(result, "pinfl")}</td>
                                        <td className={"text-muted"}>{isEqual(get(result, "type"), 1) ? t("Bank hodimi") : t("Maxsus hodim")}</td>
                                    </tr>
                                    );
                                })}
                        </TemplateTable>
                    ) : (
                        <Loader/>
                    )}
                    {!isEmpty(data) && isFetched && (
                        <div className={"px-3 py-3 mt-auto"}>
                            <Pagination
                                meta={meta}
                                onChange={pagination}
                            />
                        </div>
                    )}
                    {isEmpty(data) && isFetched && (
                        <div className="no-result card mx-3 mt-5">
                            <div className="p-4 text-center">{t("No Results")}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withTranslation("bhm_one")(EmployeesBonusSheetPage);
