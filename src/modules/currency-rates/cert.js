// Create WebSocket connection.
const ws = new WebSocket('ws://localhost:8181');

// Connection opened
ws.addEventListener('open', function (event) {
    var obj = { function: 'getCertInfo', get: 'get' };
    var msg = JSON.stringify(obj);
    ws.send(msg);
});

// Listen for messages
ws.addEventListener('message', function (event) {
    var received_msg = event.data;
    var myObj = JSON.parse(received_msg);
    if (myObj.status == 'success') {
        console.log('ws line 21 ', myObj);

    }
});




const ws2 = new WebSocket('ws://localhost:8181');

// Connection opened
ws2.addEventListener('open', function (event) {
    var obj = { function: 'cryptoSign', obj: "ioo" };
    var msg = JSON.stringify(obj);
    ws2.send(msg);
});

// Listen for messages
ws2.addEventListener('message', function (event) {
    console.log(event, 'evt');
    var received_msg = event.data;
    var myObj2 = JSON.parse(received_msg);
    if (myObj2.status == 'success') {
        console.log('ws line 22 ', myObj2);
    }
});

