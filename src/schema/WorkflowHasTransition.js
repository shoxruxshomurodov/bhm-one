import Normalizer from "../services/normalizr";
import user from "./User";
import workflow from "./Workflow";
import transition from "./WorkflowTransition";

export default Normalizer.SchemaEntity("workflowHasTransition", {
  workflow: workflow,
  transition: transition,
  created_by: user,
  updated_by: user,
  deleted_by: user,
});
