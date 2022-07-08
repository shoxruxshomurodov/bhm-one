import * as React from "react";
import { CreateForm } from "./CreateForm";
import { useDispatch, useSelector } from "react-redux";
import ApiActions from "../../../services/api/Actions";

import { notification } from "antd";
import get from "lodash/get";
import WorkflowHasTransition from "../../../schema/WorkflowHasTransition";
import Workflow from "../../../schema/Workflow";
import { useEffect } from "react";
import Normalizer from "../../../services/normalizr";
import WorkflowTransition from "../../../schema/WorkflowTransition";
export function CreateContainer({ setOpenCreateForm, getData }) {
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const workflowResultList = useSelector((state) =>
    get(state, "normalize.data.workflow-type-list.result")
  );
  const workflowTransitionResult = useSelector((state) =>
    get(state, "normalize.data.workflow-transition-list.result")
  );
  const workflowListData = Normalizer.Denormalize(
    workflowResultList,
    { data: [Workflow] },
    entities
  );
  const workflowTransitionDataList = Normalizer.Denormalize(
    workflowTransitionResult,
    { data: [WorkflowTransition] },
    entities
  );
  const workflowTypeData = get(workflowListData, "data");
  const workflowTransitionData = get(workflowTransitionDataList, "data");

  const getWorkflowData = () => {
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `workflow/workflow`,
        config: {
          params: {
            "per-page": 100,
          },
        },
        scheme: { data: [Workflow] },
        storeName: "workflow-type-list",
        entityName: "workfow-type",
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
  console.log(workflowTransitionData, "workflowTransitionData");
  useEffect(() => {
    getWorkflowData();
    getWorkflowTransitionData();
  }, []);

  const create = (attributes, formMethods) => {
    const url = `/workflow/workflow-has-transition`;
    const storeName = "workflow-transition-create";
    const entityName = "workflowTransition";
    const scheme = WorkflowHasTransition;
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
            getWorkflowData();
            getWorkflowTransitionData();
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
        workflowType={workflowTypeData}
        transition_list={workflowTransitionData}
      />
    </div>
  );
}
