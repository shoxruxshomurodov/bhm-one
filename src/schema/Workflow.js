import Normalizer from "../services/normalizr";
import user from "./User";

export default Normalizer.SchemaEntity("workflow", {
  user,
});
