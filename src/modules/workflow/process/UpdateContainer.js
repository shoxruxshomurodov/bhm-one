import * as React from "react";
import { useEffect } from "react";
import ApiActions from "../../../services/api/Actions";
import TransitionToStateScheme from "../../../schema/TransitionToState";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { usePrevious } from "react-use";
import { UpdateForm } from "./UpdateForm";
import { notification } from "antd";
import Loader from "../../../components/Loader";
import Normalizer from "../../../services/normalizr";
import WorkflowProcess from "../../../schema/WorkflowProcess";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
export function UpdateContainer({ id, getAll,setOpenUpdateForm }) {
  const prevId = usePrevious(id);
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedOne = useSelector((state) =>
    get(state, "normalize.data.workflow-process-update-one.isFetched")
  );
  const resultOne = useSelector((state) =>
    get(state, "normalize.data.workflow-process-update-one.result")
  );
  const dataOne = Normalizer.Denormalize(resultOne, WorkflowProcess, entities);
  const getData = () => {
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/monitoring/process/${id}`,
        config: {},
        scheme: WorkflowProcess,
        storeName: "workflow-process-update-one",
        entityName: "workflowProcess",
      },
    });
  };

  const update = (attributes, formMethods) => {
    const url = `/monitoring/process/${id}`;
    const storeName = "workflow-process-update";
    const entityName = "workflowProcess";
    const scheme = WorkflowProcess;
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
            formMethods.setSubmitting(false)
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!isEqual(prevId, id) && isFetchedOne) {
      getData();
    }
  });

  if (!isFetchedOne) {
    return <SkeletonLoader />;
  }
  return (
      <UpdateForm attributes={dataOne} update={update} />
  );
}
