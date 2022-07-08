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
import WorkflowTransition from "../../../schema/WorkflowTransition";
import Normalizer from "../../../services/normalizr";
export function UpdateContainer({ id, setOpenUpdateForm }) {
  const prevId = usePrevious(id);
  const dispatch = useDispatch();
  const entities = useSelector((state) => get(state, "normalize.entities"));
  const isFetchedOne = useSelector((state) =>
    get(state, "normalize.data.workflow-transition-update-one.isFetched")
  );
  const resultOne = useSelector((state) =>
    get(state, "normalize.data.workflow-transition-update-one.result")
  );
  const dataOne = Normalizer.Denormalize(
    resultOne,
    WorkflowTransition,
    entities
  );
  const getData = () => {
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `/workflow/transition/${id}`,
        scheme: WorkflowTransition,
        storeName: "workflow-transition-update-one",
        entityName: "workflowTransition",
      },
    });
  };

  const update = (attributes, formMethods) => {
    const url = `/workflow/transition/${id}`;
    const storeName = "workflow-transition-update";
    const entityName = "workflowTransition";
    const scheme = WorkflowTransition;
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
            attributes.setSubmitting(false);
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
              return item;
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
          rule_class: dataOne.rule_class,
          style: dataOne.style,
          end_rule_class: dataOne.end_rule_class,
          is_cert_agree: dataOne.is_cert_agree,
        }}
        update={update}
      />
    </div>
  );
}
