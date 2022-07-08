import React, { useState } from "react";
import AsyncPaginate from "react-select-async-paginate";
import { request } from "../../services/api";
import get from "lodash/get";
const SelectAsyncPaginate = (props) => {
  const [value, setValue] = useState(props.value ?? null);
  const { name = "title", perPage = 10, params = {}, defaultValue } = props;
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const { url } = props;
    const result = await request
      .get(url, {
        params: {
          "per-page": perPage,
          page,
          q: searchQuery,
          ...params,
        },
      })
      .then((response) => {
        return get(response, "data", {});
      });
    return {
      options: result.data,
      hasMore: result._meta.pageCount > page,
      additional: {
        page: page + 1,
      },
    };
  };
  const defaultAdditional = {
    page: 1,
  };
  const onChange = (option) => {
    if (typeof props.onChange === "function") {
      props.onChange(option);
    }
  };
  return (
    <AsyncPaginate
      value={value || defaultValue}
      loadOptions={loadOptions}
      getOptionValue={(option) => get(option, name)}
      getOptionLabel={(option) => get(option, name)}
      onChange={(value) => {
        setValue(value);
        onChange(value);
      }}
      isSearchable={true}
      placeholder={get(props, "placeholder", "")}
      additional={defaultAdditional}
      menuPlacement={"bottom"}
      className={props.className}
    />
  );
};

export default SelectAsyncPaginate;
