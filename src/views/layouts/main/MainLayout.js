import React, {Component} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import "../../../assets/styles/main.css";
import "../../../assets/styles/style.css";
import {get} from "lodash";
import {withTranslation} from "react-i18next";
import actions from "../../../services/auth/actions";
import storage from "../../../services/storage";
import ActionLanguage from "../../../../src/services/store/actions/translation";
import Aside from "./components/Aside";
import Header from "./components/Header";
import ExitHome from "../../../components/SweetAlert/ExitHome";
import EnterHome from "../../../components/SweetAlert/EnterHome";
import LoginBgImage from "../../../assets/images/new_bg.jpg";

class MainLayout extends Component {
    componentDidMount() {
        const {welcomeHome} = this.props;
        welcomeHome();
    }
    changeUrl = (lang) => {
        const { changeLang, getTranslations } = this.props;
        changeLang(lang);
        getTranslations(lang);
    };
    render() {
        const {
            children,
            enter_home,
            isAuthenticated,
            exit_home,
            calcelGoodByeHome,
            goodByeHome,
            profile,
            lang,
            user,
        } = this.props;
        return (
            <div className="layout-row">
                <Aside user={user} goodByeHome={goodByeHome}/>
                <div id="main" className="layout-column flex">
                    <Header lang={lang} changeLang={this.changeUrl}/>
                    <div id="content" style={{
                        backgroundImage: 'url(' + LoginBgImage + ')',
                        backgroundRepeat:"no-repeat",
                        backgroundSize:"cover"
                    }} className="flex">
                        {children}
                    </div>
                </div>
                {enter_home && get(profile, "profile") && <EnterHome/>}
                {exit_home && isAuthenticated && (
                    <ExitHome calcelGoodByeHome={calcelGoodByeHome}/>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        enter_home: get(state, "auth.enter_home", false),
        exit_home: get(state, "auth.exit_home", false),
        isAuthenticated: get(state, "auth.isAuthenticated", false),
        mode: get(state, "page.mode", storage.get("mode")),
        user: get(state, "auth.user", {}),
        lang: get(state, "languageReducer.lang")
            ? get(state, "languageReducer.lang") : storage.get("lang") ? storage.get("lang") : "ru"
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        welcomeHome: () => dispatch({type: actions.WELCOME_HOME.REQUEST}),
        goodByeHome: () => dispatch({type: actions.GOOD_BYE_HOME.REQUEST}),
        calcelGoodByeHome: () =>
            dispatch({type: actions.CANCEL_GOOD_BYE_HOME.REQUEST}),
        changeLang: (lang) => {
            dispatch({
                type: ActionLanguage.CHANGE_LANG.REQUEST,
                payload: {
                    lang
                }
            });
        },
        getTranslations: (lang) => {
            dispatch({
                type: ActionLanguage.GET_TRANSLATIONS.REQUEST,
                payload: { lang }
            });
        },
    };
};
export default withTranslation("bhm_one")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(MainLayout))
);
