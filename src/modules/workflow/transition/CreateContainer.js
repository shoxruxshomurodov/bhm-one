import * as React from "react";
import { CreateForm } from "./CreateForm";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import ApiActions from "../../../services/api/Actions";
import get from "lodash/get";
import WorkflowTransition from "../../../schema/WorkflowTransition";

export function CreateContainer({ setOpenCreateForm, getData }) {
  const dispatch = useDispatch();
  const create = (attributes, formMethods) => {
    const url = `/workflow/transition`;
    const storeName = "workflow-transition-create";
    const entityName = "workflowTransition";
    const scheme = WorkflowTransition;
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
      <CreateForm create={create} />
    </div>
  );
}
