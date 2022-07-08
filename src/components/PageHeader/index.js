import React from 'react';

function PageHeader({name,desc}) {
  return (
    <div className="page-hero page-container" id="page-hero">
      <div className="padding d-flex">
        <div className="page-title"><h2 className="text-md text-highlight">{name}</h2><small className="text-muted">{desc}</small></div>
        <div className="flex"/>
      </div>
    </div>
  );
}

export default PageHeader;
