import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
	'loan_status',
	{},
	{
		idAttribute: 'value',
	}
);
