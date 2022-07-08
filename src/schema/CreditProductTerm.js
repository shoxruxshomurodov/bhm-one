import user from "./User";
import creditProduct from "./CreditProduct";
import Normalizer from "../services/normalizr";

export default Normalizer.SchemaEntity("creditProductTerm", {
  user,
  creditProduct,
});
