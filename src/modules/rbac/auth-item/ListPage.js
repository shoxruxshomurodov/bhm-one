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
import { get } from "lodash";
import { CreateContainer } from "./CreateContainer";
import { useDispatch, useSelector } from "react-redux";
import ApiActions from "../../../services/api/Actions";
import AuthItemScheme from "../../../schema/AuthItem";
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
  const paginationCurrent = useSelector((state) =>
    get(state, "normalizer.data.auth-item-list.result._meta.currentPage")
  );
  const paginationPageSize = useSelector((state) =>
    get(state, "normalizer.data.auth-item-list.result._meta.perPage")
  );
  const paginationTotal = useSelector((state) =>
    get(state, "normalizer.data.auth-item-list.result._meta.totalCount")
  );
  const pagination = {
    current: paginationCurrent,
    pageSize: paginationPageSize,
    total: paginationTotal,
  };
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedList = useSelector((state) =>
    get(state, "normalize.data.auth-item-list.isFetched", true)
  );
  const resultList = useSelector((state) =>
    get(state, "normalize.data.auth-item-list.result")
  );
  const resultListData = Normalizer.Denormalize(
    resultList,
    { data: [AuthItemScheme] },
    entities
  );
  const resultData = get(resultListData, "data", []);
  const [isOpenUpdateForm, setOpenUpdateForm] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState({});
  const history = useHistory();
  const handleTableChange = (pagination) => {
    const { current: page } = pagination;
    setPage(page);
    getData({ page });
  };
  const getData = (params) => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "auth-item-list",
        entityName: "authItem",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/rbac/auth-item`,
        config: {
          params: {
            "per-page": perPage,
            ...params,
          },
        },
        scheme: { data: [AuthItemScheme] },
        storeName: "auth-item-list",
        entityName: "authItem",
      },
    });
  };
  const deleteData = (id) => {
    const url = `/rbac/auth-item/${id}`;
    const storeName = "auth-item-delete";
    const entityName = "authItem";
    const scheme = AuthItemScheme;
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
            const message = get(e, "response.data.message", []);
            notification["error"]({
              message: "Ошибка",
              description: message,
              placement: "topLeft",
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
      <div className="site-layout-background" style={{ minHeight: 360 }}>
        <PageHeader
          className="site-page-header"
          onBack={() => history.push("/")}
          title="Auth item"
          subTitle="Поиск, создание, изменение и удаление"
          tags={[]}
          style={{ marginBottom: "15px" }}
          extra={[
            <Search
              placeholder="Поиск"
              onSearch={(value) => {
                const s = value.length > 0 ? value : null;
                setSearchQuery(value);
                getData({ s });
              }}
              style={{ width: "300px" }}
            />,
            <Button onClick={() => setOpenCreateForm(true)}>Создать</Button>,
          ]}
        />
        {!isFetchedList && <SkeletonLoader />}
        {isFetchedList && (
          <Table
            bordered={true}
            rowKey={(record) => get(record, "name")}
            dataSource={resultData}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
                sorter: true,
              },
              {
                title: "Type",
                dataIndex: "type",
                key: "type",
                sorter: true,
              },
              {
                title: "Description",
                dataIndex: "description",
                key: "description",
                sorter: true,
              },
              {
                title: "Rule name",
                dataIndex: "rule_name",
                key: "rule_name",
                sorter: true,
              },
              {
                title: "Действие",
                key: "actions",
                render: (text, record, index) => {
                  return (
                    <Space size="middle">
                      <Button
                        type="link"
                        onClick={() => updateClick(get(record, "name"))}
                      >
                        Изменить
                      </Button>
                      <Popconfirm
                        title="Удалить"
                        visible={get(
                          isDeleteConfirm,
                          get(record, "name"),
                          false
                        )}
                        onCancel={() => setIsDeleteConfirm({})}
                        onConfirm={() => deleteData(get(record, "name"))}
                      >
                        <Button
                          type="link"
                          onClick={() => {
                            setIsDeleteConfirm({
                              [get(record, "name")]: true,
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
            loading={!isFetchedList}
            pagination={pagination}
            onChange={handleTableChange}
          />
        )}
      </div>

      <Drawer
        title="Создать"
        width={420}
        placement={"right"}
        onClose={() => setOpenCreateForm(false)}
        visible={isOpenCreateForm}
        style={{ marginTop: "62px" }}
      >
        <CreateContainer
          setOpenCreateForm={setOpenCreateForm}
          getData={getData}
        />
      </Drawer>
      <Drawer
        title="Изменить"
        placement={"left"}
        width={420}
        onClose={() => setOpenUpdateForm(false)}
        visible={isOpenUpdateForm}
        style={{ marginTop: "62px" }}
      >
        <UpdateContainer id={updateId} />
      </Drawer>
    </div>
  );
}
