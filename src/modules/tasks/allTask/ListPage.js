import * as React from "react";
import {useEffect, useState} from "react";
import {Table, Tag, notification} from "antd";
import {get, isEqual} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../services/api/Actions";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import Normalizer from "../../../services/normalizr";
import Hat from "../../../components/Hat/Hat";
import TaskScheme from "../../../schema/Task";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {withTranslation} from "react-i18next";
import config from "../../../config";
import Search from "../component/Filter/Search";
import ApiService from "../ApiService";
import tableExport from "antd-table-export";

function ListPage({t}) {
    const dispatch = useDispatch();
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [params, setParams] = useState({});
    const [page, setPage] = useState(1);
    const paginationCurrent = useSelector((state) =>
        get(state, "normalize.data.all-task-list.result._meta.currentPage")
    );
    const paginationPageSize = useSelector((state) =>
        get(state, "normalize.data.all-task-list.result._meta.perPage")
    );
    const paginationTotal = useSelector((state) =>
        get(state, "normalize.data.all-task-list.result._meta.totalCount")
    );
    const pagination = {
        current: paginationCurrent,
        pageSize: paginationPageSize,
        total: paginationTotal,
    };
    const entities = useSelector((state) => get(state, "normalize.entities"));
    const isFetchedList = useSelector((state) =>
        get(state, "normalize.data.all-task-list.isFetched", true)
    );
    const resultList = useSelector((state) =>
        get(state, "normalize.data.all-task-list.result")
    );
    const resultListData = Normalizer.Denormalize(
        resultList,
        {data: [TaskScheme]},
        entities
    );
    const resultData = get(resultListData, "data", []);
    const handleTableChange = (pagination) => {
        const {current: page, pageSize: size} = pagination;
        setPage(page);
        setPerPage(size);
        getData({page});
    };
    const user = useSelector((state) => get(state, "auth.user"));
    let owner = get(user, "roles")?.hasOwnProperty(config.ROLES.MONITORING_FILIAL)
        ? {
            taskAbleOwnerId: get(user, "id"),
        }
        : {};
    const getData = (params) => {
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName: "all-task-list",
                entityName: "task",
            },
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: `/monitoring/process-task`,
                config: {
                    params: {
                        "per-page": perPage,
                        include:
                            "request.loan.client,request.structure,request.loan.client,request.structure.region,request.process,request.currentStatesModels.stateModel,parentTask.endBy.profile,startedBy.profile",
                        page,
                        "which-tasks": "all",
                        ...params,
                        ...owner,
                    },
                },
                scheme: {data: [TaskScheme]},
                storeName: "all-task-list",
                entityName: "task",
            },
        });
    };
    const isClearFilter = () => {
        getData({page: 1});
    };
    const columns = [
        {
            title: "№",
            dataIndex: "id",
            key: "id",
            sorter: true,
            render: (props, data, index) => {
                return (
                    <>
                        {get(pagination, "current") >= 2
                            ? index +
                            1 +
                            get(pagination, "pageSize") * (get(pagination, "current") - 1)
                            : index + 1}
                    </>
                );
            },
        },
        {
            title: t("Loan ID"),
            dataIndex: "loan",
            key: "loan",
            sorter: true,
            render: (props, data, index) => {
                return <>{get(data, "request.loan.id")}</>;
            },
        },
        {
            title: t("Region"),
            dataIndex: "region",
            key: "region",
            sorter: true,
            render: (props, data, index) => {
                return <>{get(data, "request.structure.region.name")}</>;
            },
        },
        {
            title: t("Filial"),
            dataIndex: "filial",
            key: "filial",
            sorter: true,
            render: (props, data, index) => {
                return (
                    <>
                        {get(data, "request.structure.uid")}-
                        {get(data, "request.structure.title")}
                    </>
                );
            },
        },
        {
            title: t("Inn"),
            dataIndex: "inn",
            key: "inn",
            sorter: true,
            render: (props, data, index) => {
                return <>{get(data, "request.loan.client.inn")}</>;
            },
        },
        {
            title: t("Pinfl"),
            dataIndex: "pinfl",
            key: "pinfl",
            sorter: true,
            render: (props, data, index) => {
                return <>{get(data, "request.loan.client.pinfl")}</>;
            },
        },
        {
            title: t("Client name"),
            dataIndex: "name",
            key: "name",
            sorter: true,
            render: (props, data) => {
                return (
                    <Link to={`/monitoring/my-task/view/${get(data, "id")}`}>
                        {get(data, "request.loan.client.name")}
                    </Link>
                );
            },
        },
        {
            key: t("State"),
            dataIndex: "state",
            title: t("state"),
            render: (props, data, index) => {
                return (
                    <Tag
                        color={
                            isEqual(
                                get(data, "request.currentStatesModels[0].stateModel.title"),
                                "Удалено"
                            )
                                ? config.STYLE["danger"]
                                : config.STYLE[
                                    get(data, "request.currentStatesModels[0].stateModel.style")
                                    ]
                        }
                    >
                        {get(data, "request.currentStatesModels[0].stateModel.title")}
                    </Tag>
                );
            },
        },
        {
            title: t("Process name"),
            dataIndex: "process_name",
            key: "process_name",
            sorter: true,
            render: (props, data, index) => {
                return <>{get(data, "request.process.name")}</>;
            },
        },
        {
            title: t("Created at"),
            dataIndex: "created_at",
            key: "created_at",
            render: (text, record, index) => {
                return <Moment format="DD-MM-YYYY">{text * 1000}</Moment>;
            },
            sorter: true,
        },
        {
            title: t("Updated at"),
            dataIndex: "updated_at",
            key: "updated_at",
            render: (text, record, index) => {
                return <Moment format="DD-MM-YYYY">{text * 1000}</Moment>;
            },
            sorter: true,
        },
        // {
        //   key: "end_by_profile_title",
        //   dataIndex: "end_by_profile_title",
        //   title: t("Кто завершил последнее действие"),
        //   render: (title, row) => {
        //     return get(row, "parentTask.endBy.profile.NAME");
        //   },
        // },
        {
            key: "start_by_profile_title",
            dataIndex: "start_by_profile_title",
            title: t("Кто начинал действие"),
            render: (title, row) => {
                return get(row, "startedBy.profile.NAME");
            },
        },
    ];
    const exportExcel = async () => {
        const url = "/monitoring/process-task";
        const config = {
            "per-page": "all",
            include:
                "request.loan.client,request.structure,request.loan.client,request.structure.region,request.process,request.currentStatesModels.stateModel",
            "which-tasks": "all",
        };
        setIsLoading(true);
        ApiService.excelExport(url, params, config)
            .then((res) => {
                const exportInstance = new tableExport(get(res, "data.data"), columns);
                exportInstance.download("excelExport", "xlsx");
                setIsLoading(false);
            })
            .catch((e) => {
                const error = get(e, "response.data.message");
                notification["error"]({
                    message: t("Ошибка"),
                    description: error,
                    placement: "topRight",
                });
                setIsLoading(false);
            });
    };
    const filterByColumn = (params) => {
        setParams(params);
        getData({page, ...params});
    };
    useEffect(() => {
        getData({});
    }, []);

    return (
        <>
            <Hat name={t("Все задание")} desc={t("Список всех документов")}/>
            <div className="page-content">
                <div className={"padding"}>
                    <Search
                        isClearFilter={isClearFilter}
                        excelExport={exportExcel}
                        filterByColumn={filterByColumn}
                    />
                    <div className={"mt-2"}>
                        {isFetchedList && !isLoading ? (
                            <Table
                                id={"table1"}
                                rowKey={(record) => record.id}
                                dataSource={resultData}
                                columns={columns}
                                loading={!isFetchedList}
                                pagination={pagination}
                                onChange={handleTableChange}
                            />
                        ) : (
                            <SkeletonLoader/>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
}

export default withTranslation("bhm_one")(ListPage);
