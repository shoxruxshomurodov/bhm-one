import React, {useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReactBaseToaster = ({
                              text = "Loading",
                              isFetched = false,
                              show = {error:false,success:false}

                          }) => {
    useEffect(() => {
        if (isFetched) {
            if(show.error){
                toast.error("Error");
            }
            if(show.success){
                toast.success("Success");
            }
        }
    }, [isFetched])
    return (
        <div>
            <ToastContainer/>
        </div>
    );
};

export default ReactBaseToaster;
