import React from 'react';
import ReactDOM from 'react-dom';
import Router from './services/router';
import Store from './services/store';
import Auth from './services/auth/rbac/Auth';
import I18n from './services/i18n/Provider';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import storage from './services/storage/index';
import * as moment from 'moment';
import i18n from './services/i18n';
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./services/web-vitals";
const i18nLang = i18n();

window.onload = function () {
	try {
		i18nLang.changeLanguage(storage.get("lang") ? storage.get("lang") : "ru");
		moment.locale(storage.get("lang") ? storage.get("lang") : "ru");
	} catch (e) {
		moment.locale("ru");
	}
};
ReactDOM.render(
	<Store>
		<I18n>
			<Auth>
				<Router />
			</Auth>
		</I18n>
	</Store>,
	document.getElementById('root')
);
serviceWorker.unregister();
reportWebVitals();