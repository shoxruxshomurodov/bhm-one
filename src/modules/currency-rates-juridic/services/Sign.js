import {get, isEqual, isObject} from 'lodash';
import {toast} from "react-toastify";

const info = (
    onSuccess = (certInfo) => {
        console.log(certInfo, "certInfo");
    },
    onClose = () => {
        console.log('close');
    },
    signIn
) => {
    var ws = new WebSocket('ws://localhost:8181');
    ws.onopen = function () {
        var obj = {function: 'getCertInfo', get: 'get'};
        var msg = JSON.stringify(obj);
        ws.send(msg);
    };
    ws.onmessage = (evt) => {
        const myObj = get(evt,"data").length > 110 && JSON.parse(get(evt,"data"));
        if(isObject(myObj)) {
            if (myObj.status === "success") {
                if (!signIn) {
                    onClose()
                }
                if (get(myObj, "certinfo", null)) {
                    onSuccess(myObj);
                    ws.close();
                }
            }
        }
    };
    ws.onclose = function () {
        onClose();
    };
};

const sign = (data, onSuccess = (signedMsg, certInfo) => {
}) => {
    info((certInfo) => {
        var ws = new WebSocket('ws://localhost:8181');
        ws.onopen = function () {
            var obj = {function: 'cryptoSign', obj: data};
            var msg = JSON.stringify(obj);
            ws.send(msg);
        };
        ws.onmessage = function(evt) {
            var received_msg = evt.data;
            var myObj = JSON.parse(received_msg);
            console.log(myObj,"myObj")
            if (myObj.status == "success") {
                if (get(myObj, "signedMsg", null)) {
                    onSuccess({hash: myObj.signedMsg, certInfo});
                }
            }
        };
        // ws.onclose = function() {
        //   onClose();
        // };
    });
};

export {info, sign};
