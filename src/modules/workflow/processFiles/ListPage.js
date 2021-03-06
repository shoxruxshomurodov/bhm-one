import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Drawer, notification, Popconfirm, Space, Table} from "antd";
import get from "lodash/get";
import {CreateContainer} from "./CreateContainer";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../services/api/Actions";
import {UpdateContainer} from "./UpdateContainer";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import Normalizer from "../../../services/normalizr";
import Hat from "../../../components/Hat/Hat";
import Toolbar from "../../../components/Toolbar";
import WorkflowFilesScheme from "../../../schema/WorkflowFiles";
import Moment from "react-moment";

export default function ListPage() {
       const dispatch = useDispatch();
       const [isOpenCreateForm, setOpenCreateForm] = useState(false);
       const [perPage, setPerPage] = useState(10);
       const [page, setPage] = useState(1);
       const [searchQuery, setSearchQuery] = useState(null);
       const paginationCurrent = useSelector((state) => get(state, "normalize.data.workflow-process-file-list.result._meta.currentPage"));
       const paginationPageSize = useSelector((state) => get(state, "normalize.data.workflow-process-file-list.result._meta.perPage"));
       const paginationTotal = useSelector((state) => get(state, "normalize.data.workflow-process-file-list.result._meta.totalCount"));
       const pagination = {
              current: paginationCurrent, pageSize: paginationPageSize, total: paginationTotal,
       };
       const entities = useSelector((state) => get(state, "normalize.entities"));
       const isFetchedList = useSelector((state) => get(state, "normalize.data.workflow-process-file-list.isFetched", true));
       const resultList = useSelector((state) => get(state, "normalize.data.workflow-process-file-list.result"));
       const resultListData = Normalizer.Denormalize(resultList, {data: [WorkflowFilesScheme]}, entities);
       const resultData = get(resultListData, "data", []);
       const [isOpenUpdateForm, setOpenUpdateForm] = useState(false);
       const [updateId, setUpdateId] = useState(null);
       const [isDeleteConfirm, setIsDeleteConfirm] = useState({});
       const [sorter, setSorter] = useState({
              columnKey: null, field: null, order: null,
       });
       const handleTableChange = (pagination, filters, sorter) => {
              const {current: page} = pagination;
              getData({page});
              setSorter(sorter);
              setPage(page);
       };

       const getData = (params) => {
              const {columnKey = null, field = null, order = null} = sorter;
              let sort = null;
              if (columnKey && field && order) {
                     if (order == "ascend") {
                            sort = `${field}`;
                     } else {
                            sort = `-${field}`;
                     }
              }
              dispatch({
                     type: ApiActions.GET_ALL.TRIGGER, payload: {
                            storeName: "workflow-process-file-list", entityName: "workflow-process-file",
                     },
              });

              dispatch({
                     type: ApiActions.GET_ALL.REQUEST, payload: {
                            url: `/monitoring/process-file`,
                            config: {
                                   params: {
                                          "per-page": perPage,
                                          page: page,
                                          s: searchQuery,
                                          sort,
                                          include: "process", ...params,
                                   },
                            },
                            scheme: {data: [WorkflowFilesScheme]},
                            storeName: "workflow-process-file-list",
                            entityName: "workflow-process-file",
                     },
              });
       };

       const deleteData = (id) => {
              const url = `/monitoring/process-file/${id}`;
              const storeName = "workflow-process-file-delete";
              const entityName = "workflow-process-file";
              const scheme = WorkflowFilesScheme;
              dispatch({
                     type: ApiActions.OPERATION_DELETE.REQUEST, payload: {
                            url, storeName, entityName, scheme, cb: {
                                   success: (nData, data) => {
                                          notification["success"]({
                                                 message: "??????????????", description: "??????????????", placement: "topLeft",
                                          });
                                          setIsDeleteConfirm({});
                                          getData();
                                   }, fail: (e) => {
                                          const data = get(e, "response.data", []);
                                          data.map((item) => {
                                                 notification["error"]({
                                                        message: "????????????",
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

       return (<div className="page-content">
              <Hat
                  name="???????????????????? ???????????? ????????????????"
                  desc="??????????, ????????????????, ?????????????????? ?? ????????????????"
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
                      <circle cx={11} cy={11} r={8}/>
                      <line x1={21} y1={21} x2="16.65" y2="16.65"/>
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
                  <span className="d-flex text-muted">{"??????????????"}</span>
                </button>
              </span>
                                   </div>
                            </div>
                     </>
              </Toolbar>
              <div
                  className="site-layout-background col-md-12"
                  style={{minHeight: 360}}
              >
                     {!isFetchedList && <SkeletonLoader/>}
                     {isFetchedList && (<Table
                         rowKey={(record) => record.id}
                         dataSource={resultData}
                         columns={[{
                                title: "ID", dataIndex: "id", key: "id", sorter: true,
                         }, {
                                title: "File Name", dataIndex: "name", key: "name", sorter: true,
                         }, {
                                title: "Process Name",
                                dataIndex: "process.name",
                                key: "process.name",
                                sorter: true,
                                render: (text, record, index) => {
                                       return get(record, "process.name");
                                },
                         }, {
                                title: "Created at ",
                                dataIndex: "created_at",
                                key: "created_at",
                                render: (text, record, index) => {
                                       return <Moment format="DD-MM-YYYY">{text * 1000}</Moment>;
                                },
                                sorter: true,
                         }, {
                                title: "Updated at",
                                dataIndex: "updated_at",
                                key: "updated_at",
                                render: (text, record, index) => {
                                       return <Moment format="DD-MM-YYYY">{text * 1000}</Moment>;
                                },
                                sorter: true,
                         }, {
                                title: "Actions", key: "actions", render: (text, record, index) => {
                                       return (<Space size="middle">
                                              <Button
                                                  type="link"
                                                  onClick={() => updateClick(record.id)}
                                              >
                                                     ????????????????
                                              </Button>
                                              <Popconfirm
                                                  title="??????????????"
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
                                                            ??????????????
                                                     </Button>
                                              </Popconfirm>
                                       </Space>);
                                },
                         },]}
                         loading={!isFetchedList}
                         pagination={pagination}
                         onChange={handleTableChange}
                     />)}
              </div>
              <Drawer
                  title="??????????????"
                  width={400}
                  style={{marginTop: "62px"}}
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
                  title="????????????????"
                  placement={"right"}
                  width={400}
                  style={{marginTop: "62px"}}
                  onClose={() => setOpenUpdateForm(false)}
                  visible={isOpenUpdateForm}
              >
                     <UpdateContainer
                         id={updateId}
                         setOpenUpdateForm={setOpenUpdateForm}
                         getAll={getData}
                     />
              </Drawer>
       </div>);
}
