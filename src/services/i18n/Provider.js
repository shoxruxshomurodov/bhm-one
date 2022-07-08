import {I18nextProvider} from "react-i18next";
import configure from "../i18n/configure";
import React from 'react';

export default ({children}) => {
    return <I18nextProvider i18n={configure()}>
        {children}
    </I18nextProvider>
};
