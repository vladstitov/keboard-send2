setInterval(() => {
console.log('tick')
}, 10000);


console.log('extension loaded');

///window.addEventListener('keydown', function(evt) {
 //   console.log(evt);
///})


setTimeout( ()=> {
 
const ws = new WebSocket('wss://192.168.0.25:8081');

ws.addEventListener('open', function(evt){
console.log('open', evt) ; 
})
ws.addEventListener('close', function(evt){
console.log('closed', evt)
//@ts-ignore
process.exit(1);
})

ws.addEventListener('error', event => {
console.log('error', event)
})
ws.addEventListener('message', (event: MessageEvent) => { 
console.log('message', event.data);
})

function sendSocketMessage(message: string) {
console.log(message);
ws.send(message);
};

}, 5000)

