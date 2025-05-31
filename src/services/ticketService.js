import { TICKET_STATUS } from '../constants';
import { formatDate, formatTime } from '../utils';
import storageService from './storageService';

class TicketService {
  createTicket(code, existingTickets) {
    const now = new Date();
    const exists = existingTickets.find(ticket => ticket.code === code);
    
    return {
      id: existingTickets.length + 1,
      code: code,
      date: formatDate(now),
      time: formatTime(now),
      timestamp: now.getTime(),
      status: exists ? TICKET_STATUS.DUPLICADO : TICKET_STATUS.INGRESADO
    };
  }

  registerTicket(code, currentTickets) {
    console.log('Tickets actuales:', currentTickets);
    const newTicket = this.createTicket(code, currentTickets);
    const updatedTickets = [newTicket, ...currentTickets];
    
    const success = storageService.saveTickets(updatedTickets);
    console.log('Tickets actualizados:', updatedTickets);
    
    return {
      success,
      ticket: newTicket,
      tickets: updatedTickets,
      isDuplicate: newTicket.status === TICKET_STATUS.DUPLICADO
    };
  }

  loadTickets() {
    return storageService.getTickets();
  }

  clearAllTickets() {
    return storageService.clearTickets();
  }
}

export default new TicketService();