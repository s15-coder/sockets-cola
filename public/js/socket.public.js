var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');
var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lbltickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesktops = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]
socket.on('currentState', function (res) {
    updateHtml(res);
    $('document').ready(function(){
        var sound = new Audio('../audio/new-ticket.mp3');
        sound.play();
    })
});

let updateHtml = function (res) {
    if (!res.lastFour) {
        return alert('Theres is not tickets.');
    }
    for (let i = 0; i <= res.lastFour.length - 1; i++) {
        lbltickets[i].text(`Ticket ${res.lastFour[i].numberTicket}`);
        lblDesktops[i].text(`Desktop ${res.lastFour[i].desktopTicket}`);
    }
}