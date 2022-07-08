import React, {Component} from 'react';
import actions from "../../appeal/actions";
import {get, isEmpty,isNil} from "lodash";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Title from "../../../components/Title/Title";
import BaseTable from "../../../components/BaseTable";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader";
import Region from "../../../schema/Region";
import ApiActions from "../../../services/api/Actions";
import Filial from "../../../schema/Filial";
import Normalizer from "../../../services/normalizr";
import BaseSelect from "../../../components/BaseSelect";
import BaseButton from "../../../components/BaseButton";
import moment from "moment";
import {DatePicker} from "antd";


class AppealContainer extends Component {

    state = {
            currentPage:1,
            region_code: null,
            filial_code: null,
            status:null,
        begin:null,
        end:null,
        nps:null
        }
    componentDidMount() {
        const {getAppeal,getRegions} = this.props;
        getRegions();
        getAppeal({});
    }

    pagination = (page = 1) => {
        const {getAppeal} = this.props;
        this.setState({currentPage:page})
        getAppeal({});
    }

    filterByRegion = (region_code) => {
        const {getFilials} = this.props;
        this.setState({region_code});
        getFilials({region_code});
    }

    filterByFilial = (filial_code) => {
        const {getAppeal} = this.props;
        this.setState({filial_code});
        getAppeal({
            params:{
                filial_code:filial_code
            }
        });
    }
    filterByPhone = (phone) => {
        const {getAppeal} = this.props;
        getAppeal({
            params: {
                phone
            }
        });
    }
    datePickerHandler = (name,date) => {
        const {getAppeal} = this.props;
        getAppeal({
            params: {
                date : date/1000
            }
        });
    };
    btnDepartmentList = () => {
        const { getDepartment } = this.props;
        const { period } = this.state;
        getDepartment({ period });
    };

    getFilteredMonitoring = () => {
            const {getMonitoring} = this.props;
            const {filial_code,status,begin,end,nps} = this.state
        getMonitoring({
            params: {
                mfo:filial_code,
                status,
                begin,
                end,
                nps
            }
        });
    }
    render() {
        let {entities,regions, filials,appeal, _meta, isFetched,t,history,id} = this.props;
        const {currentPage,filial_code,status} = this.state;
        regions = Normalizer.Denormalize(regions, [Region], entities);
        filials = Normalizer.Denormalize(filials, [Filial], entities);
        console.log(regions,"regions")
        const meta = {currentPage,totalCount:get(_meta,"totalElements"),perPage:get(_meta,"pageable.pageSize")}

        return (
            <div className={"page-content padding"}>
                <div className="row">
                    <div className="col-md-12">
                        <Title>{t("ТАКЛИФ ВА МУРОЖААТЛАР")}</Title>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2"><BaseSelect label={"Регион:"} options={regions}
                                                          filterBy={this.filterByRegion}/></div>
                    <div className="col-md-2">
                        <BaseSelect placeholder={"Выберите филиал"} label={"Филиал:"} options={filials}
                                    filterBy={this.filterByFilial}/>
                    </div>
                    <div className="col-md-2">
                        <label>Phone:</label>
                        <input className="form-control"  onChange={(e) => this.filterByPhone(e.target.value)}
                               placeholder="Phone"/>
                    </div>
                    <div className="col-md-2">
                        <label>Date:</label>
                        <DatePicker
                            style={{ marginTop: '20px', height: '38px',marginRight:'10px' }}
                            defaultValue={moment(new Date(), "DD.MM.YYYY hh:mm:ss")}
                            allowClear={false}
                            onChange={(_data, period) => {
                                this.datePickerHandler("begin",moment(period, "YYYY-MM-DD hh:mm:ss").valueOf());
                            }}
                            picker={"day"}
                        />
                    </div>
                    <div className="col-md-2 text-center">
                        <BaseButton className={"btn-info"}
                                    style={{marginRight: '15px', marginTop: '22px', height: '35px'}}
                                    disabled={(!isNil(filial_code) || !isNil(status)) ? false : true}
                                    handleBtn={this.getFilteredMonitoring}>Поиск</BaseButton>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            isFetched
                                ?
                                <>
                                    {
                                        !isEmpty(appeal) ? <>
                                            <BaseTable head={[ 'Филиал код','ФИО', 'Phone', 'Message','Date' ]}
                                                       className={"mt-3"}>
                                                {
                                                    appeal && appeal.map((requests, index,createdAt) => <tr
                                                        key={index}
                                                        style={{verticalAlign: 'middle'}} onDoubleClick={() => history.push(`/appeal/view/${get(requests,"id")}`)}>
                                                        <td>{get(requests,"filial_code")}</td>
                                                        <td>{get(requests,"full_name")}</td>
                                                        <td>{get(requests,"phone")}</td>
                                                        <td>{get(requests,"message")}</td>
                                                        <td>{moment(get(requests, 'created_at')*1000).format('DD.MM.YYYY')}</td>

                                                    </tr>)
                                                }
                                            </BaseTable>
                                            <Pagination meta={meta} onChange={this.pagination}/>
                                        </> : <p className="search-data">Маълумот
                                            йўқ</p>
                                    }
                                </>
                                : <Loader/>
                        }
                    </div>
                </div>
            </div>
        );
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
        getAppeal: (params) => {
            dispatch({type: actions.GET_APPEAL.REQUEST, payload: params});
        },
    };
};

const mapStateToProps = (state) => {
    return {
        regions: get(state, 'normalize.data.region.result', []),
        filials: get(state, 'normalize.data.filial.result', []),
        appeal: get(state, "appeal.appeal", []),
        isFetched: get(state, "appeal.isFetched", false),
        _meta: get(state, "katm._meta", {}),
        entities: get(state, 'normalize.entities', []),
    };
};
export default withTranslation("bhm_one")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AppealContainer)));
