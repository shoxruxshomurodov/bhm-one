import React from 'react';
import {get} from "lodash";
import {withRouter} from "react-router";
import VacancyCandidateQuestionsContainer
    from "../../containers/VacancyCandidateQuestionsContainer/VacancyCandidateQuestionsContainer";

const VacancyCandidateQuestionsPage = ({match}) => {
    return (
        <>
            <VacancyCandidateQuestionsContainer candidate_id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(VacancyCandidateQuestionsPage);
