import React, {Component} from 'react';
import actions from "../../language/actions";
import {get, isEmpty} from "lodash";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {withTranslation} from "react-i18next";
import TemplateTable from "../../../components/TemplateTable";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader";
import Toolbar from "../../../components/Toolbar";
import FilterAside from "../../../components/FilterAside";

class MessageContainer extends Component {
    state = {
        name:""
    }
    componentDidMount() {
        const {getAllLanguages} = this.props;
        getAllLanguages({});
    }

    pagination = (page = 1) => {
        const {getAllLanguages} = this.props;
        getAllLanguages({
            params: {
                page
            }
        });
    }
    sendName = (name) => {
        this.setState({name})
        const {  getAllLanguages } = this.props;
        const { nextPage } = 0;
        const {  test } = this.props;
        return getAllLanguages({params: {
                page: nextPage,
                test
            },
            name
        })
    }


    render() {
        const {messages, meta, history, isFetched,t} = this.props
        return (
            <div className={"d-flex flex fixed-content"}>
                <FilterAside title={"Language"}>
                    <div className="scrollable hover">
                        <div className="sidenav p-2">
                            <nav className="nav-active-text-primary" data-nav>
                                <ul className="nav">
                                    <li><a href="app.user.html#all" data-pjax-state><span className="nav-text">All</span>
                                        <span
                                            className="nav-badge"><b className="badge badge-sm badge-pill gd-danger">15</b></span></a>
                                    </li>
                                    <li><a href="app.user.html#company" data-pjax-state><span
                                        className="nav-text">Company</span> <span
                                        className="nav-badge"><b className="badge badge-sm badge-pill gd-info">3</b></span></a>
                                    </li>
                                    <li><a href="app.user.html#personal" data-pjax-state><span
                                        className="nav-text">Personal</span></a></li>
                                    <li><a href="app.user.html#team" data-pjax-state><span className="nav-text">Team</span></a>
                                    </li>
                                    <li className="nav-header hidden-folded mt-2"><span
                                        className="d-block pt-1 text-sm text-muted">Tags</span></li>
                                    <li><a href="app.user.html#client" data-pjax-state><span className="mx-2"><b
                                        className="badge badge-circle sm text-primary"/> </span><span
                                        className="nav-text">Clients</span></a>
                                    </li>
                                    <li><a href="app.user.html#supplier" data-pjax-state><span className="mx-2"><b
                                        className="badge badge-circle sm text-info"/> </span><span
                                        className="nav-text">Suppliers</span></a>
                                    </li>
                                    <li><a href="app.user.html#competitor" data-pjax-state><span className="mx-2"><b
                                        className="badge badge-circle sm text-success"/> </span><span
                                        className="nav-text">Competitors</span></a>
                                    </li>
                                    <li><a href="app.user.html#corp" data-pjax-state><span className="mx-2"><b
                                        className="badge badge-circle sm text-warning"/> </span><span
                                        className="nav-text">Corps</span></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </FilterAside>
                <div className={"d-flex flex mt-4"} id={"content-body"}>
                    <div className={"d-flex flex-column flex"} id={"user-list"}>
                        <Toolbar classname={"mx-2"}>
                            <>
                                <form className="flex">
                                    <div className="input-group">
                                        <input type="text" className="form-control form-control-theme form-control-sm search" onChange={(e) => this.sendName(e.target.value)}
                                               placeholder={t("Search")}/>
                                        <span
                                        className="input-group-append"><button
                                        className="btn btn-white no-border btn-sm" type="button"><span
                                        className="d-flex text-muted"><svg
                                        xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-search"><circle cx={11} cy={11} r={8}/><line x1={21}
                                                                                                                y1={21}
                                                                                                                x2="16.65"
                                                                                                                y2="16.65"/></svg></span></button></span>
                                    </div>
                                </form>
                            </>
                        </Toolbar>

                        {
                            isFetched
                                ?
                                <>
                                    {
                                        !isEmpty(messages) ? <>
                                            <TemplateTable head={['ID', 'withTranslation text', 'RU', 'ЎЗ', 'EN', 'UZ']}
                                                       >
                                                {
                                                    messages && messages.map((message, index) => <tr
                                                        key={index}
                                                        style={{verticalAlign: 'middle'}}
                                                        onDoubleClick={() => history.push(`/language/update/${message.id}`)}>
                                                        <td>{message.id}</td>
                                                        <td>{message.message}</td>
                                                        {
                                                            message.messages && message.messages.map((m) =>
                                                                <td>{m.translation}</td>
                                                            )
                                                        }
                                                    </tr>)
                                                }
                                            </TemplateTable>
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
        getAllLanguages: ({params, name}) => {
            dispatch({type: actions.GET_LANGUAGE.TRIGGER});
            dispatch({type: actions.GET_LANGUAGE.REQUEST, payload: {params,name}});
        },

    };
};

const mapStateToProps = (state) => {
    return {
        messages: get(state, "message.messages.data", []),
        entities: get(state, "normalize.entities", {}),
        isFetched: get(state, "message.isFetched", false),
        meta: get(state, "message._meta", {})
    };
};
export default withTranslation("bhm_one")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MessageContainer)));
