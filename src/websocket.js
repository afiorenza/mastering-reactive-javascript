require('rxjs/add/operator/map');

const { fromEvent, merge } = require('rxjs');
const { webSocket } = require('rxjs/webSocket');
const { filter, pluck, map } = require('rxjs/operators');

const ENTER_KEY_CODE = 13;
const WS_URL = 'wss://echo.websocket.org';

const wsInput = document.getElementById('ws_input');
const wsMessagesList = document.getElementById('ws_messages');

const echoWS = webSocket(WS_URL);
const wsObserver = echoWS.map(value => ({
    type: 'in',
    value: JSON.parse(value).message
}));

const wsInputKeyUp = fromEvent(wsInput, 'keyup')
    .pipe(
        filter(e => e.keyCode === ENTER_KEY_CODE),
        pluck('target', 'value'),
        map(value => ({
            type: 'out',
            value
        }))
    );

merge(
    wsObserver,
    wsInputKeyUp
)
    .subscribe(({ type, value }) => {
        if (type === 'out') {
            echoWS.next(JSON.stringify({ message: value }));

            wsInput.value = '';
        }

        const liElement = document.createElement('li');

        liElement.textContent = `${type === 'in' ? '<---' : '--->'} ${value}`

        wsMessagesList.appendChild(liElement);
    });
