import React from 'react';

function TemplateTab(props) {
    const {titles, bodies} = props;
    return (
        <div className="card">
            <div className="b-b">
                <div className="nav-active-border b-primary bottom">
                    <ul className="nav" id="myTab" role="tablist">
                        {titles && titles.map(title => {
                            return (
                                <li className="nav-item"><a className="nav-link active" id={`${title}-tab`}
                                                            data-toggle="tab"
                                                            href={`#${title}`} role="tab" aria-controls={title}
                                                            aria-selected="true">{title}</a></li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="tab-content p-3">
                {bodies && bodies.map((body, index) => {
                    return (
                        <div className="tab-pane fade active show" id={titles[index]} role="tabpanel"
                             aria-labelledby={`${titles[index]}-tab`}>
                            {body}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default TemplateTab;