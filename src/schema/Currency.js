import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
    'currency',
    {},
    {
        idAttribute: 'code',
    }
);

