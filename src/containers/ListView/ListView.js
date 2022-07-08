import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { get, isEmpty, isNil } from "lodash";
import DataIsEmpty from "../../components/DataIsEmpty";
import { useDispatch, useSelector } from "react-redux";
import Normalizer from "../../services/normalizr";
import ApiActions from "../../services/api/Actions";
import { decode, encode } from "js-base64";
import { useHistory } from "react-router-dom";

function ListView(props) {
  const history = useHistory();
  const [additions, setAdditions] = useState({
    page: 1,
    search: "",
    pageSize: 20,
    filter: "",
    selected: null,
    selectParams: null,
  });
  const onSearch = (search) => {
    const { page } = additions;
    setAdditions((state) => ({ ...state, search }));
    changeUrl({ page, search });
  };
  const onSelectFilter = ({ selected, param, value }) => {
    const { params: OwnParams } = props;
    const { page } = additions;
    setAdditions((state) => ({ ...state, selected, selectParams: param }));
    changeUrl({ page, selected, ...param, ...OwnParams });
  };
  const handlePagination = (page) => {
    const { params: OwnParams } = props;
    setAdditions((state) => ({ ...state, page }));
    changeUrl({ page, ...OwnParams });
  };
  const dispatch = useDispatch();
  let { storeName, scheme } = props;
  let data = useSelector((state) =>
    get(state, `normalize.data.${storeName}.result`, [])
  );
  const isFetched = useSelector((state) =>
    get(state, `normalize.data.${storeName}.isFetched`, false)
  );
  let meta = useSelector((state) =>
    get(state, `normalize.data.${storeName}.result._meta`, {})
  );
  const entities = useSelector((state) => get(state, "normalize.entities", []));
  data = get(Normalizer.Denormalize(data, scheme, entities), "data", []);
  const checkUrlEncode = () => {
    let { encoded, params } = props;
    const { page, pageSize } = additions;
    if (!isNil(encoded)) {
      encoded = decode(encoded);
      encoded = JSON.parse(encoded);
      const { page, pageSize, selectParams, selected, search } = encoded;
      setAdditions((state) => ({
        ...state,
        page,
        pageSize,
        selectParams,
        selected,
        search,
      }));
      getAllList({ ...encoded, page, pageSize, selected, search });
    } else {
      getAllList({ page, pageSize, ...params });
    }
  };
  const {
    CustomToolbar: Toolbar,
    CustomAsideFilter: FilterAside,
    ComponentHead: Head,
    ComponentBody: Body,
    CustomPagination: Pagination,
  } = props;
  const changeUrl = (urlParams) => {
    let { storeName, params, customUrl = null } = props;
    const { selectParams, selected, search } = additions;
    let argumentsUrl = { selectParams, selected, search, ...urlParams };
    argumentsUrl = encode(JSON.stringify(argumentsUrl));
    getAllList({ ...params, ...selectParams, ...urlParams });
    if (!isNil(customUrl)) {
      history.push(`/${customUrl}/${argumentsUrl}`);
    } else {
      history.push(`/${storeName}/${argumentsUrl}`);
    }
  };

  const getAllList = (params = {}) => {
    const { storeName, entityName, url, params: OwnParams, scheme } = props;
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName,
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url,
        config: {
          params: {
            ...params,
            ...OwnParams,
          },
        },
        scheme,
        storeName,
        entityName,
      },
    });
  };

  useEffect(() => {
    checkUrlEncode();
  }, []);
  const { selected } = additions;
  const { encoded } = props;
  return (
    <div className={"d-flex flex fixed-content"}>
      <FilterAside />
      <div className={"d-flex flex"} id={"content-body"}>
        <div className={"d-flex flex-column flex"} id={"user-list"}>
          <Toolbar
            encoded={encoded}
            onSelectFilter={onSelectFilter}
            selected={selected}
            onSearch={onSearch}
          />
          {isEmpty(data) && isFetched && <DataIsEmpty />}
          {isFetched ? (
            <>
              <div className="scroll-y mx-3 mb-0">
                <table className="table table-theme table-row v-middle">
                  <Head />
                  <Body data={data} />
                </table>
              </div>
              {!isEmpty(data) && isFetched && (
                <div className={"px-3 py-3 mt-auto"}>
                  <Pagination meta={meta} onChange={handlePagination} />
                </div>
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListView;
