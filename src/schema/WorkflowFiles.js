import Normalizer from "../services/normalizr";
import WorkflowStateScheme from "./WorkflowState";

export default Normalizer.SchemaEntity("workflow-process-file", {
    state: WorkflowStateScheme
});