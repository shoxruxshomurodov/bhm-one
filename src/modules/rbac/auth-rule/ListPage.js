import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Drawer, Input, notification, PageHeader, Popconfirm, Space, Table,} from 'antd';
import get from 'lodash/get';
import {CreateContainer} from './CreateContainer';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from 'react-use';
import ApiActions from '../../../services/api/Actions';
import AuthRuleScheme from '../../../schema/AuthRule';
import Normalizer from '../../../services/normalizr';
import {UpdateContainer} from './UpdateContainer';
import {useHistory} from 'react-router';
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
const {Search} = Input;

export default function ListPage() {
    const dispatch = useDispatch();
    const [isOpenCreateForm, setOpenCreateForm] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(null);
    const paginationCurrent = useSelector((state) =>
        get(state, 'normalize.data.auth-rule-list.result._meta.currentPage')
    );
    const paginationPageSize = useSelector((state) =>
        get(state, 'normalize.data.auth-rule-list.result._meta.perPage')
    );
    const paginationTotal = useSelector((state) =>
        get(state, 'normalize.data.auth-rule-list.result._meta.totalCount')
    );
    const pagination = {
        current: paginationCurrent,
        pageSize: paginationPageSize,
        total: paginationTotal,
    };
    const entities = useSelector((state) => get(state, 'normalize.entities'));
    const isFetchedList = useSelector((state) => get(state, 'normalize.data.auth-rule-list.isFetched', true));
    const resultList = useSelector((state) => get(state, 'normalize.data.auth-rule-list.result'));
    const resultListData = Normalizer.Denormalize(resultList, {data: [AuthRuleScheme]}, entities);
    const resultData = get(resultListData, 'data', []);
    const [isOpenUpdateForm, setOpenUpdateForm] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState({});
    const [sorter, setSorter] = useState({
        columnKey: null,
        field: null,
        order: null,
    });
    const sorterPrev = usePrevious(sorter);
    const history = useHistory();

    const handleTableChange = (pagination, filters, sorter) => {
        const {current: page} = pagination;
        setSorter(sorter);
        setPage(page);
    };

    const getData = () => {
        const {columnKey = null, field = null, order = null} = sorter;
        let sort = null;
        if (columnKey && field && order) {
            if (order == 'ascend') {
                sort = `${field}`;
            } else {
                sort = `-${field}`;
            }
        }
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName: 'auth-rule-list',
                entityName: 'authRule',
            },
        });

        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: `/rbac/auth-rule`,
                config: {
                    params: {
                        'per-page': perPage,
                        page: page,
                        s: searchQuery,
                        sort,
                    },
                },
                scheme: {data: [AuthRuleScheme]},
                storeName: 'auth-rule-list',
                entityName: 'authRule',
            },
        });
    };

    const deleteData = (name) => {
        const url = `/rbac/auth-rule/${name}`;
        const storeName = 'auth-rule-delete';
        const entityName = "authRule";
        const scheme = AuthRuleScheme;
        dispatch({
            type: ApiActions.OPERATION_DELETE.REQUEST,
            payload: {
                url,
                storeName,
                entityName,
                scheme,
                cb: {
                    success: (nData, data) => {
                        notification['success']({
                            message: '??????????????',
                            description: '??????????????',
                            placement: 'topLeft',
                        });

                        setIsDeleteConfirm({});
                        getData();
                    },
                    fail: (e) => {
                        const data = get(e, 'response.data', []);
                        data.map((item) => {

                            notification['error']({
                                message: '????????????',
                                description: item.message,
                                placement: 'topLeft',
                            });
                        });
                    },
                },
            },
        });
    };



    useEffect(() => {
        getData();
    }, []);
    const updateClick = (id) => {
        setOpenUpdateForm(true);
        setUpdateId(id);
    };
    return (
        <div>
            <div className="site-layout-background" style={{minHeight: 360}}>
                <PageHeader
                    className="site-page-header"
                    onBack={() => history.push('/')}
                    title="Auth rules"
                    subTitle="??????????, ????????????????, ?????????????????? ?? ????????????????"
                    tags={[]}
                    style={{marginBottom: '15px'}}
                    extra={[
                        <Search
                            placeholder="??????????"
                            onSearch={(value) => {
                                setSearchQuery(value.length > 0 ? value : null);
                            }}
                            style={{width: '300px'}}
                        />,
                        <Button onClick={() => setOpenCreateForm(true)}>??????????????</Button>,
                    ]}
                />
                {!isFetchedList && <SkeletonLoader/>}
                {isFetchedList && <Table
                    rowKey={(record) => get(record, 'name')}
                    dataSource={resultData}
                    columns={[
                        {
                            title: '??????',
                            dataIndex: 'name',
                            key: 'name',
                            sorter: true,
                        },
                        {
                            title: '????????????????',
                            key: 'actions',
                            render: (text, record, index) => {
                                return (
                                    <Space size="middle">
                                        <Button type="link" onClick={() => updateClick(get(record, 'name'))}>
                                            ????????????????
                                        </Button>
                                        <Popconfirm
                                            title="??????????????"
                                            visible={get(isDeleteConfirm, get(record, 'name'), false)}
                                            onCancel={() => setIsDeleteConfirm({})}
                                            onConfirm={() => deleteData(get(record, 'name'))}
                                        >
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    setIsDeleteConfirm({
                                                        [get(record, 'name')]: true,
                                                    });
                                                }}
                                                danger
                                            >
                                                ??????????????
                                            </Button>
                                        </Popconfirm>
                                    </Space>
                                );
                            },
                        },
                    ]}
                    loading={!isFetchedList}
                    pagination={pagination}
                    onChange={handleTableChange}
                />}
            </div>
            <Drawer
                title="??????????????"
                width={420}
                placement={'right'}
                onClose={() => setOpenCreateForm(false)}
                visible={isOpenCreateForm}
            >
                <CreateContainer/>
            </Drawer>
            <Drawer
                title="????????????????"
                placement={'left'}
                width={420}
                onClose={() => setOpenUpdateForm(false)}
                visible={isOpenUpdateForm}
            >
                <UpdateContainer id={updateId}/>
            </Drawer>
        </div>
    );
}
