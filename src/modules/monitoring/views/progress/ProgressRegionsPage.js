import {createStyles, Table, Progress, Text, Group} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {get, isEmpty} from "lodash";
import ApiActions from "../../../../services/api/Actions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Pagination from "../../../../components/Pagination/Pagination";
import Normalizer from "../../../../services/normalizr";
import NumberFormat from "react-number-format";
import Loader from "../../../../components/Loader";
import {withTranslation} from "react-i18next";
import ProgressScheme from "../../../../schema/Progress";
import {RiFileExcel2Line} from "react-icons/ri";
import Toolbar from "../../../../components/Toolbar";
import ApiService from "../../services/ApiService";
import {notification} from "antd";
import {request} from "../../../../services/api";

const useStyles = createStyles((theme) => ({
    progressBar: {
        "&:not(:first-of-type)": {
            borderLeft: `3px solid ${
                theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
            }`,
        },
    },
}));

function ProgressRegionsPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const {meta, isFetched, entities, drawToRender, t} = props;
    const CallRender = (params) => {
        const {callRender} = props;
        callRender(params);
    };
    const pagination = (page = 1) => {
        CallRender({page});
    };
    let data = get(
        Normalizer.Denormalize(drawToRender, {data: [ProgressScheme]}, entities),
        "data",
        []
    );
    useEffect(() => {
        CallRender({page: 1});
    }, []);
    const exportExcel = () => {
        setIsLoading(true);
        ApiService.excelExportRegion({
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
    const refreshTask = () => {
        setIsLoading(true);
        request
            .post("/monitoring/progress/reload", {type: 1})
            .then((res) => {
                setIsLoading(false);
                notification["success"]({
                    message: t("Успешно"),
                    description: t("Загружено"),
                    placement: "topRight",
                });
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
    const {classes, theme} = useStyles();
    const rows = data.map((row) => {
        const positiveReviews = get(row, "percentile");
        const negativeReviews = 100 - get(row, "percentile");
        return (
            <tr key={row.name}>
                <td>
                    <Text size="sm">{row.name}</Text>
                </td>
                <td>
                    <Text size="sm">
                        {get(row, "all_count")}
                    </Text>
                </td>
                <td>
                    <Text size="sm">
                        {get(row, "started_count")}
                    </Text>
                </td>
                <td>
                    <Text size="sm">
                        {get(row, "ended_count")}
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
                    <Group position="apart">
                        <Text size="xs" color="teal" weight={700}>
                            {positiveReviews?.toFixed(1)}%
                        </Text>
                        <Text size="xs" color="red" weight={700}>
                            {negativeReviews?.toFixed(1)}%
                        </Text>
                    </Group>
                    <Progress
                        classNames={{bar: classes.progressBar}}
                        sections={[
                            {
                                value: positiveReviews,
                                color:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.teal[9]
                                        : theme.colors.teal[6],
                            },
                            {
                                value: negativeReviews,
                                color:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.red[9]
                                        : theme.colors.red[6],
                            },
                        ]}
                    />
                </td>
            </tr>
        );
    });
    console.log(meta,"meta")
    return (
        <div className={"page-content"} id={"page-content"}>
            <div className={"d-flex flex fixed-content"}>
                <div className={"d-flex flex"} id={"content-body"}>
                    <div className={"d-flex  flex-column flex"} id={"user-list"}>
                        <div className={"mx-2 mt-2"}>
                            <Text size="xs" color="teal" weight={700}>
                                {get(meta,"totalPercent")?.toFixed(1)}%
                            </Text>
                            <Progress
                                classNames={{bar: classes.progressBar}}
                                sections={[
                                    {
                                        value: get(meta,"totalPercent"),
                                        color:
                                            theme.colorScheme === "dark"
                                                ? theme.colors.teal[9]
                                                : theme.colors.teal[6],
                                    },
                                ]}
                            />
                        </div>
                        <Toolbar classname={"mx-2 mt-4"}>
                            <form className="flex">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-theme search"
                                        disabled
                                        placeholder={t("Search")}
                                    />
                                    <span className="input-group-append">
                    <button
                        className="btn btn-white no-border btn-sm"
                        type="button"
                        disabled
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
                                    {get(meta,"canReload") && <button
                                        type="button"
                                        className="btn btn-success no-border rounded-0  ml-2"
                                        onClick={refreshTask}
                                    >
                                        <span>{t("Refresh Task")}</span>
                                    </button>}
                                </div>
                            </form>
                        </Toolbar>
                        {!isLoading && isFetched ? (
                            <Table>
                                <thead>
                                <tr>
                                    <th>{t("Viloyat nomi")}</th>
                                    <th>{t("Jami filiallar soni")}</th>
                                    <th>{t("Yuklash navbatida")}</th>
                                    <th>{t("Yuklash yakunlangan")}</th>
                                    <th>{t("Sarflangan vaqt")}</th>
                                    <th>{t("Yangilangan vaqti")}</th>
                                    <th>{t("Ulushi")}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {rows}
                                </tbody>
                            </Table>
                        ) : (
                            <Loader/>
                        )}
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
        drawToRender: get(state, "normalize.data.progress-regions.result", []),
        isFetched: get(state, "normalize.data.progress-regions.isFetched", false),
        meta: get(state, "normalize.data.progress-regions.result._meta", []),
        entities: get(state, "normalize.entities", []),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        callRender: (params) => {
            const storeName = "progress-regions";
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
                    url: "/monitoring/progress/regions",
                    config: {
                        params: {
                            ...params,
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
    };
};

export default withTranslation("bhm_one")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(ProgressRegionsPage))
);
