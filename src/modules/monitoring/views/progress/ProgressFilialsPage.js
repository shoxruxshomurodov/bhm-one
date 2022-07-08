import {createStyles, Table, Progress, Text, Group} from '@mantine/core';
import React, {useEffect, useState} from "react";
import {get, isEmpty, isEqual} from "lodash";
import ApiActions from "../../../../services/api/Actions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Pagination from "../../../../components/Pagination/Pagination";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {withTranslation} from "react-i18next";
import {RiFileExcel2Line} from "react-icons/ri";
import Toolbar from "../../../../components/Toolbar";
import ApiService from "../../services/ApiService";
import {notification} from "antd";
import ProgressScheme from "../../../../schema/Progress";
import RegionScheme from "../../../../schema/Regions";

function ProgressFilialsPage(props) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [region, setRegion] = useState(3);
    let {
        meta, isFetched, entities, drawToRender, t, regions,
        getAllRegions,
    } = props;
    const CallRender = (params) => {
        const {callRender} = props;
        callRender(params);
    };
    const pagination = (page = 1) => {
        setPage(page);
        CallRender({page, "filter[region_id]": region, search});
    };
    let data = get(
        Normalizer.Denormalize(drawToRender, {data: [ProgressScheme]}, entities),
        "data",
        []
    );
    regions = get(
        Normalizer.Denormalize(regions, {data: [RegionScheme]}, entities),
        "data",
        []
    );
    useEffect(() => {
        CallRender({page: 1, "filter[region_id]": region});
        getAllRegions();
    }, []);

    const onSearch = (search) => {
        setSearch(search);
        CallRender({search, "filter[region_id]": region, page});
    };
    const exportExcel = () => {
        setIsLoading(true);
        ApiService.excelExportBranches({
            only_problem: true,
        })
            .then((res) => {
                setIsLoading(false);
                notification["success"]({
                    message: t("Успешно"),
                    description: t("Загружено"),
                    placement: "topRight",
                });
                window.location.assign(get(res, "data.src"));
            })
            .catch((e) => {
                setIsLoading(false);
                const message = get(e, "response.data.message", []);
                notification["error"]({
                    message: t(message),
                    description: "",
                    placement: "topLeft",
                });
            });
    };
    const rows = data.map((row) => {
        return (
            <tr key={row.id}>
                <td>
                    <Text size="sm">
                        {get(row, "branch.id")}
                    </Text>
                </td>
                <td>
                    <Text size="sm">
                        {get(row, "branch.name")}
                    </Text>
                </td>
                <td>
                    <Text size="sm">
                        {get(row, "spend_time")}
                    </Text>
                </td>
                <td>
                    <Text size="sm">
                        {get(row, "last_updated_at")}
                    </Text>
                </td>
                <td>
                    <Text size="sm">
                          <span className={`badge badge-${get(row, "style")}`}>
                      {get(row, "comment")?.toUpperCase()}
                    </span>
                    </Text>
                </td>

            </tr>
        );
    });
    return (
        <div className={"page-content"} id={"page-content"}>
            <div className={"d-flex flex fixed-content"}>
                <div className={"d-flex flex"} id={"content-body"}>
                    <div className={"d-flex  flex-column flex pt-2"} id={"user-list"}>
                        <Toolbar classname={"mx-2"}>
                            <>
                                <select
                                    style={{width: "200px"}}
                                    onChange={(e) => {
                                        CallRender({"filter[region_id]": get(e, "target.value")});
                                        setRegion(get(e, "target.value"));
                                    }}
                                    className="form-control"
                                >
                                    {regions &&
                                    regions.map((region) => {
                                        return (
                                            <option value={get(region, "code")}>
                                                {get(region, "name")}
                                            </option>
                                        );
                                    })}
                                </select>
                                <form className="flex">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            onChange={(e) => onSearch(get(e, "target.value"))}
                                            className="form-control form-control-theme search"
                                            placeholder={t("Search")}
                                            required
                                        />
                                        <span className="input-group-append">
                      <button
                          className="btn btn-white no-border btn-sm"
                          type="button"
                      >
                        <span className="d-flex text-muted">
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
                              className="feather feather-search"
                          >
                            <circle cx={11} cy={11} r={8}/>
                            <line x1={21} y1={21} x2="16.65" y2="16.65"/>
                          </svg>
                        </span>
                      </button>
                    </span>
                                        <button
                                            type="button"
                                            className="btn btn-white no-border rounded-0  ml-2"
                                            onClick={exportExcel}
                                        >
                      <span className="text-muted">
                        <RiFileExcel2Line/>
                      </span>
                                        </button>
                                    </div>
                                </form>
                            </>
                        </Toolbar>
                        {!isLoading && isFetched ?
                            <Table>
                                <thead>
                                <tr>
                                    <th>{t("Filial code")}</th>
                                    <th>{t("Filial nomi")}</th>
                                    <th>{t("Sarflangan vaqt")}</th>
                                    <th>{t("Oxirgi yangilangan vaqti")}</th>
                                    <th>{t("Holati")}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {rows}</tbody>
                            </Table> : <Loader/>}
                        {!isEmpty(data) && (
                            <div>
                                <Pagination meta={meta} onChange={pagination}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        drawToRender: get(state, "normalize.data.progress-filial.result", []),
        isFetched: get(state, "normalize.data.progress-filial.isFetched", false),
        meta: get(state, "normalize.data.progress-filial.result._meta", []),
        entities: get(state, "normalize.entities", []),
        regions: get(state, "normalize.data.regions.result", []),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        callRender: (params) => {
            const storeName = "progress-filial";
            const entityName = "progress";
            const scheme = {data: [ProgressScheme]};
            dispatch({
                type: ApiActions.GET_ALL.TRIGGER,
                payload: {
                    storeName,
                },
            });
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: "/monitoring/progress",
                    config: {
                        params: {
                            include: "branch",
                            ...params,
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getAllRegions: () => {
            const storeName = "regions";
            const entityName = "region";
            const scheme = {data: [RegionScheme]};
            dispatch({
                type: ApiActions.GET_ALL.TRIGGER,
                payload: {
                    storeName,
                },
            });
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: "/monitoring/regions",
                    config: {},
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
    };
};
export default withTranslation("bhm_one")(connect(mapStateToProps, mapDispatchToProps)(withRouter(ProgressFilialsPage))
);
