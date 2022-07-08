import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
	'problem_credit',
	{},
	{
		idAttribute: 'LOAN_ID',
	}
);
