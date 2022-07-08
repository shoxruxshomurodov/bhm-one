import React from 'react';
import {get} from "lodash";
import {withRouter} from "react-router";
import ApplyCandidateFilesContainer from "../../containers/ApplyCandidateFilesContainer/ApplyCandidateFilesContainer";

const ApplyCandidateFilesPage = ({match ={}}) => {
    return (
        <>
            <ApplyCandidateFilesContainer candidate_id={get(match,'params.id',null)}/>
        </>
    );
};

export default withRouter(ApplyCandidateFilesPage);
