import React from 'react';
import CurrencyRatesViewContainer from "../../containers/CurrencyRatesViewContainer";
import {withRouter} from "react-router";
import {get} from "lodash";

const CurrencyRatesViewPage = ({match}) => {
    return (
        <CurrencyRatesViewContainer currency_id={get(match,'params.id',null)} />
    );
};


export default withRouter(CurrencyRatesViewPage);
