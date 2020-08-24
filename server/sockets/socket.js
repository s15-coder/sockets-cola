const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {
    currentState(client);
    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextLast();
        callback(next);
        console.log(next);
    })

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                ok: false,
                err: 'Desktop number do not found.'
            });

        }

        let attendTicket = ticketControl.attendTicket(data.desktop);
        callback(attendTicket);
        currentState(client);
    });
});

let currentState = (client) => {
    client.broadcast.emit('currentState', {
        currentTicket: ticketControl.getCurrentTicket(),
        lastFour: ticketControl.getLastFour()
    });
}