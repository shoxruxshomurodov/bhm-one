import * as React from "react";
import { useEffect } from "react";
import ApiActions from "../../../services/api/Actions";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { usePrevious } from "react-use";
import { UpdateForm } from "./UpdateForm";
import { notification } from "antd";
import Loader from "../../../components/Loader";
import Normalizer from "../../../services/normalizr";
import WorkflowFilesStateScheme from "../../../schema/WorkflowFilesState";
import WorkflowState from "../../../schema/WorkflowState";
import WorkflowFilesScheme from "../../../schema/WorkflowFiles";
export function UpdateContainer({ id, getAll }) {
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
  const prevId = usePrevious(id);
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedOne = useSelector((state) =>
    get(state, "normalize.data.workflow-process-file-state-update-one.isFetched")
  );
  const resultOne = useSelector((state) =>
    get(state, "normalize.data.workflow-process-file-state-update-one.result")
  );
  const dataOne = Normalizer.Denormalize(resultOne, WorkflowFilesStateScheme, entities);
  const getData = () => {
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/monitoring/process-file-state/${id}`,
        config: {},
        scheme: WorkflowFilesStateScheme,
        storeName: "workflow-process-file-state-update-one",
        entityName: "workflow-process-file-state",
      },
    });
  };

  const update = (attributes, formMethods) => {
    const url = `/monitoring/process-file-state/${id}`;
    const storeName = "workflow-process-file-state-update";
    const entityName = "workflow-process-file-state";
    const scheme = WorkflowFilesStateScheme;
    dispatch({
      type: ApiActions.OPERATION_UPDATE.REQUEST,
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
              description: "Изменено",
              placement: "topLeft",
            });
            getAll();
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
    getAllProcessFiles();
    getData()
  },[])

  useEffect(() => {
    if (!isEqual(prevId, id) && isFetchedOne) {
      getData();
    }
  });

  if (!isFetchedOne) {
    return <Loader />;
  }

  return (
      <UpdateForm attributes={dataOne} update={update} stateList={resultData} processList={resultProcess} />
  );
}
