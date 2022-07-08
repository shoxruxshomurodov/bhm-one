import React from 'react';
import CurrencyRatesUpdateContainer from "../../containers/CurrencyRatesUpdateContainer";
import {withRouter} from "react-router";
import {get} from "lodash";

const CurrencyRatesUpdatePage = ({match}) => {
    return (
        <>
         <CurrencyRatesUpdateContainer id={get(match,'params.id',null)} />
        </>
    );
};


export default withRouter(CurrencyRatesUpdatePage);
