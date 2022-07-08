import Normalizer from '../services/normalizr';

export default Normalizer.SchemaEntity(
  'document',
  {},
  {
    idAttribute: 'id',
  }
);
