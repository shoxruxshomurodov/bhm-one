import React, { Component } from "react";
import { request } from "../../services/api";
import { get } from "lodash";
import AsyncPaginate from 'react-select-async-paginate';
import { toast, ToastContainer } from "react-toastify";
import classNames from "classnames";
import {withTranslation} from "react-i18next";

class SelectAsyncPaginate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ?? null
    };
  }

  loadOptions = async (search, loadedOptions, { page }) => {
    let {
      attrSearch = "title",
      url,
      pageSize = 75,
      params,
      property,
      setDocuments = () => {}
    } = this.props;
    let config_request = {
      params: {
        search,
        page: page - 1,
        pageSize,
        ...params
      }
    };
    try {
      const response = await request.get(url, config_request);
      setDocuments(get(response,"data.data"))
      const options = get(response, "data.data").map((r) => {
        return {
          value: get(r, property[0]),
          label: `${get(r, property[2])} - ${get(r, property[1])}`
        };
      });
      return {
        options,
        hasMore: response.data._meta.loadMore,
        additional: {
          page: page + 1
        }
      };
    } catch (err) {
      toast.dismiss();
      toast.error(get(err, "message"), {
        position: "top-right",
        autoClose: 2000
      });
    }
  };
  setValue = (value) => {
    this.setState({
      ...this.state,
      value
    });
  };

  render() {
    const { value } = this.state;
    const { onChange, additional = { page: 1 }, name, property,classnames ,t,placeholder="Select"} = this.props;
    return (
      <>
        <AsyncPaginate
          loadOptions={this.loadOptions}
          onChange={(value) => {
            this.setValue(value);
            onChange(name, get(value, "value"));
          }}
          value={value}
          additional={additional}
          isDisabled={get(property, "disabled")}
          placeholder={t(placeholder)}
          className={classNames("form-control mr-0",classnames)}
        />
        <ToastContainer />
      </>
    );
  }
}

export default withTranslation("bhm_one")(SelectAsyncPaginate);
