import * as React from "react";
import { useEffect } from "react";
import ApiActions from "../../../services/api/Actions";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { usePrevious } from "react-use";
import { UpdateForm } from "./UpdateForm";
import { notification } from "antd";
import WorkflowStateScheme from "../../../schema/WorkflowState";
import WorkflowTransitionScheme from "../../../schema/WorkflowTransition";
import Loader from "../../../components/Loader";
import TransitionFromState from "../../../schema/TransitionFromState";
import Normalizer from "../../../services/normalizr";
export function UpdateContainer({ id, getAll, setOpenUpdateForm }) {
  const prevId = usePrevious(id);
  const dispatch = useDispatch();

  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedOne = useSelector((state) =>
    get(state, "normalize.data.transition-from-state-update-one.isFetched")
  );

  const resultOne = useSelector((state) =>
    get(state, "normalize.data.transition-from-state-update-one.result")
  );
  const dataOne = Normalizer.Denormalize(
    resultOne,
    TransitionFromState,
    entities
  );

  const resultStateList = useSelector((state) =>
    get(state, "normalize.data.workflow-state-select.result")
  );
  const resultStateListData = Normalizer.Denormalize(
    resultStateList,
    { data: [WorkflowStateScheme] },
    entities
  );
  const resultStateData = get(resultStateListData, "data", []);

  const resultTransitionList = useSelector((state) =>
    get(state, "normalize.data.workflow-transition-select.result")
  );
  const resultTransitionListData = Normalizer.Denormalize(
    resultTransitionList,
    { data: [WorkflowTransitionScheme] },
    entities
  );
  console.log(resultTransitionListData, "resultTransitionListData");
  const resultTransitionData = get(resultTransitionListData, "data", []);
  console.log(resultTransitionData, "resultTransitionData");
  const getData = () => {
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/workflow/transition-from-state/${id}`,
        config: {
          params: {
            include: "transaction,state",
          },
        },
        scheme: TransitionFromState,
        storeName: "transition-from-state-update-one",
        entityName: "transitionFromState",
      },
    });
  };

  const getWorkflowStateTypeData = () => {
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/workflow/state`,
        config: {
          params: {
            "per-page": 100,
          },
        },
        scheme: { data: [WorkflowStateScheme] },
        storeName: "workflow-state-select",
        entityName: "workflowState",
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
        scheme: { data: [WorkflowTransitionScheme] },
        storeName: "workflow-transition-select",
        entityName: "workflowTransition",
      },
    });
  };

  const update = (attributes, formMethods) => {
    const url = `/workflow/transition-from-state/${id}`;
    const storeName = "workflow-transition-from-state-update";
    const entityName = "transitionFromState";
    const scheme = TransitionFromState;
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
            setOpenUpdateForm(false);
            formMethods.setSubmitting(false);
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
    getWorkflowStateTypeData();
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
        attributes={dataOne}
        update={update}
        state_list={resultStateData}
        transition_list={resultTransitionData}
      />
    </div>
  );
}
