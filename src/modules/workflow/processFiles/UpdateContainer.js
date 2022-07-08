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
import WorkflowFilesScheme from "../../../schema/WorkflowFiles";
import WorkflowProcessScheme from "../../../schema/WorkflowProcess";
export function UpdateContainer({ id, getAll ,setOpenUpdateForm}) {
  const prevId = usePrevious(id);
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedOne = useSelector((state) =>
    get(state, "normalize.data.workflow-process-file-update-one.isFetched")
  );
  const resultOne = useSelector((state) =>
    get(state, "normalize.data.workflow-process-file-update-one.result")
  );
  const dataOne = Normalizer.Denormalize(resultOne, WorkflowFilesScheme, entities);
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
  console.log(resultProcess,"resultProcess")
  const getData = () => {
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/monitoring/process-file/${id}`,
        config: {
         params:{
           include: "process",
         }
        },
        scheme: WorkflowFilesScheme,
        storeName: "workflow-process-file-update-one",
        entityName: "workflow-process-file",
      },
    });
  };

  const update = (attributes, formMethods) => {
    const url = `/monitoring/process-file/${id}`;
    const storeName = "workflow-process-file-update";
    const entityName = "workflow-process-file";
    const scheme = WorkflowFilesScheme;
    dispatch({
      type: ApiActions.OPERATION_UPDATE.REQUEST,
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
              description: "Изменено",
              placement: "topLeft",
            });
            getAll();
            setOpenUpdateForm(false);
            formMethods.setSubmitting(false);
          },
          fail: (e) => {
            formMethods.setSubmitting(false);
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
  const getAllProcess = () => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName:"workflow-process-list",
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
    getData();
    getAllProcess()
  }, []);
  useEffect(() => {
    if (!isEqual(prevId, id) && isFetchedOne) {
      getData();
    }
  });

  if (!isFetchedOne) {
    return <Loader />;
  }
  return (
      <UpdateForm attributes={dataOne} update={update} processList={resultProcess} />
  );
}
