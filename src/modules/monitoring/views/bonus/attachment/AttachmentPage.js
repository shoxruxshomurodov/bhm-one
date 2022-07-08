import React from 'react';
import Tab from '../../../../../components/Tab';
import UnlinkedLoansPage from "./UnlinkedLoansPage"
import LinkedLoansPage from "./LinkedLoansPage"
import Hat from "../../../../../components/Hat/Hat";

function AttachmentPage(props) {
    return (
        <div className={"d-flex flex fixed-content mt-2"}>
            <div className={"d-flex flex"} id={"content-body"}>
                <div className={"d-flex flex-column flex"} id={"user-list"}>
                    <Hat
                        name="Муаммоли кредитларни ҳодимларга бириктириш"
                        desc="Муаммоли кредитларни ҳодимларга бириктириш асосида бонус тизимини ҳисоблаш"
                    />
                        <Tab
                            classNames={"px-3"}
                            titles={['Бириктирилмаган кредитлар', 'Бириктирилган кредитлар']}
                            components={[<UnlinkedLoansPage/>, <LinkedLoansPage/>]}/>
                </div>
            </div>
        </div>
    );
}

export default AttachmentPage;