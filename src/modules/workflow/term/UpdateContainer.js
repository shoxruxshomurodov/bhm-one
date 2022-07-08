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
import Normalizer from "../../../services/normalizr";
import WorkflowTermScheme from "../../../schema/WorkflowTerm";
import WorkflowScheme from "../../../schema/Workflow";
import WorkflowProcessScheme from "../../../schema/WorkflowProcess";
export function UpdateContainer({ id, getAll,setOpenUpdateForm }) {
    const prevId = usePrevious(id);
    const dispatch = useDispatch();
    const entities = useSelector((state) => get(state, "normalize.entities"));
    const isFetchedOne = useSelector((state) =>
        get(state, "normalize.data.workflow-term-update-one.isFetched")
    );
    const resultOne = useSelector((state) =>
        get(state, "normalize.data.workflow-term-update-one.result")
    );
    const dataOne = Normalizer.Denormalize(resultOne, WorkflowTermScheme, entities);

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
    const getData = () => {
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/monitoring/term/${id}`,
                config: {
                    params:{
                        include:"workflow,process"
                    }
                },
                scheme: WorkflowTermScheme,
                storeName: "workflow-term-update-one",
                entityName: "workflow-term",
            },
        });
    };

    const update = (attributes, formMethods) => {
        const url = `/monitoring/term/${id}`;
        const storeName = "workflow-term-update";
        const entityName = "workflow-term";
        const scheme = WorkflowTermScheme;
        dispatch({
            type: ApiActions.OPERATION_UPDATE.REQUEST,
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
                            description: "Изменено",
                            placement: "topLeft",
                        });
                        getAll();
                        setOpenUpdateForm(false)
                        formMethods.setSubmitting(false)
                    },
                    fail: (e) => {
                        formMethods.setSubmitting(false)
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
        getData();
        getAllWorkflow();
        getAllProcess();
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
        <UpdateForm workflowList={resultWorkflow} processList={resultProcess} isFetchedProcess={isFetchedProcess} isFetchedWorkflow={isFetchedWorkflow} attributes={dataOne} update={update} />
    );
}
