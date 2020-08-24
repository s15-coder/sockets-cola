var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('There is not desktop params.');
}
var desktop = searchParams.get('escritorio');
$('h1').text(`Escritorio ${desktop}`);
var small = $('small');
$('button').on('click', function () {
    console.log('algo');
    socket.emit('attendTicket', { desktop: desktop }, function (res) {
        if (res.numberTicket) {
            small.text(`${res.numberTicket}`);
        } else {
            small.text(res);
            alert(res);
        }
    });
});