import * as React from "react";
import {CreateForm} from "./CreateForm";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import {notification} from "antd";
import get from "lodash/get";
import {useEffect} from "react";
import WorkflowProcess from "../../../../schema/WorkflowProcess";
import WorkflowState from "../../../../schema/WorkflowState";
import Normalizer from "../../../../services/normalizr";

export function CreateContainer({setOpenCreateForm, monitoring_process_id, getAll , t}) {
       const dispatch = useDispatch();
       const entities = useSelector((state) => get(state, "normalize.entities"));
       const isFetchedList = useSelector((state) =>
           get(state, "normalize.data.workflow-state-list.isFetched")
       );
       const resultList = useSelector((state) =>
           get(state, "normalize.data.workflow-state-list.result")
       );
       const resultListData = Normalizer.Denormalize(
           resultList,
           {data: [WorkflowState]},
           entities
       );
       const resultData = get(resultListData, "data", []);

       console.log(resultData, "resultData")
       const create = (attributes, formMethods) => {
              const url = "/monitoring/process-file";
              const storeName = "workflow-process-create";
              const entityName = "workflowProcess";
              const scheme = WorkflowProcess;
              dispatch({
                     type: ApiActions.OPERATION_ADD.REQUEST,
                     payload: {
                            url,
                            storeName,
                            entityName,
                            scheme,
                            attributes,
                            cb: {
                                   success: (nData, data) => {
                                          notification["success"]({
                                                 message: "Успешно",
                                                 description: "Создано",
                                                 placement: "topRight",
                                          });
                                          getAll();
                                          getData()
                                          setOpenCreateForm(false);
                                          formMethods.setSubmitting(false)
                                   },
                                   fail: (e) => {
                                          formMethods.setSubmitting(false)
                                          const data = get(e, "response.data", []);
                                          data.map((item) => {
                                                 notification["error"]({
                                                        message: "Ошибка",
                                                        description: item.message,
                                                        placement: "topRight",
                                                 });

                                          });
                                          getAll();
                                          getData()
                                   },
                            },
                     },
              });
       };

       const getData = () => {
              dispatch({
                     type: ApiActions.GET_ALL.TRIGGER,
                     payload: {
                            storeName: "workflow-state-list",
                            entityName: "workflowState",
                     },
              });
              dispatch({
                     type: ApiActions.GET_ALL.REQUEST,
                     payload: {
                            url: `workflow/state`,
                            config: {
                                   params: {},
                            },
                            scheme: {data: [WorkflowState]},
                            storeName: "workflow-state-list",
                            entityName: "workflowState",
                     },
              });
       };
       useEffect(() => {
              getData()
       }, [])
       return (
           <CreateForm create={create} t={t}  state_list={resultData} id={monitoring_process_id}/>
       );
}
