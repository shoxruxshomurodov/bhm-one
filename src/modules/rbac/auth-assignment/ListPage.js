import * as React from "react";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Drawer,
  Input,
  notification,
  PageHeader,
  Popconfirm,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { get } from "lodash";
import { CreateContainer } from "./CreateContainer";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "lodash/isEqual";
import ApiActions from "../../../services/api/Actions";
import AuthAssignmentScheme from "../../../schema/AuthAssignment";
import Normalizer from "../../../services/normalizr";
import { UpdateContainer } from "./UpdateContainer";
import { useHistory } from "react-router";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import AuthItem from "../../../schema/AuthItem";
const { Option } = Select;
const { Search } = Input;

export default function ListPage() {
  const dispatch = useDispatch();
  const [isOpenCreateForm, setOpenCreateForm] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(null);
  const paginationCurrent = useSelector((state) =>
    get(
      state,
      "normalize.data.auth-assignment-list.result._meta.currentPage",
      1
    )
  );
  const paginationPageSize = useSelector((state) =>
    get(state, "normalize.data.auth-assignment-list.result._meta.perPage", 20)
  );
  const paginationTotal = useSelector((state) =>
    get(state, "normalize.data.auth-assignment-list.result._meta.totalCount")
  );
  const pagination = {
    current: paginationCurrent,
    pageSize: paginationPageSize,
    total: paginationTotal,
  };
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedList = useSelector((state) =>
    get(state, "normalize.data.auth-assignment-list.isFetched", true)
  );
  const resultList = useSelector((state) =>
    get(state, "normalize.data.auth-assignment-list.result")
  );
  const resultListData = Normalizer.Denormalize(
    resultList,
    { data: [AuthAssignmentScheme] },
    entities
  );
  const resultData = get(resultListData, "data", []);
  const [isOpenUpdateForm, setOpenUpdateForm] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState({});
  const [sorter, setSorter] = useState({
    columnKey: null,
    field: null,
    order: null,
  });
  const history = useHistory();
  const handleTableChange = (pagination, filters, sorter) => {
    const { current: page, pageSize: size } = pagination;
    setSorter(sorter);
    setPage(page);
    setPerPage(size);
    getData({ page });
  };
  const getData = (params) => {
    const { columnKey = null, field = null, order = null } = sorter;

    let sort = null;
    if (columnKey && field && order) {
      if (isEqual(order, "ascend")) {
        sort = `${field}`;
      } else {
        sort = `-${field}`;
      }
    }
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "auth-assignment-list",
        entityName: "authAssignment",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/rbac/auth-assignment`,
        config: {
          params: {
            "per-page": perPage,
            ...params,
            "filter[item_name]": get(values, "role_id", null),
            s: searchQuery,
            sort,
            include: ["user.profile.absInfo.employee"].join(","),
          },
        },
        scheme: { data: [AuthAssignmentScheme] },
        storeName: "auth-assignment-list",
        entityName: "authAssignment",
      },
    });
  };
  const deleteData = (id) => {
    const url = `/rbac/auth-assignment/${id}`;
    const storeName = "auth-assignment-delete";
    const entityName = "authAssignment";
    const scheme = AuthAssignmentScheme;
    dispatch({
      type: ApiActions.OPERATION_DELETE.REQUEST,
      payload: {
        url,
        scheme,
        storeName,
        entityName,
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
              return item;
            });
          },
        },
      },
    });
  };
  const [values, setValues] = useState({
    role_id: null,
  });
  const isFetchedRoles = useSelector((state) =>
    get(state, "normalize.data.role-list.isFetched", true)
  );
  const roleState = useSelector((state) =>
    get(state, "normalize.data.role-list.result")
  );
  const roleData = Normalizer.Denormalize(
    roleState,
    { data: [AuthItem] },
    entities
  );
  const roleList = get(roleData, "data", []);
  const getRoles = () => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "role-list",
        entityName: "authItem",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `rbac/auth-item`,
        config: {
          params: {
            "per-page": 100,
            "filter[type]": 1,
          },
        },
        scheme: {
          data: [AuthItem],
        },
        storeName: "role-list",
        entityName: "authItem",
      },
    });
  };

  useEffect(() => {
    getData();
    getRoles();
  }, []);

  return (
    <div>
      <div className="site-layout-background" style={{ minHeight: 360 }}>
        <PageHeader
          className="site-page-header"
          onBack={() => history.push("/")}
          title="Доступ"
          subTitle="Поиск, создание, изменение и удаление"
          tags={[]}
          style={{ marginBottom: "15px" }}
          extra={[
            <Badge
              className="site-badge-count-109"
              count={`Общее количество ролей : ${paginationTotal}`}
              style={{ backgroundColor: "#1890ff" }}
            />,
            <Select
              showSearch
              placeholder="Организации"
              defaultValue={values.role_id}
              allowClear={true}
              onClear={() => {
                setValues({ role_id: null });
              }}
              showArrow={true}
              name="org_id"
              filterOption={(input, option) =>
                option.children &&
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onSelect={(value) => {
                setValues({
                  role_id: value,
                });
              }}
              style={{ width: "200px" }}
              loading={!isFetchedRoles}
              notFoundContent={isFetchedRoles ? <Spin size={"small"} /> : null}
              value={values.role_id}
            >
              {roleList &&
                roleList.map(function(role) {
                  return (
                    <Option key={get(role, "name")} value={get(role, "name")}>
                      {get(role, "description")}
                    </Option>
                  );
                })}
            </Select>,
            <Search
              placeholder="Поиск"
              onChange={(value) => {
                setSearchQuery(value.length > 0 ? value : null);
                getData({
                  "filter[item_name]": value,
                });
              }}
              style={{ width: "200px" }}
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
                render: (value, record, index) => {
                  return (
                    <>
                      {isEqual(paginationCurrent, 1)
                        ? index + 1
                        : index +
                          1 +
                          paginationPageSize * (paginationCurrent - 1)}
                    </>
                  );
                },
              },
              {
                title: "Права или роль",
                dataIndex: "item_name",
                key: "item_name",
                sorter: true,
              },
              {
                title: "Пользователь",
                render: (title, row) => {
                  return get(row, "user.phone");
                },
                key: "user_id",
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
      >
        <CreateContainer />
      </Drawer>
      <Drawer
        title="Изменить"
        placement={"left"}
        width={420}
        onClose={() => setOpenUpdateForm(false)}
        visible={isOpenUpdateForm}
      >
        <UpdateContainer id={updateId} />
      </Drawer>
    </div>
  );
}
