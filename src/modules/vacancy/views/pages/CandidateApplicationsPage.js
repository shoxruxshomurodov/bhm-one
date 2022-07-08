import React from 'react';
import {withRouter} from "react-router";
import CandidateApplicationsContainer
    from "../../containers/CandidateApplicationsContainer/CandidateApplicationsContainer";

const CandidateApplicationsPage = ({userCan}) => {
    return (
        <>
            <CandidateApplicationsContainer userCan={userCan} />
        </>
    );
};

export default withRouter(CandidateApplicationsPage);
