import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
	'loan',
	{},
	{
		idAttribute: 'loan_id',
	}
);
