import logo from "../web/logo.png";
import React from 'react';
const Header = () => {
        return (
            <div className="katm-header">
                <div className="katm-header-logo">
                    <img
                        src={logo}
                        alt="logo"
                    />
                </div>
                <div className="katm-header-info">
                    <div className="katm-info-title">
                        Кредитное бюро «Кредитно-информационный аналитический центр»<br/>
                        Credit bureau «Credit-information analytical center»
                    </div>

                    <ul className="katm-info-contacts">
                        <li>
                            <a className="katm--flex ai-center" href="https://infokredit.uz">
                                <svg
                                    className="katm-svg-icon"
                                    xmlns="https://www.w3.org/2000/svg"
                                    height="11px"
                                    viewBox="0 0 24 24"
                                    width="11px"
                                    fill="#000000"
                                >
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
                                    ></path>
                                </svg>

                                <span>infokredit.uz</span>
                            </a>
                        </li>
                        <li>
                            <a className="katm--flex ai-center" href="mailto:info@infokredit.uz">
                                <svg
                                    className="katm-svg-icon"
                                    xmlns="https://www.w3.org/2000/svg"
                                    height="11px"
                                    viewBox="0 0 24 24"
                                    width="11px"
                                    fill="#000000"
                                >
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                                    ></path>
                                </svg>

                                <span>info@infokredit.uz</span>
                            </a>
                        </li>
                        <li>
                            <a className="katm--flex ai-center" href="#">
                                <svg
                                    className="katm-svg-icon"
                                    xmlns="https://www.w3.org/2000/svg"
                                    height="11px"
                                    viewBox="0 0 24 24"
                                    width="11px"
                                    fill="#000000"
                                >
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                    ></path>
                                </svg>

                                <span>100027, город Ташкент, улица Коратош, дом 1</span>
                            </a>
                        </li>
                        <li>
                            <a className="katm--flex ai-center" href="tel:998951959902">
                                <svg
                                    className="katm-svg-icon"
                                    xmlns="https://www.w3.org/2000/svg"
                                    height="11px"
                                    viewBox="0 0 24 24"
                                    width="11px"
                                    fill="#000000"
                                >
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
                                    ></path>
                                </svg>

                                <span>+99871 203-47-47</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
}

export default Header;