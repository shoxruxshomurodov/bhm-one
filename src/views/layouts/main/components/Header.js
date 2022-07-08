import React, {useEffect} from "react";
import storage from "../../../../services/storage";
import uz from "../../../../assets/images/uz.png";
import ru from "../../../../assets/images/ru.svg";
import en from "../../../../assets/images/en.png";
import {isEqual} from "lodash";
const Header = ({changeLang, lang}) => {
    const fullScreenHandler = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };
    const zoomOut = () => {
        const nav = document.querySelector("#aside");
        if (nav.classList.contains("mini-size")) {
            nav.classList.remove("mini-size");
            storage.remove("mini-size")
        } else {
            nav.classList.add("mini-size");
            storage.set("mini-size", nav.classList.contains("mini-size"))
        }
    };
    useEffect(() => {
        const nav = document.querySelector("#aside");
        if (storage.get("mini-size")) {
            nav.classList.add("mini-size");
        }
    }, [])
    return (
        <div id="header" className="page-header bg-body sticky" data-class="bg-body">
            <div className="navbar navbar-expand-lg">{/* brand */} <a href="index.html"
                                                                      className="navbar-brand d-lg-none"
                                                                      data-pjax-state>
                <svg width={32} height={32} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor">
                    <g className="loading-spin" style={{transformOrigin: '256px 256px'}}>
                        <path
                            d="M200.043 106.067c-40.631 15.171-73.434 46.382-90.717 85.933H256l-55.957-85.933zM412.797 288A160.723 160.723 0 0 0 416 256c0-36.624-12.314-70.367-33.016-97.334L311 288h101.797zM359.973 134.395C332.007 110.461 295.694 96 256 96c-7.966 0-15.794.591-23.448 1.715L310.852 224l49.121-89.605zM99.204 224A160.65 160.65 0 0 0 96 256c0 36.639 12.324 70.394 33.041 97.366L201 224H99.204zM311.959 405.932c40.631-15.171 73.433-46.382 90.715-85.932H256l55.959 85.932zM152.046 377.621C180.009 401.545 216.314 416 256 416c7.969 0 15.799-.592 23.456-1.716L201.164 288l-49.118 89.621z"/>
                    </g>
                </svg>
                <span
                    className="hidden-folded d-inline l-s-n-1x d-lg-none">Basik</span>
            </a>{/* / brand */}{/* Navbar collapse */}
                <div className="collapse navbar-collapse order-2 order-lg-1" id="navbarToggler">
                    <form className="input-group m-2 my-lg-0">
                        <div className="input-group-prepend">
                            <button type="button" className="btn no-shadow no-bg px-0 text-inherit">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                     className="feather feather-search">
                                    <circle cx={11} cy={11} r={8}/>
                                    <line x1={21} y1={21} x2="16.65" y2="16.65"/>
                                </svg>
                            </button>
                        </div>
                        <span className="twitter-typeahead"
                              style={{position: 'relative', display: 'inline-block'}}><input
                            type="text" className="form-control no-border no-shadow no-bg typeahead tt-hint"
                            data-api="../assets/api/menu.json" readOnly autoComplete="off" spellCheck="false"
                            tabIndex={-1} style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            borderColor: 'transparent',
                            boxShadow: 'none',
                            opacity: 1,
                            background: 'none 0px 0px / auto repeat scroll padding-box border-box rgba(0, 0, 0, 0)'
                        }} dir="ltr"/><input type="text"
                                             className="form-control no-border no-shadow no-bg typeahead tt-input"
                                             placeholder="Search components..." data-api="../assets/api/menu.json"
                                             autoComplete="off" spellCheck="false" dir="auto"
                                             style={{
                                                 position: 'relative',
                                                 verticalAlign: 'top',
                                                 backgroundColor: 'transparent'
                                             }}/><pre
                            aria-hidden="true" style={{
                            position: 'absolute',
                            visibility: 'hidden',
                            whiteSpace: 'pre',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontVariant: 'normal',
                            fontWeight: 400,
                            wordSpacing: '0px',
                            letterSpacing: '0px',
                            textIndent: '0px',
                            textRendering: 'auto',
                            textTransform: 'none'
                        }}/><div className="dropdown-menu mt-3"
                                 style={{position: 'absolute', top: '100%', left: '0px', zIndex: 100, display: 'none'}}><div
                            className="tt-dataset tt-dataset-0"/></div></span></form>
                </div>
                <ul className="nav navbar-menu order-1 order-lg-2">
                    <li className="nav-item d-none d-sm-block" onClick={fullScreenHandler}><a className="nav-link px-2"
                                                                                              data-toggle="fullscreen"
                                                                                              data-pjax-state>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-maximize">
                            <path
                                d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                    </a></li>
                    <div>
                        <div className="dropdown">
                            <a className="mr-1" data-toggle="dropdown"
                               aria-expanded="false">
                                {isEqual(lang,"ru") &&  <img src={ru} alt={"ru"}/>}
                                {isEqual(lang,"uz") &&  <img src={uz} alt={"uz"}/>}
                                {isEqual(lang,"en") &&  <img src={en} alt={en}/>}
                            </a>
                            <div className="dropdown-menu bg-white" role="menu" x-placement="bottom-start" style={{
                                position: 'absolute',
                               transform: 'withTranslation3d(0px, 34px, 0px)',
                                top: '30px',
                                left: '-10px',
                                willChange: 'transform',
                                minWidth: "3rem",
                                textAlign: "center"
                            }}>
                                {lang !== "ru" ? (
                                    <li className={"cursor-pointer mb-2"}>
                                        <img onClick={() => {
                                            changeLang("ru");
                                        }} src={ru} alt={"ru"}/>
                                    </li>
                                ) : (
                                    ""
                                )}
                                {lang !== "uz" ? (
                                    <li className={"cursor-pointer mb-2"}>
                                        <img onClick={() => {
                                            changeLang("uz");
                                        }} alt={uz} src={uz}/>
                                    </li>
                                ) : (
                                    ""
                                )}
                                {lang !== "en" ? (
                                    <li className={"cursor-pointer mb-2"}>
                                        <img onClick={() => {
                                            changeLang("en");
                                        }} src={en} alt={"en"}/>
                                    </li>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <li className="nav-item cursor-pointer" onClick={zoomOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-menu">
                            <line x1={3} y1={12} x2={21} y2={12}/>
                            <line x1={3} y1={6} x2={21} y2={6}/>
                            <line x1={3} y1={18} x2={21} y2={18}/>
                        </svg>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
