import React from 'react';
import ApplyCandidateApplicationContainer
    from "../../containers/ApplyCandidateApplicationContainer/ApplyCandidateApplicationContainer";
import {withRouter} from "react-router-dom";
import {get} from "lodash";

const ApplyCandidateApplicationPage = ({match}) => {
    console.log('Match',match)
    return (
        <>
            <ApplyCandidateApplicationContainer vacancy_id={get(match, 'params.id', null)}/>
        </>
    );
};

export default withRouter(ApplyCandidateApplicationPage);
