import React from 'react';
import {useParams} from "react-router";
import LoanView from "../../component/checkpoint/LoanView";

function RegionPurposeView() {
    const {id} = useParams();
    return (
        <LoanView id={id}/>
    );
}

export default RegionPurposeView;