import * as React from "react";
import { CreateForm } from "./CreateForm";
import { useDispatch, useSelector } from "react-redux";
import ApiActions from "../../../services/api/Actions";
import { notification } from "antd";
import get from "lodash/get";
import WorkflowFilesStateScheme from "../../../schema/WorkflowFilesState";
import {useEffect} from "react";
import WorkflowState from "../../../schema/WorkflowState";
import Normalizer from "../../../services/normalizr";
import WorkflowFilesScheme from "../../../schema/WorkflowFiles";
export function CreateContainer({ getData }) {
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedList = useSelector((state) =>
      get(state, "normalize.data.workflow-state-list.isFetched")
  );
  const resultList = useSelector((state) =>
      get(state, "normalize.data.workflow-state-list.result")
  );
  const resultListData = Normalizer.Denormalize(
      resultList,
      { data: [WorkflowState] },
      entities
  );
  const resultData = get(resultListData, "data", []);
  const isFetchedProcess = useSelector((state) =>
      get(state, "normalize.data.workflow-process-file-list.isFetched", false)
  );
  let resultProcess = useSelector((state) =>
      get(state, "normalize.data.workflow-process-file-list.result")
  );
  resultProcess = get(Normalizer.Denormalize(
      resultProcess,
      {data: [WorkflowFilesScheme]},
      entities
  ), "data");
  console.log(resultData,"resultData")
  const dispatch = useDispatch();
  const create = (attributes, formMethods) => {
    const url = "/monitoring/process-file-state";
    const storeName = "workflow-process-file-state-create";
    const entityName = "workflow-process-file-state";
    const scheme = WorkflowFilesStateScheme;
    dispatch({
      type: ApiActions.OPERATION_ADD.REQUEST,
      payload: {
        url,
        storeName,
        entityName,
        scheme,
        attributes,
        formMethods,
        cb: {
          success: (nData, data) => {
            notification["success"]({
              message: "Успешно",
              description: "Создано",
              placement: "topRight",
            });
            getData();
          },
          fail: (e) => {
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
  const getAllStates = () => {
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
          params: {
            "per-page": 1000
          },
        },
        scheme: { data: [WorkflowState] },
        storeName: "workflow-state-list",
        entityName: "workflowState",
      },
    });
  }
  const getAllProcessFiles = () => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName:"workflow-process-file-list",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/monitoring/process-file`,
        config: {
          params: {
            "per-page": 1000
          },
        },
        scheme: {data: [WorkflowFilesScheme]},
        storeName: "workflow-process-file-list",
        entityName: "workflow-process-file",
      },
    });
  }
  useEffect(() => {
    getAllStates();
    getAllProcessFiles()
  },[])
  return (
      <CreateForm create={create} stateList={resultData} processList={resultProcess} />
  );
}
