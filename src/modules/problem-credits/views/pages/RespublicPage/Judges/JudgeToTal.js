import React, { Component } from "react";
import { connect } from "react-redux";
import { get ,orderBy} from "lodash";
import Pagination from "../../../../../../components/Pagination/Pagination";
import ApiActions from "../../../../../../services/api/Actions";
import RespublicTotalScheme from "../../../../../../schema/RespublicTotal";
import Normalizer from "../../../../../../services/normalizr";
import Table from "../../../../container/Respublic/components/Table/JudgeTotal";
import Loader from "../../../../../../components/Loader";
class RespublicToTal extends Component {
  componentDidMount() {
    const { callRender } = this.props;
    callRender({ page: 1 });
  }
  pagination = (page = 1) => {
    const { callRender } = this.props;
    callRender({ page });
  };
  render() {
    const { drawToTable, isFetched, meta, entities } = this.props;
    const drawToTable_result = orderBy(
      get(
        Normalizer.Denormalize(
          drawToTable,
          { data: [RespublicTotalScheme] },
          entities
        ),
        "data",
        []
      ),
      ["countRepublicLoans"],
      ["desc"]
    );
    return (
      <>
        {isFetched ? (
          <>
            <Table drawToTable={drawToTable_result} />
            <Pagination meta={meta} onChange={this.pagination} />
          </>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    drawToTable: get(state, "normalize.data.respublic_total.result", []),
    isFetched: get(state, "normalize.data.respublic_total.isFetched", false),
    meta: get(state, "normalize.data.respublic_total.result._meta", []),
    entities: get(state, "normalize.entities", [])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callRender: ({ page }) => {
      const storeName = "respublic_total";
      const entityName = "respublic_total";
      const scheme = { data: [RespublicTotalScheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "/problem-credit/juridic/republic-total",
          config: {
            params: {
              page
            }
          },
          scheme,
          storeName,
          entityName
        }
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RespublicToTal);
