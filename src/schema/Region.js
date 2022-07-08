import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
	'value',
	{},
	{
		idAttribute: 'label',
	}
);
