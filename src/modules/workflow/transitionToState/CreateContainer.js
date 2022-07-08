import * as React from "react";
import { CreateForm } from "./CreateForm";
import { useDispatch, useSelector } from "react-redux";
import ApiActions from "../../../services/api/Actions";
import { notification } from "antd";
import get from "lodash/get";
import Normalizer from "../../../services/normalizr";
import WorkflowState from "../../../schema/WorkflowState";
import WorkflowTransition from "../../../schema/WorkflowTransition";
import { useEffect } from "react";
import TransitionToState from "../../../schema/TransitionToState";
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
    const url = "/workflow/transition-to-state";
    const storeName = "transaction-to-state-create";
    const entityName = "transitionToState";
    const scheme = TransitionToState;
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
            formMethods.setSubmitting(false);
            setOpenCreateForm(false);
            // getWorkflowData();
            // getWorkflowTransitionData();
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
