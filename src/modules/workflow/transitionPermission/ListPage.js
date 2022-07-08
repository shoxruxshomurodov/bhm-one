import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Input,
  notification,
  PageHeader,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import get from "lodash/get";
import { CreateContainer } from "./CreateContainer";
import { useDispatch, useSelector } from "react-redux";
import { usePrevious } from "react-use";
import isEqual from "lodash/isEqual";
import ApiActions from "../../../../../services/api/Actions";
import TransitionPermissionScheme from "../../../../../schema/TransitionPermission";
import Normalizer from "../../../../../services/normalizer";
import { UpdateContainer } from "./UpdateContainer";
import Actions from "../../../Actions";
import actions from "../../../Actions";
import { useHistory } from "react-router";
import VarsExampleTransitionPermission from "../../../../../schema/VarsExampleTransitionPermission";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";

const { Option } = Select;
const { Search } = Input;

export default function ListPage() {
  const dispatch = useDispatch();
  const [isOpenCreateForm, setOpenCreateForm] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const perPagePrev = usePrevious(perPage);
  const [page, setPage] = useState(1);
  const pagePrev = usePrevious(page);
  const [searchQuery, setSearchQuery] = useState(null);
  const searchQueryPrev = usePrevious(searchQuery);
  const paginationCurrent = useSelector((state) =>
    get(
      state,
      "normalizer.data.transition-permission-list.result._meta.currentPage"
    )
  );
  const paginationPageSize = useSelector((state) =>
    get(
      state,
      "normalizer.data.transition-permission-list.result._meta.perPage"
    )
  );
  const paginationTotal = useSelector((state) =>
    get(
      state,
      "normalizer.data.transition-permission-list.result._meta.totalCount"
    )
  );
  const pagination = {
    current: paginationCurrent,
    pageSize: paginationPageSize,
    total: paginationTotal,
  };
  const entities = useSelector((state) => get(state, "normalizer.entities"));

  const isFetchedList = useSelector((state) =>
    get(state, "normalizer.data.transition-permission-list.isFetched", true)
  );
  const isFetchedListPrev = usePrevious(isFetchedList);
  const resultList = useSelector((state) =>
    get(state, "normalizer.data.transition-permission-list.result")
  );
  const resultListPrev = usePrevious(resultList);
  const resultListData = Normalizer.Denormalize(
    resultList,
    { data: [TransitionPermissionScheme] },
    entities
  );
  const resultData = get(resultListData, "data", []);

  const isFetchedListVarsExample = useSelector((state) =>
    get(state, "normalizer.data.varsExampleTransitionPermission.isFetched")
  );
  const isFetchedListPrevVarsExample = usePrevious(isFetchedListVarsExample);
  const resultListVarsExample = useSelector((state) =>
    get(state, "normalizer.data.varsExampleTransitionPermission.result")
  );
  const resultListPrevVarsExample = usePrevious(resultListVarsExample);
  const resultListDataVarsExample = Normalizer.Denormalize(
    resultListVarsExample,
    { data: [VarsExampleTransitionPermission] },
    entities
  );
  const resultDataVarsExample = get(resultListDataVarsExample, "data", []);

  const isFetchedCreate = useSelector((state) =>
    get(state, "normalizer.data.transition-permission-create.isFetched")
  );
  const isFetchedCreatePrev = usePrevious(isFetchedCreate);
  const resultCreate = useSelector((state) =>
    get(state, "normalizer.data.transition-permission-create.result")
  );
  const resultCreatePrev = usePrevious(resultCreate);
  const isFetchedUpdate = useSelector((state) =>
    get(state, "normalizer.data.transition-permission-update.isFetched")
  );
  const isFetchedUpdatePrev = usePrevious(isFetchedUpdate);
  const resultUpdate = useSelector((state) =>
    get(state, "normalizer.data.transition-permission-update.result")
  );
  const resultUpdatePrev = usePrevious(resultUpdate);
  const isFetchedDelete = useSelector((state) =>
    get(state, "normalizer.data.transition-permission-delete.isFetched")
  );
  const isFetchedDeletePrev = usePrevious(isFetchedDelete);
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
    const { current: page } = pagination;
    setSorter(sorter);
    setPage(page);
  };

  const getData = () => {
    const { columnKey = null, field = null, order = null } = sorter;

    let sort = null;
    if (columnKey && field && order) {
      if (order == "ascend") {
        sort = `${field}`;
      } else {
        sort = `-${field}`;
      }
    }
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "transition-permission-list",
        entityName: "transitionPermission",
      },
    });

    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/workflow/transition-permission`,
        config: {
          params: {
            "per-page": perPage,
            page: page,
            s: searchQuery,
            sort,
            include: "transition,permissionable",
          },
        },
        scheme: { data: [TransitionPermissionScheme] },
        storeName: "transition-permission-list",
        entityName: "transitionPermission",
      },
    });
  };

  const getDataVarsExample = () => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "varsExampleTransitionPermission",
        entityName: "varsExampleTransitionPermission",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/workflow/transition-permission/vars-example`,
        config: {
          params: {
            "per-page": 10000,
          },
        },
        scheme: { data: [VarsExampleTransitionPermission] },
        storeName: "varsExampleTransitionPermission",
        entityName: "varsExampleTransitionPermission",
      },
    });
  };

  const deleteData = (id) => {
    dispatch({
      type: Actions.TRANSITION_PERMISSION_DELETE.REQUEST,
      payload: {
        id,
        cb: {
          success: (nData, data) => {
            notification["success"]({
              message: "Успешно",
              description: "Удалено",
              placement: "topLeft",
            });

            setIsDeleteConfirm({});
            getData();
          },
          fail: (e) => {
            const data = get(e, "response.data", []);
            data.map((item) => {
              notification["error"]({
                message: "Ошибка",
                description: item.message,
                placement: "topLeft",
              });
            });
          },
        },
      },
    });
  };

  useEffect(() => {
    if (
      (!isEqual(isFetchedCreate, isFetchedCreatePrev) ||
        !isEqual(resultCreate, resultCreatePrev)) &&
      isFetchedCreate
    ) {
      setOpenCreateForm(false);
      getData();
    }

    if (
      (!isEqual(isFetchedUpdate, isFetchedUpdatePrev) ||
        !isEqual(resultUpdate, resultUpdatePrev)) &&
      isFetchedUpdate
    ) {
      setOpenUpdateForm(false);
      getData();
    }

    if (!isEqual(searchQueryPrev, searchQuery) && isFetchedList) {
      getData();
    }

    if (!isEqual(pagePrev, page) && isFetchedList) {
      getData();
    }

    if (!isEqual(sorter, sorterPrev) && isFetchedList) {
      getData();
    }
  });
  const breadcrumbs = [
    { name: "Административная часть", link: "/" },
    { name: "Доступы к переходнам процессам", link: "/" },
  ];
  const getBreadcrumbs = () => {
    dispatch({
      type: actions.SET_BREADCRUMBS.REQUEST,
      payload: { breadcrumbs },
    });
  };
  useEffect(() => {
    getData();
    getBreadcrumbs();
    getDataVarsExample();
  }, []);

  const updateClick = (id) => {
    setOpenUpdateForm(true);
    setUpdateId(id);
  };

  return (
    <div>
      <div className="site-layout-background" style={{ minHeight: 360 }}>
        <PageHeader
          className="site-page-header"
          onBack={() => history.push("/")}
          title="Доступы к переходам процесса"
          subTitle="Поиск, создание и удаление"
          tags={[]}
          style={{ marginBottom: "15px" }}
          extra={[
            <Search
              placeholder="Поиск"
              onSearch={(value) => {
                setSearchQuery(value.length > 0 ? value : null);
              }}
              style={{ width: "300px" }}
            />,
            <Button onClick={() => setOpenCreateForm(true)}>Создать</Button>,
          ]}
        />
        {!isFetchedList && <SkeletonLoader />}

        {isFetchedList && (
          <Table
            rowKey={(record) => record.id}
            dataSource={resultData}
            columns={[
              {
                title: "ID",
                dataIndex: "id",
                key: "id",
                sorter: true,
              },
              {
                title: "Переход ",
                render: (text, record, index) => {
                  return (
                    <Space size="middle">
                      {get(record, "transition.title")}
                    </Space>
                  );
                },
                key: "transition_id",
                sorter: true,
              },

              {
                title: "Доступ",
                render: (text, record, index) => {
                  return (
                    <Space size="middle">
                      {get(record, "permissionable.title")}
                      {get(record, "permissionable.phone")}
                      {get(record, "permissionable.name")}
                    </Space>
                  );
                },
                key: "permissionable",
                sorter: true,
              },
              {
                title: "Действие",
                key: "actions",
                render: (text, record, index) => {
                  return (
                    <Space size="middle">
                      <Popconfirm
                        title="Удалить"
                        visible={get(isDeleteConfirm, record.id, false)}
                        onCancel={() => setIsDeleteConfirm({})}
                        onConfirm={() => deleteData(record.id)}
                      >
                        <Button
                          type="link"
                          onClick={() => {
                            setIsDeleteConfirm({
                              [record.id]: true,
                            });
                          }}
                          danger
                        >
                          Удалить
                        </Button>
                      </Popconfirm>
                    </Space>
                  );
                },
              },
            ]}
            // loading={!isFetchedList}
            pagination={pagination}
            onChange={handleTableChange}
          />
        )}
      </div>

      <Drawer
        title="Создать"
        width={820}
        placement={"right"}
        onClose={() => setOpenCreateForm(false)}
        visible={isOpenCreateForm}
      >
        <CreateContainer vars={resultDataVarsExample} />
      </Drawer>
      <Drawer
        title="Изменить"
        placement={"left"}
        width={420}
        onClose={() => setOpenUpdateForm(false)}
        visible={isOpenUpdateForm}
      >
        <UpdateContainer vars={resultDataVarsExample} id={updateId} />
      </Drawer>
    </div>
  );
}
