import React, {Component} from 'react';
import {connect} from "react-redux";
import {get, isEmpty, keys, values} from "lodash";
import {withRouter} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import BaseSelect from "../../../../components/BaseSelect";
import Title from "../../../../components/Title/Title";
import BaseButton from "../../../../components/BaseButton";
import Region from "../../../../schema/Region";
import ApiActions from "../../../../services/api/Actions";
import Normalizer from "../../../../services/normalizr";
import Filial from "../../../../schema/Filial";
import BaseOverlayLoader from "../../../../components/BaseOverlayLoader";
import Candidate from "../../../../schema/Candidate";
import BarChart from "../../../../components/Chart/BarChart";
import Loader from "../../../../components/Loader";


class VacancyDashboardContainer extends Component {
    state = {
        region_code: null,
        filial_code: null,
        tableHeaderData: ['№', 'ID', 'Filial Code', 'Dep Code', 'Dep Name', 'Post id', 'amount', 'period', 'Post name', 'Apply'],
        loading: false
    };

    componentDidMount() {
        const {getRegions, getDashboardTrigger, getFilialsTrigger} = this.props;
        getRegions();
        getFilialsTrigger();
        getDashboardTrigger();
    }


    filterByRegion = (region_code) => {
        const {getFilials} = this.props;
        this.setState({region_code});
        getFilials({region_code});
    }

    filterByFilial = (filial_code) => {
        this.setState({filial_code});
    }

    getDashboard = () => {
        const {getDashboardDataByFilial} = this.props;
        const {filial_code} = this.state;
        if (filial_code) {
            getDashboardDataByFilial({filial_code});
        } else {
            toast.warn("Please select filial");
        }
    }

    render() {
        const {entities, regions, filials, dashboard, isFetched} = this.props;
        const {loading} = this.state;
        let regions_list = Normalizer.Denormalize(regions, [Region], entities);
        let filials_list = Normalizer.Denormalize(filials, [Filial], entities);
        const categories = keys(dashboard[0]) || [];
        const dashboard_data = values(dashboard[0]) || [];
        return (
            <BaseOverlayLoader isActive={loading} text={"Asynchronizing data from iabs..."}>
                <div className={"page-content padding"}>
                    <Title>Статистика</Title>
                    <div className="row">
                        <div className="col-md-12">
                            <ToastContainer/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <BaseSelect label={"Регион:"} options={regions_list} filterBy={this.filterByRegion}/>
                        </div>
                        <div className="col-md-2">
                            <BaseSelect placeholder={"Выберите филиал"} label={"Филиал:"} options={filials_list}
                                        filterBy={this.filterByFilial}/>
                        </div>
                        <div className="col-md-2 text-center">
                            <BaseButton className={"btn-info"}
                                        style={{marginRight: '15px', marginTop: '22px', height: '35px'}}
                                        handleBtn={this.getDashboard}>Поиск</BaseButton>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mt-3">
                                {isFetched ? ((!isEmpty(categories) || !isEmpty(dashboard_data)) ?
                                    <BarChart keys={categories} values={dashboard_data} dashboard={dashboard[1]}/> :
                                    <p className="search-data">Маълумот йўқ</p>) : <Loader/>}
                            </div>
                        </div>
                    </div>
                </div>
            </BaseOverlayLoader>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalize.entities', []),
        regions: get(state, 'normalize.data.region.result', []),
        filials: get(state, 'normalize.data.filial.result', []),
        dashboard: get(state, 'normalize.data.dashboard-data-list.result', {}),
        isFetched: get(state, 'normalize.data.dashboard-data-list.isFetched', false)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRegions: () => {
            const storeName = 'region';
            const entityName = 'region';
            const scheme = [Region];
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/collector/state/regions',
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getFilials: ({region_code}) => {
            const storeName = 'filial';
            const entityName = 'filial';
            const scheme = [Filial];
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/collector/state/banks',
                    config: {
                        params: {
                            region_code,
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getDashboardDataByFilial: ({filial_code: code}) => {
            const storeName = 'dashboard-data-list';
            const entityName = 'candidate';
            const scheme = {data: [Candidate]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/candidates/candidates/dashboard',
                    config: {
                        params: {
                            code
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getDashboardTrigger: () => {
            const storeName = 'dashboard-data-list';
            dispatch({
                type: ApiActions.GET_ALL.TRIGGER,
                payload: {
                    storeName,
                },
            });
        },
        getFilialsTrigger: () => {
            const storeName = 'filial';
            dispatch({
                type: ApiActions.GET_ALL.TRIGGER,
                payload: {
                    storeName,
                },
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VacancyDashboardContainer));