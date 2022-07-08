import * as React from "react";
import { useEffect } from "react";
import Workflow from "../../../schema/Workflow";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { usePrevious } from "react-use";
import { UpdateForm } from "./UpdateForm";
import ApiActions from "../../../services/api/Actions";
import { notification } from "antd";
import Loader from "../../../components/Loader";
import Normalizer from "../../../services/normalizr";
import WorkflowState from "../../../schema/WorkflowState";

export function UpdateContainer({ id, setOpenUpdateForm }) {
  const prevId = usePrevious(id);
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedOne = useSelector((state) =>
    get(state, "normalize.data.workflow-state-update-one.isFetched")
  );
  const resultOne = useSelector((state) =>
    get(state, "normalize.data.workflow-state-update-one.result")
  );
  const dataOne = Normalizer.Denormalize(resultOne, WorkflowState, entities);
  const getData = () => {
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/workflow/state/${id}`,
        scheme: WorkflowState,
        storeName: "workflow-state-update-one",
        entityName: "workflowState",
      },
    });
  };

  const update = (attributes, formMethods) => {
    const url = `/workflow/state/${id}`;
    const scheme = WorkflowState;
    const storeName = "workflow-state-update-one";
    const entityName = "workflowState";
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
            formMethods.setSubmitting(false);
            setOpenUpdateForm(false);
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

  useEffect(() => {
    if (!isEqual(prevId, id) && isFetchedOne) {
      getData();
    }
  });
  if (!isFetchedOne) {
    return <Loader />;
  }
  return (
    <div>
      <UpdateForm
        attributes={{
          title: dataOne.title,
          name: dataOne.name,
          style: dataOne.style,
        }}
        update={update}
      />
    </div>
  );
}
