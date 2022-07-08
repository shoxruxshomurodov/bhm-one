import * as React from "react";
import { CreateForm } from "./CreateForm";
import { useDispatch, useSelector } from "react-redux";
import ApiActions from "../../../services/api/Actions";
import { notification } from "antd";
import get from "lodash/get";
import TransitionFromState from "../../../schema/TransitionFromState";
import WorkflowTransition from "../../../schema/WorkflowTransition";
import Workflow from "../../../schema/Workflow";
import { useEffect } from "react";
import Normalizer from "../../../services/normalizr";
import WorkflowState from "../../../schema/WorkflowState";
export function CreateContainer({ getData, setOpenCreateForm }) {
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const workflowResultList = useSelector((state) =>
    get(state, "normalize.data.workflow-state-list.result")
  );
  const workflowTransitionResult = useSelector((state) =>
    get(state, "normalize.data.workflow-transition-list.result")
  );
  const workflowListData = Normalizer.Denormalize(
    workflowResultList,
    { data: [WorkflowState] },
    entities
  );
  const workflowTransitionDataList = Normalizer.Denormalize(
    workflowTransitionResult,
    { data: [WorkflowTransition] },
    entities
  );
  const stateList = get(workflowListData, "data");
  const workflowTransitionData = get(workflowTransitionDataList, "data");

  const getWorkflowData = () => {
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `workflow/state`,
        config: {
          params: {
            "per-page": 100,
          },
        },
        scheme: { data: [WorkflowState] },
        storeName: "workflow-state-list",
        entityName: "workflowState",
      },
    });
  };

  const getWorkflowTransitionData = () => {
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `workflow/transition`,
        config: {
          params: {
            "per-page": 100,
          },
        },
        scheme: { data: [WorkflowTransition] },
        storeName: "workflow-transition-list",
        entityName: "workfow-transition",
      },
    });
  };
  useEffect(() => {
    getWorkflowData();
    getWorkflowTransitionData();
  }, []);

  const create = (attributes, formMethods) => {
    const url = "/workflow/transition-from-state";
    const storeName = "transaction-from-state-create";
    const entityName = "transitionFromState";
    const scheme = TransitionFromState;
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
            setOpenCreateForm(false);
            formMethods.setSubmitting(false);
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

  return (
    <div>
      <CreateForm
        create={create}
        state_list={stateList}
        transaction_list={workflowTransitionData}
      />
    </div>
  );
}
