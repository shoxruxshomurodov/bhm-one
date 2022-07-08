import * as React from "react";
import {CreateForm} from "./CreateForm";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../services/api/Actions";
import {notification} from "antd";
import get from "lodash/get";
import WorkflowFilesScheme from "../../../schema/WorkflowFiles";
import WorkflowProcessScheme from "../../../schema/WorkflowProcess";
import Normalizer from "../../../services/normalizr";
import {useEffect} from "react";

export function CreateContainer({getData, setOpenCreateForm}) {
       const entities = useSelector((state) => get(state, "normalize.entities"));
       const isFetchedProcess = useSelector((state) =>
           get(state, "normalize.data.workflow-process-list.isFetched", false)
       );
       let resultProcess = useSelector((state) =>
           get(state, "normalize.data.workflow-process-list.result")
       );
       resultProcess = get(Normalizer.Denormalize(
           resultProcess,
           {data: [WorkflowProcessScheme]},
           entities
       ), "data");
       console.log(resultProcess, "resultProcess")
       const dispatch = useDispatch();
       const create = (attributes, formMethods) => {
              const url = "/monitoring/process-file";
              const storeName = "workflow-process-file-create";
              const entityName = "workflow-process-file";
              const scheme = WorkflowFilesScheme;
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
                                          getData();
                                          formMethods.setSubmitting(false);
                                          setOpenCreateForm(false)
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
                                   },
                            },
                     },
              });
       };
       const getAllProcess = () => {
              dispatch({
                     type: ApiActions.GET_ALL.TRIGGER,
                     payload: {
                            storeName: "workflow-process-list",
                     },
              });
              dispatch({
                     type: ApiActions.GET_ALL.REQUEST,
                     payload: {
                            url: `/monitoring/process`,
                            config: {
                                   params: {
                                          "per-page": 1000
                                   },
                            },
                            scheme: {data: [WorkflowProcessScheme]},
                            storeName: "workflow-process-list",
                            entityName: "workflowProcess",
                     },
              });
       }

       useEffect(() => {
              getAllProcess()
       }, [])
       return (
           <CreateForm create={create} processList={resultProcess}/>
       );
}
