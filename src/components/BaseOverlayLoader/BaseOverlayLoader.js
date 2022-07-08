import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
const BaseOverlayLoader = ({children,isActive = false,text="Loading your content..."}) => {
    return (
        <LoadingOverlay active={isActive} text={text} spinner>
            {children}
        </LoadingOverlay>
    );
};

export default BaseOverlayLoader;
