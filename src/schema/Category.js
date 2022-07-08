import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
	'category',
	{},
	{
		idAttribute: 'value',
	}
);
