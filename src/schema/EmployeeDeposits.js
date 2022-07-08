import Normalizer from '../services/normalizr';

export default Normalizer.SchemaEntity(
    'employee-deposits',
    {},
    {
        idAttribute: 'account_code',
    }
);
