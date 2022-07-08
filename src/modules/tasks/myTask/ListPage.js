import * as React from "react";
import {useEffect, useState} from "react";
import {Button, notification, Table, Tag} from "antd";
import {get, isEqual} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../services/api/Actions";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import Normalizer from "../../../services/normalizr";
import Hat from "../../../components/Hat/Hat";
import Toolbar from "../../../components/Toolbar";
import TaskScheme from "../../../schema/Task";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {withTranslation} from "react-i18next";
import config from "../../../config";
import Utils from "../../../services/helpers/Utils";
import WithUser from "../../../services/auth/rbac/WithUser";
import {request} from "../../../services/api";

function ListPage({t}) {
    const dispatch = useDispatch();
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(null);
    const paginationCurrent = useSelector((state) =>
        get(state, "normalize.data.my-task-list.result._meta.currentPage")
    );
    const paginationPageSize = useSelector((state) =>
        get(state, "normalize.data.my-task-list.result._meta.perPage")
    );
    const paginationTotal = useSelector((state) =>
        get(state, "normalize.data.my-task-list.result._meta.totalCount")
    );
    const pagination = {
        current: paginationCurrent,
        pageSize: paginationPageSize,
        total: paginationTotal,
    };
    const entities = useSelector((state) => get(state, "normalize.entities"));
    const isFetchedList = useSelector((state) =>
        get(state, "normalize.data.my-task-list.isFetched", true)
    );
    const resultList = useSelector((state) =>
        get(state, "normalize.data.my-task-list.result")
    );
    const resultListData = Normalizer.Denormalize(
        resultList,
        {data: [TaskScheme]},
        entities
    );
    const resultData = get(resultListData, "data", []);
    const [sorter, setSorter] = useState({
        columnKey: null,
        field: null,
        order: null,
    });
    const user = useSelector((state) => get(state, 'auth.user'));
    const handleTableChange = (pagination, filters, sorter) => {
        const {current} = pagination;
        setSorter(sorter);
        setPage(page);
        getData({page: current})

    };
    let owner = get(user, "roles")?.hasOwnProperty(config.ROLES.MONITORING_FILIAL) ? {
        taskAbleOwnerId: get(user, "id"),
    } : {};
    const getData = (params) => {
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName: "my-task-list",
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
                        include: "request.loan.client,request.structure,request.loan.client,request.structure.region,request.process,request.currentStatesModels.stateModel",
                        page,
                        s: searchQuery,
                        "which-tasks": "mine",
                        ...owner,
                        ...params

                    },
                },
                scheme: {data: [TaskScheme]},
                storeName: "my-task-list",
                entityName: "task",
            },
        });
    };
    const getNewTask = (...params) => {
        setLoading(true)
        request.post(`/monitoring/process-task/take-new-task`, params, {}).then((success) => {
            notification["success"]({
                message: "Успешно",
                description: "Создано",
                placement: "topRight",
            })
            getData();
            setLoading(false);
        }).catch((e) => {
            const data = get(e, "response.data", []);
            notification["error"]({
                message: "Ошибка",
                description: data.message,
                placement: "topRight",
            });
            setLoading(false)
        })
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Hat name="Мое задание" desc="Список полученных документов" />
            <div className="page-content">
                <div className={"padding"}>
                    <Toolbar classname={"mb-2"}>
                        <div className="flex">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control form-control-theme form-control-md search"
                                    placeholder="Search"
                                    onChange={(value) => {
                                        setSearchQuery(value?.length > 0 ? value : null);
                                    }}
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
                            <WithUser>
                            {({userCan}) => {
                                return (
                                    Utils.userCanStyle(userCan, [config.ROLES.RESPUBLIC]) &&
                                    <button className='btn btn-primary' style={{
                                        marginLeft: "5px",
                                    }} onClick={getNewTask}>{t("Take new Task")}</button>
                                )
                            }}
                                </WithUser>
              </span>
                            </div>
                        </div>
                    </Toolbar>
                    <div>
                        {(!isFetchedList || isLoading ) && <SkeletonLoader/>}
                        {isFetchedList && !isLoading && (
                            <Table
                                rowKey={(record) => record.id}
                                dataSource={resultData}
                                columns={[
                                    {
                                        title: "№",
                                        dataIndex: "id",
                                        key: "id",
                                        sorter: true,
                                        render: (props, data, index) => {
                                            return <>{get(pagination, "current") >= 2 ? index + 1 + (get(pagination, "pageSize") * (get(pagination, "current") - 1)) : index + 1}</>
                                        }
                                    },
                                    {
                                        title: t("Region"),
                                        dataIndex: "region",
                                        key: "region",
                                        sorter: true,
                                        render: (props, data, index) => {
                                            return <>{get(data, "request.structure.region.name")}</>
                                        }
                                    },
                                    {
                                        title: t("Filial"),
                                        dataIndex: "filial",
                                        key: "filial",
                                        sorter: true,
                                        render: (props, data, index) => {
                                            return <>{get(data, "request.structure.uid")}-{get(data, "request.structure.title")}</>
                                        }
                                    },
                                    {
                                        title: t("Inn"),
                                        dataIndex: "inn",
                                        key: "inn",
                                        sorter: true,
                                        render: (props, data, index) => {
                                            return <>{get(data, "request.loan.client.inn")}</>
                                        }
                                    },
                                    {
                                        title: t("Pinfl"),
                                        dataIndex: "pinfl",
                                        key: "pinfl",
                                        sorter: true,
                                        render: (props, data, index) => {
                                            return <>{get(data, "request.loan.client.pinfl")}</>
                                        }
                                    },
                                    {
                                        title: t("Client name"),
                                        dataIndex: "name",
                                        key: "name",
                                        sorter: true,
                                        render: (props, data, index) => {
                                            return <Link
                                                to={`/monitoring/my-task/view/${get(data, "id")}`}>{get(data, "request.loan.client.name")}</Link>
                                        }
                                    },

                                    {
                                        key: 'State',
                                        dataIndex: 'state',
                                        title: t('state'),
                                        render: (props, data, index) => {
                                            return <Tag
                                                color={isEqual(get(data, 'request.currentStatesModels[0].stateModel.title'), "Удалено") ? config.STYLE["danger"] : config.STYLE[get(data, "request.currentStatesModels[0].stateModel.style")]}>{get(data, 'request.currentStatesModels[0].stateModel.title')}</Tag>;
                                        },
                                    },
                                    {
                                        title: t("Process name"),
                                        dataIndex: "process_name",
                                        key: "process_name",
                                        sorter: true,
                                        render: (props, data, index) => {
                                            return <>{get(data, "request.process.name")}</>
                                        }
                                    },
                                    {
                                        title: "Created at ",
                                        dataIndex: "created_at",
                                        key: "created_at",
                                        render: (text, record, index) => {
                                            return <Moment format="DD-MM-YYYY">{text * 1000}</Moment>;
                                        },
                                        sorter: true,
                                    },
                                    {
                                        title: "Updated at",
                                        dataIndex: "updated_at",
                                        key: "updated_at",
                                        render: (text, record, index) => {
                                            return <Moment format="DD-MM-YYYY">{text * 1000}</Moment>;
                                        },
                                        sorter: true,
                                    },
                                ]}
                                loading={!isFetchedList}
                                pagination={pagination}
                                onChange={handleTableChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation("bhm_one")(ListPage)