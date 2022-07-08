import user from "./User";
import transition from "./WorkflowTransition";
import state from "./WorkflowState";
import Normalizer from "../services/normalizr";

export default Normalizer.SchemaEntity("transitionFromState", {
  transition: transition,
  state: state,
  created_by: user,
  updated_by: user,
  deleted_by: user,
});
