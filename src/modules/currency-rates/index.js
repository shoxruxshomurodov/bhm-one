import { get } from 'lodash';

const info = (
	onSuccess = (certInfo) => {
    console.log(certInfo,"certInfo");
  },
	onClose = () => {
		console.log('close');
	}
) => {
	var ws = new WebSocket('ws://localhost:8181');
	ws.onopen = function() {
		var obj = { function: 'getCertInfo', get: 'get' };
		var msg = JSON.stringify(obj);
		ws.send(msg);
	};

	ws.onmessage = function(evt) {
		var received_msg = evt.data;
		var myObj = JSON.parse(received_msg);
		if (myObj.status == 'success') {
			console.log('ws line 21 ', myObj);
			if (get(myObj, 'certinfo', null)) {
				onSuccess(myObj);
			}
		}
	};

	ws.onclose = function() {
		onClose();
	};
};


const sign = (data, onSuccess = (signedMsg, certInfo) => {}) => {
	info((certInfo) => {
		var ws = new WebSocket('ws://localhost:8181');
		ws.onopen = function() {
			var obj = { function: 'cryptoSign', obj: data };
			var msg = JSON.stringify(obj);
			ws.send(msg);
		};
		console.log('working ... line 40');

		ws.onmessage = function(evt) {
			console.log(evt, 'evt');
			var received_msg = evt.data;
			var myObj = JSON.parse(received_msg);
			if (myObj.status == 'success') {
				if (get(myObj, 'signedMsg', null)) {
					onSuccess(myObj.signedMsg, certInfo);
				}
			}
		};
		// ws.onclose = function() {
		//   onClose();
		// };
	});
};

export { info, sign };
