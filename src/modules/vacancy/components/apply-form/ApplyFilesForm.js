import React, {useEffect, useState} from 'react';
import BaseFileUploadInput from "../../../../components/BaseFileUploadInput";
import {get, isNil,isEmpty} from "lodash";


const ApplyFilesForm = ({candidate_id,applyCandidateFiles,history, ...props}) => {
    const uploadFiles = ({keyName:type, file}) => {
        const formData = new FormData();
        formData.append("candidate_id", candidate_id);
        formData.append("files", get(file,'file'));
        formData.append("type", type);
        attachFiles({formData});
    }
    const attachFiles = ({formData}) => {
            applyCandidateFiles({formData});
    }
    return (
        <>
            <div className={"row"}>
                <div className="col-sm-4 mb-3">
                    <BaseFileUploadInput uploadFile={uploadFiles} label={"Ходимнинг маълумотномаси (объективка)"} keyName={0}/>
                </div>
                <div className="col-sm-4 mb-3">
                    <BaseFileUploadInput uploadFile={uploadFiles} label={"Диплом нусхаси"} keyName={1}/>
                </div>
                <div className="col-sm-4 mb-3">
                    <BaseFileUploadInput uploadFile={uploadFiles} label={"Баҳолаш варақаси (HR ники)"} keyName={2}/>
                </div>
                <div className="col-sm-4 mb-3">
                    <BaseFileUploadInput uploadFile={uploadFiles} label={"Баҳолаш варақаси (тегишли бўлимники)"} keyName={3}/>
                </div>
                <div className="col-sm-4 mb-3">
                    <BaseFileUploadInput uploadFile={uploadFiles} label={"Баҳолаш варақаси (тегишли бўлимники)"} keyName={4}/>
                </div>
            </div>
            <div className="row mt-4 ">
                <div className="col-sm-10"></div>
                <div className="col-sm-2">
                    <button
                        type="submit"
                        className="btn btn-success btn-block btn-md"
                        style={{marginLeft: '5px', fontSize: "1.1rem"}}
                        onClick={() => history.push('/vacancy/candidate/'+candidate_id)}
                    >
                        Далее
                    </button>
                </div>
            </div>
        </>
    );
}

export default ApplyFilesForm;
