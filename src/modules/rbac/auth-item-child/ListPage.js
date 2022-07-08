import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Input,
  notification,
  PageHeader,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { get } from "lodash";
import { CreateContainer } from "./CreateContainer";
import { useDispatch, useSelector } from "react-redux";
import { usePrevious } from "react-use";
import ApiActions from "../../../services/api/Actions";
import AuthItemChildScheme from "../../../schema/AuthItemChild";
import Normalizer from "../../../services/normalizr";
import { UpdateContainer } from "./UpdateContainer";
import { useHistory } from "react-router";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
const { Search } = Input;
export default function ListPage() {
  const dispatch = useDispatch();
  const [isOpenCreateForm, setOpenCreateForm] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(null);
  const searchQueryPrev = usePrevious(searchQuery);
  const paginationCurrent = useSelector((state) =>
    get(state, "normalize.data.auth-item-child-list.result._meta.currentPage")
  );
  const paginationPageSize = useSelector((state) =>
    get(state, "normalize.data.auth-item-child-list.result._meta.perPage")
  );
  const paginationTotal = useSelector((state) =>
    get(state, "normalize.data.auth-item-child-list.result._meta.totalCount")
  );
  const pagination = {
    current: paginationCurrent,
    pageSize: paginationPageSize,
    total: paginationTotal,
  };
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedList = useSelector((state) =>
    get(state, "normalize.data.auth-item-child-list.isFetched", true)
  );
  const resultList = useSelector((state) =>
    get(state, "normalize.data.auth-item-child-list.result")
  );
  const resultListData = Normalizer.Denormalize(
    resultList,
    { data: [AuthItemChildScheme] },
    entities
  );
  const resultData = get(resultListData, "data", []);
  const [isOpenUpdateForm, setOpenUpdateForm] = useState(false);
  const [updateParent, setUpdateParent] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  const [updateChild, setUpdateChild] = useState(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState({});
  const [sorter, setSorter] = useState({
    columnKey: null,
    field: null,
    order: null,
  });
  const history = useHistory();

  const handleTableChange = (pagination, filters, sorter) => {
    const { current: page } = pagination;
    setSorter(sorter);
    setPage(page);
    getData({ page });
  };

  const updateClick = (id) => {
    setOpenUpdateForm(true);
    setUpdateId(id);
  };
  const getData = (params) => {
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
        storeName: "auth-item-child-list",
        entityName: "authItemChild",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/rbac/auth-item-child`,
        config: {
          params: {
            "per-page": perPage,
            include: "id",
            ...params,
            s: searchQuery,
            sort,
          },
        },
        scheme: { data: [AuthItemChildScheme] },
        storeName: "auth-item-child-list",
        entityName: "authItemChild",
      },
    });
  };

  const deleteData = (id) => {
    const url = `/rbac/auth-item-child/${id}`;
    const storeName = "auth-item-child-delete";
    const entityName = "authItemChild";
    const scheme = AuthItemChildScheme;
    dispatch({
      type: ApiActions.OPERATION_DELETE.REQUEST,
      payload: {
        url,
        storeName,
        entityName,
        scheme,
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
    getData();
  }, []);
  return (
    <div>
      <div className="site-layout-background" style={{ minHeight: 360 }}>
        <PageHeader
          className="site-page-header"
          onBack={() => history.push("/")}
          title="Auth item child"
          subTitle="Поиск, создание, изменение и удаление"
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
                title: "Parent",
                dataIndex: "parent",
                key: "parent",
                sorter: true,
              },
              {
                title: "Child",
                dataIndex: "child",
                key: "child",
                sorter: true,
              },
              {
                title: "Действие",
                key: "actions",
                render: (text, record) => {
                  return (
                    <>
                      <Button
                        type="link"
                        onClick={() => updateClick(get(record, "name"))}
                      >
                        Изменить
                      </Button>
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
                    </>
                  );
                },
              },
            ]}
            loading={!isFetchedList}
            pagination={pagination}
            onChange={handleTableChange}
          />
        )}
      </div>
      <Drawer
        title="Создать"
        style={{ marginTop: "62px" }}
        width={420}
        placement={"right"}
        onClose={() => setOpenCreateForm(false)}
        visible={isOpenCreateForm}
      >
        <CreateContainer getData={getData} />
      </Drawer>
      <Drawer
        title="Изменить"
        placement={"right"}
        style={{ marginTop: "62px" }}
        width={420}
        onClose={() => setOpenUpdateForm(false)}
        visible={isOpenUpdateForm}
      >
        <UpdateContainer parent={updateParent} child={updateChild} />
      </Drawer>
    </div>
  );
}
