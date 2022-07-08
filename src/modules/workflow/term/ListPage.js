import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Drawer, notification, Popconfirm, Space, Table } from "antd";
import get from "lodash/get";
import { CreateContainer } from "./CreateContainer";
import { useDispatch, useSelector } from "react-redux";
import ApiActions from "../../../services/api/Actions";
import { UpdateContainer } from "./UpdateContainer";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import Normalizer from "../../../services/normalizr";
import Hat from "../../../components/Hat/Hat";
import Toolbar from "../../../components/Toolbar";
import WorkflowTermScheme from "../../../schema/WorkflowTerm";

export default function ListPage() {
  const dispatch = useDispatch();
  const [isOpenCreateForm, setOpenCreateForm] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(null);
  const paginationCurrent = useSelector((state) =>
    get(state, "normalize.data.workflow-term-list.result._meta.currentPage")
  );
  const paginationPageSize = useSelector((state) =>
    get(state, "normalize.data.workflow-term-list.result._meta.perPage")
  );
  const paginationTotal = useSelector((state) =>
    get(state, "normalize.data.workflow-term-list.result._meta.totalCount")
  );
  const pagination = {
    current: paginationCurrent,
    pageSize: paginationPageSize,
    total: paginationTotal,
  };
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedList = useSelector((state) =>
    get(state, "normalize.data.workflow-term-list.isFetched", true)
  );
  const resultList = useSelector((state) =>
    get(state, "normalize.data.workflow-term-list.result")
  );
  const resultListData = Normalizer.Denormalize(
    resultList,
    { data: [WorkflowTermScheme] },
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
  const handleTableChange = (pagination, filters, sorter) => {
    const { current: page } = pagination;
    getData({ page });
    setSorter(sorter);
    setPage(page);
  };
  const getData = (params) => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "workflow-term-list",
        entityName: "workflow-term",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/monitoring/term`,
        config: {
          params: {
            "per-page": perPage,
            page,
            s: searchQuery,
            include: "workflow,process",
            ...params,
          },
        },
        scheme: { data: [WorkflowTermScheme] },
        storeName: "workflow-term-list",
        entityName: "workflow-term",
      },
    });
  };

  const deleteData = (id) => {
    const url = `/monitoring/term/${id}`;
    const storeName = "workflow-term-delete";
    const entityName = "workflow-term";
    const scheme = WorkflowTermScheme;
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
  const updateClick = (id) => {
    setOpenUpdateForm(true);
    setUpdateId(id);
  };
  return (
    <div className="page-content">
      <Hat
        name="Срок мониторинга"
        desc="Поиск, создание, изменение и удаление"
      />
      <Toolbar classname={"mx-2 mb-2 mt-2"}>
        <>
          <div className="flex">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-theme form-control-sm search"
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
      <div
        className="site-layout-background col-md-12"
        style={{ minHeight: 360 }}
      >
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
                title: "Process",
                dataIndex: "process.name",
                key: "process.name",
                sorter: true,
                render: (text, record, index) => {
                  return (
                    <Space size="middle">{get(record, "process.name")}</Space>
                  );
                },
              },
              {
                title: "Workflow",
                render: (text, record) => {
                  return (
                    <Space size="middle">{get(record, "workflow.title")}</Space>
                  );
                },
                key: "workflow",
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
        style={{ marginTop: "62px" }}
        placement={"right"}
        onClose={() => setOpenCreateForm(false)}
        visible={isOpenCreateForm}
      >
        <CreateContainer
          setOpenCreateForm={setOpenCreateForm}
          getData={getData}
        />
      </Drawer>
      <Drawer
        title="Изменить"
        placement={"right"}
        width={400}
        style={{ marginTop: "62px" }}
        onClose={() => setOpenUpdateForm(false)}
        visible={isOpenUpdateForm}
      >
        <UpdateContainer
          setOpenUpdateForm={setOpenUpdateForm}
          id={updateId}
          getAll={getData}
        />
      </Drawer>
    </div>
  );
}
