import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
    'employee',
    {},
    {
        idAttribute: 'id',
    }
);
