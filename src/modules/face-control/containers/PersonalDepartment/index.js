import React, { Component } from "react";
import Chart from "../../components/drawChart/Chart";
import Tab from "../../components/Tab/Tab";
import PersonalTable from "./Table";
import { connect } from "react-redux";
import { get } from "lodash";
class PersonalDepartment extends Component {
  render() {
    let { drawMonthly, isFetched } = this.props;
  
    return (
      <Tab
        left={<PersonalTable drawTable={drawMonthly} isFetched={isFetched} />}
        center={
          <Chart
            drawChart={drawMonthly}
            isFetched={isFetched}
            onlyUser={true}
          />
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    drawMonthly: get(state, "face.data", []),
    isFetched: get(state, "face.isFetched", false)
  };
};

export default connect(mapStateToProps, null)(PersonalDepartment);
