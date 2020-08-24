var socket = io();
let newTickectLabel = $('#lblNuevoTicket');
socket.on('disconnect', function () {
    console.log('Cliente disconnected!!');
});
socket.on('connect', function () {
    console.log('Cliente connected!!');
});

socket.on('currentState',(res)=>{
    newTickectLabel.text(res.currentTicket);
});

$('button').on('click', () => {
    socket.emit('nextTicket', null, function (nextTicket) {
        newTickectLabel.text(nextTicket)
        console.log(nextTicket);
    });
});
