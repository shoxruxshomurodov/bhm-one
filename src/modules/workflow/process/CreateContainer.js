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
import WorkflowProcess from "../../../schema/WorkflowProcess";
export function CreateContainer({ getData,setOpenCreateForm }) {
  const dispatch = useDispatch();
  const create = (attributes, formMethods) => {
    const url = "/monitoring/process";
    const storeName = "workflow-process-create";
    const entityName = "workflowProcess";
    const scheme = WorkflowProcess;
    dispatch({
      type: ApiActions.OPERATION_ADD.REQUEST,
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
              description: "Создано",
              placement: "topRight",
            });
            getData();
            setOpenCreateForm(false);
            formMethods.setSubmitting(false)
          },
          fail: (e) => {
            formMethods.setSubmitting(false)
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
      <CreateForm create={create} />
  );
}
