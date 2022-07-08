import Normalizer from "../services/normalizr";
import WorkflowStateScheme from "./WorkflowState";
import WorkflowFilesScheme from "./WorkflowFiles";

export default Normalizer.SchemaEntity("workflow-process-file-state", {
    state: WorkflowStateScheme,
    file: WorkflowFilesScheme
});