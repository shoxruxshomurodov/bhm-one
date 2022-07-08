import Normalizer from '../services/normalizr';
export default Normalizer.SchemaEntity(
    'task',
    {},
    {
        idAttribute: 'id',
    }
);
