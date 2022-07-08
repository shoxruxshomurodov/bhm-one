import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
	'credit_type',
	{},
	{
		idAttribute: 'value',
	}
);
