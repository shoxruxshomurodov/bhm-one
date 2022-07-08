import React, {useState} from 'react';
import {get, isEqual, isNil} from "lodash";
import {withRouter} from "react-router";
import {Drawer} from 'antd';
import {withTranslation} from "react-i18next";
import {notification} from "antd";

function RefuseCheckpoint(props) {
    let {visible, onClose, refuse, t} = props;
    const [comment, setComment] = useState(null);
    const request = () => {
        if (isNil(comment)) {
            notification['error']({
                message: "Iltimos izoh yozing",
                description: 'izoh yozish majburing',
                placement: 'topRight',
            });
        } else {
            refuse(comment);
            onClose();
        }
    }
    return (
        <>
            <Drawer
                title={t("Refused window")}
                placement={"right"}
                closable={false}
                onClose={onClose}
                visible={visible}
                key={"right"}
                style={{zIndex: 99999}}
                width={"50%"}
            >
                <div className="d-flex flex-column flex">
                    <div className="mx-3">
                        <div className="form-group row"><label className="col-sm-2 col-form-label">Comment</label>
                            <div className="col-sm-10"><textarea onChange={e => setComment(get(e, "target.value"))}
                                                                 className="form-control" rows={7}/>
                            </div>
                        </div>
                    </div>
                </div>
                {visible &&
                <div className={"drawer-footer"}>
                    <button className={"btn btn-white mr-1"} onClick={onClose}>Орқага</button>
                    <button className={"btn btn-primary ml-2"} onClick={request}>Тасдиқлаш</button>
                </div>}
            </Drawer>
        </>
    );
}
export default withTranslation("bhm_one")((withRouter(RefuseCheckpoint)));
