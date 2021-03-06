import React, {useEffect, useState} from "react";
import LoanScheme from "../../../../../schema/Loans";
import ApiActions from "../../../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import {get, isEmpty, isEqual, isNil} from "lodash";
import Normalizer from "../../../../../services/normalizr";
import TemplateTable from "../../../../../components/TemplateTable";
import classNames from "classnames";
import Loader from "../../../../../components/Loader";
import Pagination from "../../../../../components/Pagination/Pagination";
import {withTranslation} from "react-i18next";
import {DatePicker, Input, Select} from "antd";
import Region from "../../../../../schema/Regions";
import Structure from "../../../../../schema/Structure";
import Hat from "../../../../../components/Hat/Hat";
import {useHistory} from "react-router";

function LoansPage(props) {
    const {t} = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [active, setActive] = useState(false);
    const [values, setValues] = useState({
        "search[loan_id]": null,
        "search[client_name]": null,
        "search[client_code]": null,
        "filter[region_id]": null,
        "filter[filial_code]": null,
        "filter[open_date]": null,
        "filter[close_date]": null
    });
    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    const onSearch = () => {
        let params = {};
        Object.entries(values).map(([key, value]) => {
            if (!isNil(value)) {
                return (params = {...params, [key]: value});
            }
        });
        getAllLoans({...params});
    };
    const isFetched = useSelector(state =>
        get(
            state,
            "normalize.data.credit-monitoring-unlinked-loans.isFetched",
            false
        )
    );
    let loansList = useSelector(state =>
        get(state, "normalize.data.credit-monitoring-unlinked-loans.result", [])
    );
    const meta = useSelector(state =>
        get(
            state,
            "normalize.data.credit-monitoring-unlinked-loans.result._meta",
            []
        )
    );
    const entities = useSelector(state => get(state, "normalize.entities", []));
    loansList = get(
        Normalizer.Denormalize(loansList, {data: [LoanScheme]}, entities),
        "data",
        []
    );
    //Region
    const regionState = useSelector(state =>
        get(state, "normalize.data.region-list.result", [])
    );
    let regions = Normalizer.Denormalize(
        regionState,
        {data: [Region]},
        entities
    );
    regions = get(regions, "data", []);
    //Region
    //Structure
    const structureState = useSelector(state =>
        get(state, "normalize.data.structure-list.result")
    );
    const structureIsFetched = useSelector(state =>
        get(state, "normalize.data.structure-list.isFetched", false)
    );
    const structureData = Normalizer.Denormalize(
        structureState,
        {data: [Structure]},
        entities
    );
    const structuresList = get(structureData, "data", []);
    //Structure

    const pagination = (page = 1) => {
        getAllLoans({page});
    };
    const getAllLoans = params => {
        const storeName = "credit-monitoring-unlinked-loans";
        const entityName = "loan";
        const scheme = {data: [LoanScheme]};
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName
            }
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: "/bonus/bonus-loan",
                config: {
                    params: {
                        "per-page": 10,
                        include: "region",
                        ...params
                    }
                },
                scheme,
                storeName,
                entityName
            }
        });
    };

    const getRegions = params => {
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName: "region-list",
                entityName: "region"
            }
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: `monitoring/structure`,
                config: {
                    params: {
                        "per-page": 100,
                        "filter[type]": 5,
                        ...params
                    }
                },
                scheme: {
                    data: [Region]
                },
                storeName: "region-list",
                entityName: "region"
            }
        });
    };
    //Get Structures
    const getStructures = params => {
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName: "structure-list",
                entityName: "structure"
            }
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: `monitoring/structure`,
                config: {
                    params: {
                        "per-page": 500,
                        "filter[type]": 1,
                        ...params
                    }
                },
                scheme: {
                    data: [Structure]
                },
                storeName: "structure-list",
                entityName: "structure"
            }
        });
    };
    //Get Structures

    useEffect(() => {
        getAllLoans();
        getRegions();
    }, []);
    useEffect(() => {
        if (!isNil(get(values, "filter[region_id]"))) {
            getStructures({
                "filter[region_id]": get(values, "filter[region_id]")
            });
        }
    }, [get(values, "filter[region_id]")]);
    if (!isFetched) {
        return <Loader/>;
    }
    return (
        <div className={"d-flex flex fixed-content"}>
            <div className={"d-flex flex"} id={"content-body"}>
                <div className={"d-flex flex-column flex"} id={"user-list"}>
                    <Hat
                        name="???????????????? ?????????????????? ??????????????"
                        desc="???????????????? ?????????????????????? ???????????????????? ???????????????????? ?????????????? ?????????? ???????????????? ????????????????"
                    />
                        <TemplateTable
                            className="scroll-y mb-0 px-3"
                            head={[
                                "???",
                                "ID",
                                "????????????",
                                "????????????",
                                "?????????? ????????",
                                "??????",
                                // "?????????????? ????????",
                                // "?????????????? ????????"
                            ]}
                            tableFilter={[
                                <></>,
                                <Input
                                    name="search[loan_id]"
                                    value={get(values, "search[loan_id]")}
                                    placeHolder="ID"
                                    onChange={handleChange}
                                    onPressEnter={onSearch}
                                    type="text"
                                    width={50}
                                    size={"small"}
                                />,
                                <Select
                                    size={"small"}
                                    style={{width: "100%"}}
                                    name="filter[region_id]"
                                    placeholder={t("Select Region")}
                                    onChange={value => {
                                        if (isNil(value)) {
                                            setValues({
                                                ...values,
                                                "filter[org_id]": null,
                                                "filter[region_id]": value
                                            });
                                        }
                                        setValues({
                                            ...values,
                                            "filter[region_id]": value
                                        });
                                        getAllLoans({"filter[region_id]": value});
                                    }}
                                    value={get(values, "filter[region_id]")}
                                >
                                    <Select.Option value={null}>{t("??????")}</Select.Option>
                                    {regions &&
                                    regions.map(region => {
                                        return (
                                            <Select.Option value={get(region, "uid")}>
                                                {get(region, "title")}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>,
                                <Select
                                    style={{width: "100%"}}
                                    size={"small"}
                                    name="filter[org_id]"
                                    placeholder={t("Select Org")}
                                    onChange={value => {
                                        setValues({
                                            ...values,
                                            "filter[org_id]": value
                                        });
                                        getAllLoans({"filter[org_id]": value});
                                    }}
                                    disabled={
                                        isNil(get(values, "filter[region_id]")) || !structureIsFetched
                                    }
                                    value={
                                        isNil(get(values, "filter[region_id]"))
                                            ? null
                                            : get(values, "filter[org_id]")
                                    }
                                >
                                    <Select.Option value={null}>{t("??????")}</Select.Option>
                                    {structuresList &&
                                    structuresList.map(structure => {
                                        return (
                                            <Select.Option value={get(structure, "id")}>
                                                {get(structure, "title")}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>,
                                <Input
                                    placeHolder="Client"
                                    type="text"
                                    size={"small"}
                                    name="search[client_name]"
                                    value={get(values, "search[client_name]")}
                                    onChange={handleChange}
                                    onPressEnter={onSearch}
                                />,
                                <Input
                                    placeHolder="INN"
                                    type="text"
                                    size={"small"}
                                    name="search[inn]"
                                    value={get(values, "search[inn]")}
                                    onChange={handleChange}
                                    onPressEnter={onSearch}
                                />,
                                // <DatePicker
                                //     style={{width: "100%"}}
                                //     size={"small"}
                                //     name="filter[open_date]"
                                //     format={"YYYY-MM-DD"}
                                //     onChange={date => {
                                //         setValues({
                                //             ...values,
                                //             "filter[open_date]": date
                                //         });
                                //         getAllLoans({"filter[open_date]": date.format("YYYY-MM-DD")});
                                //     }}
                                //     value={get(values, "filter[open_date]")}
                                // />,
                                // <DatePicker
                                //     style={{width: "100%"}}
                                //     size={"small"}
                                //     name="filter[close_date]"
                                //     format={"YYYY-MM-DD"}
                                //     onChange={date => {
                                //         setValues({
                                //             ...values,
                                //             "filter[close_date]": date
                                //         });
                                //         getAllLoans({"filter[close_date]": date.format("YYYY-MM-DD")});
                                //     }}
                                //     value={get(values, "filter[close_date]")}
                                // />
                            ]}
                        >
                            {loansList &&
                            loansList.map((loan, index) => {
                                return (
                                    <>
                                        <tr
                                            className={classNames("v-middle cursor-pointer text-hover", {
                                                active: isEqual(get(loan, "id"), active)
                                            })}
                                            key={get(loan, "id")}
                                            onClick={() => setActive(get(loan, "id"))}
                                            onDoubleClick={() => history.push(`/credit-monitoring/problem-loan/view/${get(loan, "id")}`)}
                                        >
                                            <td>
                                                {get(meta, "currentPage") >= 2
                                                    ? index +
                                                    1 +
                                                    get(meta, "pageSize") * (get(meta, "currentPage") - 1)
                                                    : index + 1}
                                            </td>
                                            <td>{get(loan, "id", 0)}</td>
                                            <td style={{width: "200px"}} className="text-left">{`${get(
                                                loan,
                                                "region.name",
                                                ""
                                            )}`}</td>
                                            <td className="text-left">{`${get(
                                                loan,
                                                "filial_code",
                                                ""
                                            )}`}</td>
                                            <td className="text-left">{get(loan, "client_name", "")}</td>
                                            <td>{get(loan, "inn", 0)}</td>
                                            {/*<td>{get(loan, "open_date", 0)}</td>*/}
                                            {/*<td>{get(loan, "close_date", 0)}</td>*/}
                                        </tr>
                                    </>
                                );
                            })}
                        </TemplateTable>
                        {!isEmpty(loansList) && isFetched && (
                            <div className={"px-3 py-3 mt-auto"}>
                                <Pagination
                                    meta={meta}
                                    onChange={pagination}
                                />
                            </div>
                        )}
                        {isEmpty(loansList) && isFetched && (
                            <div className="no-result card mx-3 mt-5">
                                <div className="p-4 text-center">{t("No Results")}</div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default withTranslation("bhm_one")(LoansPage);
