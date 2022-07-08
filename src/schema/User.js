import Normalizer from "../services/normalizr";
import token from "./Token";

export default Normalizer.SchemaEntity("user", {
  lastToken: token,
});
