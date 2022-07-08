import React, {Component} from 'react';
import {connect} from "react-redux";
import Hat from "../../../../components/Hat/Hat";
import Select from "../../../../components/Select/Select";


class VacancyContainer extends Component {
    render() {
        return (
            <>
                <Hat name="All vacancies" />
                <div className="row">
                    <div className="col-3">
                        <Select />
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(VacancyContainer);