const fs = require('fs')
const path = require('path')
class Ticket {
    constructor(numberTicket, desktopTicket) {
        this.numberTicket = numberTicket;
        this.desktopTicket = desktopTicket;
    }
}
class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.fourLast = [];
        let data = require('../data/data.json');
        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.fourLast = data.fourLast;
        } else {
            this.restoreCounting();
        }
    }
    getLastFour(){
        return this.fourLast;
    }
    getCurrentTicket() {
        return `Ticket ${this.last}`;
    }
    attendTicket(desktopNumber) {
        if (this.tickets.length === 0) { return 'There are not tickets,' };
        let ticketNumber = this.tickets[0].numberTicket;
        this.tickets.shift();
        let attendTicket = new Ticket(ticketNumber, desktopNumber);
        this.fourLast.unshift(attendTicket);
        if (this.fourLast.length > 4) {
            this.fourLast.splice(-1, 1);
        }
        console.log('Ultimos 4:');
        console.log(this.fourLast);
        this.recordFile();
        return attendTicket;
    }
    nextLast() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.recordFile();

        return `Ticket ${this.last}`;
    }
    restoreCounting() {
        this.fourLast = [];
        this.last = 0;
        this.recordFile();
        console.log('Counting Restored!!');
    }

    recordFile() {

        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            fourLast: this.fourLast
        }
        let jsonString = JSON.stringify(jsonData);
        let pathFile = path.resolve(__dirname, '../data/data.json');
        fs.writeFileSync(pathFile, jsonString);
    }
}

module.exports = {
    TicketControl
}