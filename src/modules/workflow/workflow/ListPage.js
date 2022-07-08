import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Input,
  notification,
  Popconfirm,
  Space,
  Table,
} from "antd";
import get from "lodash/get";
import { CreateContainer } from "./CreateContainer";
import { useDispatch, useSelector } from "react-redux";
import { usePrevious } from "react-use";
import Moment from "react-moment";
import ApiActions from "../../../services/api/Actions";
import { UpdateContainer } from "./UpdateContainer";
import { useHistory } from "react-router";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import Workflow from "../../../schema/Workflow";
import Normalizer from "../../../services/normalizr";
import Hat from "../../../components/Hat/Hat";
import Toolbar from "../../../components/Toolbar";
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
    get(state, "normalize.data.workflow-type-list.result._meta.currentPage")
  );
  const paginationPageSize = useSelector((state) =>
    get(state, "normalize.data.workflow-type-list.result._meta.perPage")
  );
  const paginationTotal = useSelector((state) =>
    get(state, "normalize.data.workflow-type-list.result._meta.totalCount")
  );
  const pagination = {
    current: paginationCurrent,
    pageSize: paginationPageSize,
    total: paginationTotal,
  };
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedList = useSelector((state) =>
    get(state, "normalize.data.workflow-type-list.isFetched", true)
  );
  const isFetchedListPrev = usePrevious(isFetchedList);
  const resultList = useSelector((state) =>
    get(state, "normalize.data.workflow-type-list.result")
  );
  const resultListPrev = usePrevious(resultList);
  const resultListData = Normalizer.Denormalize(
    resultList,
    { data: [Workflow] },
    entities
  );
  const resultData = get(resultListData, "data", []);
  const isFetchedCreate = useSelector((state) =>
    get(state, "normalize.data.workflow-type-create.isFetched")
  );
  const isFetchedCreatePrev = usePrevious(isFetchedCreate);
  const resultCreate = useSelector((state) =>
    get(state, "normalize.data.workflow-type-create.result")
  );
  const resultCreatePrev = usePrevious(resultCreate);
  const isFetchedUpdate = useSelector((state) =>
    get(state, "normalize.data.workflow-type-update.isFetched")
  );
  const isFetchedUpdatePrev = usePrevious(isFetchedUpdate);
  const resultUpdate = useSelector((state) =>
    get(state, "normalize.data.workflow-type-update.result")
  );
  const resultUpdatePrev = usePrevious(resultUpdate);
  const isFetchedDelete = useSelector((state) =>
    get(state, "normalize.data.workflow-type-delete.isFetched")
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
        storeName: "workflow-type-list",
        entityName: "workflowType",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/workflow/workflow`,
        config: {
          params: {
            "per-page": perPage,
            page: page,
            s: searchQuery,
            sort,
          },
        },
        scheme: { data: [Workflow] },
        storeName: "workflow-type-list",
        entityName: "workflowType",
      },
    });
  };

  const deleteData = (id) => {
    const url = `/workflow/workflow/${id}`;
    const scheme = Workflow;
    const storeName = "workflow-type-list";
    const entityName = "workflowType";
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
    <div className="page-content">
      <Hat name={"Процессы"} desc={"Поиск, создание, изменение и удаление"} />
      <Toolbar classname={"mx-2 mb-2 mt-2"}>
        <>
          <div className="flex">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-theme form-control-sm search"
                placeholder="Search"
                onSearch={(value) => {
                  setSearchQuery(value.length > 0 ? value : null);
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
                      <circle cx={11} cy={11} r={8} />
                      <line x1={21} y1={21} x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                </button>
                <button
                  className="btn btn-white no-border btn-sm ml-2"
                  type="button"
                  onClick={() => {
                    setOpenCreateForm(true);
                  }}
                >
                  <span className="d-flex text-muted">{"Создать"}</span>
                </button>
              </span>
            </div>
          </div>
        </>
      </Toolbar>
      <div className="col-md-12" style={{ minHeight: 360 }}>
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
                title: "Название",
                dataIndex: "title",
                key: "title",
                sorter: true,
              },
              {
                title: "Имя",
                dataIndex: "name",
                key: "name",
                sorter: true,
              },
              {
                title: "Workflowable id",
                dataIndex: "workflowable_id",
                key: "workflowable_id",
                sorter: true,
              },
              {
                title: "Workflowable Type",
                dataIndex: "workflowable_type",
                key: "workflowable_type",
                sorter: true,
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
              {
                title: "Действие",
                key: "actions",
                render: (text, record, index) => {
                  return (
                    <Space size="middle">
                      <Button
                        type="link"
                        onClick={() => updateClick(record.id)}
                      >
                        Изменить
                      </Button>
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
        width={400}
        placement={"right"}
        onClose={() => setOpenCreateForm(false)}
        visible={isOpenCreateForm}
      >
        <CreateContainer
          getData={getData}
          setOpenCreateForm={setOpenCreateForm}
        />
      </Drawer>
      <Drawer
        title="Изменить"
        placement={"right"}
        width={400}
        onClose={() => setOpenUpdateForm(false)}
        visible={isOpenUpdateForm}
      >
        <UpdateContainer id={updateId} setOpenUpdateForm={setOpenUpdateForm} />
      </Drawer>
    </div>
  );
}