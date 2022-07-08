import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import Normalizer from "../../../services/normalizr";
import { usePrevious } from "react-use";
import { UpdateForm } from "./UpdateForm";
import ApiActions from "../../../services/api/Actions";
import { notification } from "antd";
import Loader from "../../../components/Loader";
import Workflow from "../../../schema/Workflow";
import WorkflowTransition from "../../../schema/WorkflowTransition";
import WorkflowHasTransition from "../../../schema/WorkflowHasTransition";
export function UpdateContainer({ id }) {
  const prevId = usePrevious(id);
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedOne = useSelector((state) =>
    get(state, "normalize.data.workflow-has-transition-update-one.isFetched")
  );
  const resultOne = useSelector((state) =>
    get(state, "normalize.data.workflow-has-transition-update-one.result")
  );
  const dataOne = Normalizer.Denormalize(
    resultOne,
    WorkflowHasTransition,
    entities
  );

  const resultWorkflowList = useSelector((state) =>
    get(state, "normalize.data.workflow-type-select.result")
  );
  const resultWorkflowListData = Normalizer.Denormalize(
    resultWorkflowList,
    { data: [Workflow] },
    entities
  );
  const resultWorkflowData = get(resultWorkflowListData, "data", []);

  const resultTransitionList = useSelector((state) =>
    get(state, "normalize.data.workflow-transition-select.result")
  );
  const resultTransitionListData = Normalizer.Denormalize(
    resultTransitionList,
    { data: [WorkflowTransition] },
    entities
  );
  const resultTransitionData = get(resultTransitionListData, "data", []);

  const getData = () => {
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/workflow/workflow-has-transition/${id}`,
        config: {
          params: {
            include: "transition,workflow",
          },
        },
        scheme: WorkflowHasTransition,
        storeName: "workflow-has-transition-update-one",
        entityName: "workflowHasTransition",
      },
    });
  };

  const getWorkflowTypeData = () => {
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/workflow/workflow`,
        config: {
          params: {
            "per-page": 100,
          },
        },
        scheme: { data: [Workflow] },
        storeName: "workflow-type-select",
        entityName: "workflowType",
      },
    });
  };

  const getWorkflowTransitionData = () => {
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/workflow/transition`,
        config: {
          params: {
            "per-page": 100,
          },
        },
        scheme: { data: [WorkflowTransition] },
        storeName: "workflow-transition-select",
        entityName: "workflowTransition",
      },
    });
  };

  const update = (attributes, formMethods) => {
    dispatch({
      type: ApiActions.OPERATION_UPDATE.REQUEST,
      payload: {
        id,
        attributes,
        formMethods,
        cb: {
          success: (nData, data) => {
            notification["success"]({
              message: "Успешно",
              description: "Изменено",
              placement: "topLeft",
            });
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
    getWorkflowTypeData();
    getWorkflowTransitionData();
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
          workflow_id: dataOne.workflow_id,
          transition_id: dataOne.transition_id,
        }}
        update={update}
        workflow_list={resultWorkflowData}
        transition_list={resultTransitionData}
      />
    </div>
  );
}
