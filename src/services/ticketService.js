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
    // Asegurarse de que currentTickets sea un array
    const tickets = Array.isArray(currentTickets) ? currentTickets : [];
    console.log('Registrando ticket, tickets actuales:', tickets);

    const newTicket = this.createTicket(code, tickets);
    const updatedTickets = [newTicket, ...tickets];
    
    const success = storageService.saveTickets(updatedTickets);
    
    return {
      success,
      ticket: newTicket,
      tickets: updatedTickets,
      isDuplicate: newTicket.status === TICKET_STATUS.DUPLICADO
    };
  }

  loadTickets() {
    const tickets = storageService.getTickets();
    console.log('Cargando tickets:', tickets);
    return tickets || [];
  }

  clearAllTickets() {
    return storageService.clearTickets();
  }
}

export default new TicketService();