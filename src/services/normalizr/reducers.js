import actions from "./actions";
import ApiActions from "../api/Actions";
import { get, isEqual } from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.NORMALIZE.REQUEST:
      return ((action, state) => {
        const { storeName } = action.payload;
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              ...get(state, `data.${storeName}`, {}),
              isFetched: false,
            },
          },
        };
      })(action, state);
    case actions.NORMALIZE.SUCCESS:
      return ((action, state) => {
        const { entities, result, storeName, entityName } = action.payload;
        const entitiesKeys = Object.keys(entities);
        let _entities_ = get(state, "entities", {});
        let entities_ = get(state, "entities", {});

        if (entitiesKeys.length > 0) {
          entitiesKeys.map((_entityName_) => {
            return (_entities_[_entityName_] = {
              ...entities_[_entityName_],
              ...entities[_entityName_],
            });
          });
        }
        return {
          ...state,
          entities: {
            ...get(state, "entities"),
            ..._entities_,
          },
          data: {
            ...get(state, "data", {}),
            [storeName]: { result, isFetched: true, entityName },
          },
        };
      })(action, state);
    case actions.NORMALIZE.FAILURE:
      return (() => {
        const { storeName, errors } = action.payload;
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              isFetched: true,
              hasErrors: true,
              errors,
            },
          },
        };
      })();
    case actions.NORMALIZE.TRIGGER:
      return (() => {
        const { storeName } = action.payload;
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              isFetched: false,
            },
          },
        };
      })();

    case ApiActions.OPERATION_DELETE.SUCCESS:
      return ((action, state) => {
        const { id, storeName, entityName } = action.payload;
        let result = get(state, `data.${storeName}.result.content`, []);
        if (result && id) {
          result = get(state, `data.${storeName}.result.content`, []).filter(
            (item) => !isEqual(item, id)
          );
        }
        return {
          ...state,
          data: {
            [storeName]: {
              result: { content: result },
              isFetched: true,
              entityName,
            },
          },
        };
      })(action, state);

    case ApiActions.OPERATION_ADD.SUCCESS:
      return ((action, state) => {
        const { result, storeName, entityName } = action.payload;
        let data = get(state, `data.${storeName}.result.content`, []);
        if (result) {
          data = [
            ...get(state, `data.${storeName}.result.content`, []),
            result,
          ];
        }
        return {
          ...state,
          data: {
            [storeName]: {
              result: { content: data },
              isFetched: true,
              entityName,
            },
          },
        };
      })(action, state);
    default:
      return state;
  }
};
