import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
    'book',
    {},
    {
        idAttribute: 'id',
    }
);
