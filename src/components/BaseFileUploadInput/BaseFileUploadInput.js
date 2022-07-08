import React, {useEffect} from 'react';
import {useFileUpload} from "use-file-upload";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {isNil} from "lodash";
const BaseFileUploadInput = ({
                                 keyName,label = "Select file", uploadFile = () => {
        console.log('File uploading...')
    }
                             }) => {
    const [file, selectFile] = useFileUpload();
    useEffect(() => {
        if(!isNil(file)){
            uploadFile({keyName,file});
        }
    }, [file]);
    return (
        <div className={"row"}>
            <div className="col-6">
                <label className="m-1 d-block" style={{fontSize: '1.1rem'}}>{label}</label>
                <AiOutlineCloudUpload
                    onClick={() => selectFile()}
                    fontSize={30}
                    style={{
                        cursor: "pointer"
                    }}
                />
                {file ? (
                    <div>
                        <img src={file.source} alt='preview' width={150}/>
                        <div className="d-flex mt-1">
                            <span className={"mr-1"}> Name: {file.name} </span>
                            <span> Size: {file.size} </span>
                        </div>
                    </div>
                ) : (
                    <span className={"ml-1"}>Файл танланмаган</span>
                )}
            </div>
        </div>
    );
};

export default BaseFileUploadInput;
