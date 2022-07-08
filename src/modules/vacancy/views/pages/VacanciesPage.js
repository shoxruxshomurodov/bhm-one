import React from 'react';
import VacanciesContainer from "../../containers/VacanciesContainer/VacanciesContainer";

const VacanciesPage = ({userCan}) => {
    return (
        <>
            <VacanciesContainer userCan={userCan} />
        </>
    );
};

export default VacanciesPage;
