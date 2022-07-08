import Normalizer from '../services/normalizr';
import user from './User';

export default Normalizer.SchemaEntity('token', {
	user: user
});
