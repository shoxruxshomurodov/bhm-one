import Normalizer from '../services/normalizr';

export default Normalizer.SchemaEntity(
    'product',
    {},
    {
        idAttribute: 'id',
    }
);
