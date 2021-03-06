import React, {useEffect, useState} from "react";
import Hat from "../../../components/Hat/Hat";
import {useParams} from "react-router-dom";
import ApiActions from "../../../services/api/Actions";
import WorkflowProcess from "../../../schema/WorkflowProcess";
import {useDispatch, useSelector} from "react-redux";
import WorkflowProcessProduct from "../../../schema/WorkflowProcessProduct";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
import {Button, Drawer, notification, Popconfirm, Space, Table, Tag} from "antd";
import get from "lodash/get";
import Moment from "react-moment";
import Normalizer from "../../../services/normalizr";
import {UpdateContainer} from "./UpdateContainer";
import Toolbar from "../../../components/Toolbar";
import {CreateContainer} from "./CreateFormContainer";
import WorkflowTab from "../../../schema/WorkflowTab";

function ListPage() {
       const {id} = useParams()
       const dispatch = useDispatch();
       const [isOpenCreateForm, setOpenCreateForm] = useState(false);
       const [isOpenUpdateForm, setOpenUpdateForm] = useState(false);
       const [updateId, setUpdateId] = useState(null);
       const [isDeleteConfirm, setIsDeleteConfirm] = useState({});
       const [page, setPage] = useState(1);
       const [perPage, setPerPage] = useState(10);
       const [sorter, setSorter] = useState({
              columnKey: null, field: null, order: null,
       });
       const [searchQuery, setSearchQuery] = useState(null);
       const entities = useSelector((state) => get(state, "normalize.entities"));
       const isFetchedList = useSelector((state) => get(state, "normalize.data.workflow-tab-list.isFetched", true));
       const resultList = useSelector((state) => get(state, "normalize.data.workflow-tab-list.result"));
       const resultListData = Normalizer.Denormalize(resultList, {data: [WorkflowTab]}, entities);
       const resultData = get(resultListData, "data", []);

       const isFetchedOne = useSelector((state) => get(state, "normalize.data.workflow-process-update-one.isFetched"));
       // const resultOne = useSelector((state) => get(state, "normalize.data.workflow-process-update-one.result"));
       // const dataOne = Normalizer.Denormalize(resultOne, WorkflowProcess, entities);


       const paginationCurrent = useSelector((state) => get(state, "normalize.data.workflow-process-product-list.result._meta.currentPage"));
       const paginationPageSize = useSelector((state) => get(state, "normalize.data.workflow-process-product-list.result._meta.perPage"));
       const paginationTotal = useSelector((state) => get(state, "normalize.data.workflow-process-product-list.result._meta.totalCount"));


       const pagination = {
              current: paginationCurrent, pageSize: paginationPageSize, total: paginationTotal,
       };
       const handleTableChange = (pagination, filters, sorter) => {
              const {current: page} = pagination;
              getData({page});
              setSorter(sorter);
              setPage(page);
       };

       // const getOneData = () => {
       //        dispatch({
       //               type: ApiActions.GET_ONE.REQUEST,
       //               payload: {
       //                      url: `/monitoring/process-tab`,
       //                      config: {},
       //                      scheme: WorkflowProcess,
       //                      storeName: "workflow-process-update-one",
       //                      entityName: "workflowProcess",
       //               },
       //        });
       // };
       const getData = (params) => {
              dispatch({
                     type: ApiActions.GET_ALL.TRIGGER, payload: {
                            storeName: "workflow-tab-list", entityName: "workflowTab",
                     },
              });
              dispatch({
                     type: ApiActions.GET_ALL.REQUEST, payload: {
                            url: `/monitoring/process-tab`,
                            config: {
                                   params: {
                                          "per-page": perPage, page, s: searchQuery, include: "states", ...params,
                                   },
                            },
                            scheme: {data: [WorkflowTab]},
                            storeName: "workflow-tab-list",
                            entityName: "workflowTab",
                     },
              });
       };
       const deleteData = (id) => {
              const url = `/monitoring/process-tab/${id}`;
              const storeName = "workflow-tab-delete";
              const entityName = "workflowTab";
              const scheme = WorkflowTab;
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
       const updateClick = (id) => {
              setOpenUpdateForm(true);
              setUpdateId(id);
       };

       useEffect(() => {
              getData()
              // getOneData()
       }, [])

       //
       // if (!isFetchedOne) {
       //        return <Loader/>
       // }
       return (<div className="page-content">
              <Hat name={"Tabs"}/>
              <Toolbar classname={"mx-2 mb-2 mt-2"}>
                     <>
                            <div className="flex">
                                   <div className="input-group">
                                          <input
                                              type="text"
                                              className="form-control form-control-theme form-control-sm search"
                                              placeholder="Search"
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
                    className="btn btn-primary no-border btn-sm ml-2"
                    type="button"
                    onClick={() => {
                           setOpenCreateForm(true);
                    }}
                >
                  {"??????????????"}
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
                     {!isFetchedList ? <SkeletonLoader/> : <Table
                         rowKey={(record) => record.id}
                         dataSource={resultData}
                         columns={[{
                                title: "ID", dataIndex: "id", key: "id", sorter: true,
                         }, {
                                title: "Tab Name", dataIndex: 'name', key: 'name', sorter: true,
                         }, {
                                title: "Created At", render: (data) => {
                                       return <Moment
                                           format={"DD-MM-YYYY HH:mm"}>{get(data, "created_at") * 1000}</Moment>
                                }, sorter: true,
                         }, {
                                title: "Updated At", render: (data) => {
                                       return <Moment
                                           format={"DD-MM-YYYY HH:mm"}>{get(data, "updated_at") * 1000}</Moment>
                                },
                         }, {
                                title: "????????????????", key: "actions", render: (text, record, index) => {
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
                     />}
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
                         monitoring_process_id={id}
                         getAll={getData}
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
                         setOpenUpdateForm={setOpenUpdateForm}
                         getAll={getData}
                         id={updateId}
                     />
              </Drawer>
       </div>);
};
export default ListPage;