import {get, isEqual} from 'lodash';
import {toast} from "react-toastify";

const info = (
    onSuccess = (certInfo) => {
        console.log(certInfo, "certInfo");
    },
    onClose = () => {
        console.log('close');
    }
) => {
    var ws = new WebSocket('ws://localhost:8181');
    ws.onopen = function () {
        var obj = {function: 'getCertInfo', get: 'get'};
        var msg = JSON.stringify(obj);
        ws.send(msg);
    };
    ws.onmessage = function(evt) {
        if (
            isEqual(
                evt.data,
                "Object reference not set to an instance of an object."
            ) ||
            isEqual(evt.data, "Ссылка на объект не указывает на экземпляр объекта.")
        ) {
           return;
        } else {
            var received_msg = evt.data;
            var myObj = JSON.parse(received_msg);
            if (myObj.status == "success") {
                if (get(myObj, "certinfo", null)) {
                    onSuccess(myObj);
                    toast.dismiss();
                    toast.success(
                        "Kalit tasdiqlandi hujjat shakilanayapti iltimos kuting!!!",
                        {
                            position: "top-right",
                            autoClose: 20000
                        }
                    );
                }else{
                    toast.dismiss();
                    toast.error(
                        "Kalit tasdiqlanmadi iltimos kalitingizni qaytadan tekshirib ko`ring!!!",
                        {
                            position: "top-right",
                            autoClose: 20000
                        }
                    );
                }
            }
        }
        ws.close();
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
        console.log('working ... line 40');

        ws.onmessage = function (evt) {
            console.log(evt, 'evt');
            var received_msg = evt.data || {};
            var myObj = JSON.parse(received_msg);
            if (myObj.status == 'success') {
                if (get(myObj, 'signedMsg', null)) {
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
