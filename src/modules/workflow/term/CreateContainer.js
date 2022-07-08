import React, {useEffect} from "react";
import {CreateForm} from "./CreateForm";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../services/api/Actions";
import {notification} from "antd";
import get from "lodash/get";
import WorkflowScheme from "../../../schema/Workflow";
import Normalizer from "../../../services/normalizr";
import WorkflowTermScheme from "../../../schema/WorkflowTerm";
import WorkflowProcessScheme from "../../../schema/WorkflowProcess";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";

export function CreateContainer({getData, setOpenCreateForm}) {
    const entities = useSelector((state) => get(state, "normalize.entities"));
    const isFetchedWorkflow = useSelector((state) =>
        get(state, "normalize.data.workflow-list.isFetched", false)
    );
    let resultWorkflow = useSelector((state) =>
        get(state, "normalize.data.workflow-list.result")
    );
    resultWorkflow = get(Normalizer.Denormalize(
        resultWorkflow,
        {data: [WorkflowScheme]},
        entities
    ), "data");
    const isFetchedProcess = useSelector((state) =>
        get(state, "normalize.data.workflow-process-list.isFetched", false)
    );
    let resultProcess = useSelector((state) =>
        get(state, "normalize.data.workflow-process-list.result")
    );
    resultProcess = get(Normalizer.Denormalize(
        resultProcess,
        {data: [WorkflowProcessScheme]},
        entities
    ), "data");
    const dispatch = useDispatch();
    const create = (attributes, formMethods) => {
        const url = "/monitoring/term";
        const storeName = "workflow-term-create";
        const entityName = "workflow-term";
        const scheme = WorkflowTermScheme;
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
                        formMethods.setSubmitting(false);
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
    const getAllWorkflow = () => {
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: `/workflow/workflow`,
                config: {
                    params: {
                        "per-page": 1000
                    },
                },
                scheme: {data: [WorkflowScheme]},
                storeName: "workflow-list",
                entityName: "workflow",
            },
        });
    }
    const getAllProcess = () => {
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: `/monitoring/process`,
                config: {
                    params: {
                        "per-page": 1000
                    },
                },
                scheme: {data: [WorkflowProcessScheme]},
                storeName: "workflow-process-list",
                entityName: "workflowProcess",
            },
        });
    }
    useEffect(() => {
        getAllWorkflow();
        getAllProcess();
    }, [])
    return (
        <CreateForm workflowList={resultWorkflow} processList={resultProcess} create={create} />
    );
}
