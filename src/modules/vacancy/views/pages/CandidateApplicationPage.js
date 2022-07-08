import React from 'react';
import {withRouter} from "react-router";
import {get} from "lodash";
import CandidateApplicationContainer
    from "../../containers/CandidateApplicationContainer/CandidateApplicationContainer";

const CandidateApplicationPage = ({match,userCan}) => {
    return (
        <>
            <CandidateApplicationContainer userCan={userCan} candidate_id={get(match, 'params.id', null)}/>
        </>
    );
};

export default withRouter(CandidateApplicationPage);
