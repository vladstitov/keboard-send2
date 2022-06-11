console.log('extension loaded');
setTimeout(() => {
    let tick = 0;
    setInterval(() => {
        tick++;
        console.log('tick ' + tick);
        sendSocketMessage(tick + '');
        ///ws.send(tick + '');
    }, 100000);
    const ws = new WebSocket('wss://192.168.0.25:8081');
    ws.addEventListener('open', function (evt) {
        console.log('open', evt);
    });
    ws.addEventListener('close', function (evt) {
        console.log('closed', evt);
    });
    ws.addEventListener('error', event => {
        console.log('error', event);
    });
    ws.addEventListener('message', (event) => {
        console.log('message', event.data);
    });
    function sendSocketMessage(message) {
        if (ws.readyState === ws.OPEN)
            ws.send(message);
    }
    ;
    if (window) {
        window.addEventListener('keydown', function (evt) {
            let letter = evt.key.toLowerCase();
            keyDown(letter);
        });
        window.addEventListener('keyup', function (evt) {
            let letter = evt.key.toLowerCase();
            keyUp(letter);
        });
    }
    let controlDown;
    function keyDown(letter) {
        switch (letter) {
            case 'shift':
                sendSocketMessage('S');
                break;
            case 'alt':
            case 'right alt':
                sendSocketMessage('A');
                break;
            case 'control':
            case 'right ctrl':
                controlDown = true;
                sendSocketMessage('T');
                break;
        }
    }
    function keyUp(letter) {
        if (controlDown && letter === 'c') {
            console.log(' not sending ');
            return;
        }
        switch (letter) {
            case 'shift':
                sendSocketMessage('I');
                break;
            case 'control':
            case 'right ctrl':
                controlDown = false;
                sendSocketMessage('L');
                setTimeout(() => {
                    sendSocketMessage('V');
                }, 300);
                break;
            case 'alt':
            case 'right alt':
                sendSocketMessage('Z');
                setTimeout(() => {
                    sendSocketMessage('V');
                }, 300);
                break;
            case 'return':
            case 'enter':
                sendSocketMessage('E');
                break;
            case 'backspace':
                sendSocketMessage('B');
                break;
            case 'f12':
                sendSocketMessage('P');
                break;
            case 'f11':
                sendSocketMessage('O');
                break;
            case 'escape':
                sendSocketMessage('Q');
                break;
            case 'delete':
                sendSocketMessage('D');
                break;
            case 'caps lock':
            case 'capslock':
                sendSocketMessage('V');
                break;
            case 'left arrow':
            case 'arrowleft':
                sendSocketMessage('N');
                break;
            case 'right arrow':
            case 'arrowright':
                sendSocketMessage('M');
                break;
            default:
                if (letter.length === 1)
                    sendSocketMessage(letter);
                else
                    console.log('UNKNOWN ' + letter);
        }
    }
}, 5000);
