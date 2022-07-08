import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
	'select_employee',
	{},
	{
		idAttribute: 'value',
	}
);
