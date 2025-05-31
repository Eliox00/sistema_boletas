import { TICKET_STATUS } from '../constants';
import { formatDate, formatTime } from '../utils';
import storageService from './storageService';

class TicketService {
  createTicket(code, existingTickets) {
    const now = new Date();
    const exists = existingTickets.find(ticket => ticket.code === code);
    
    return {
      id: Date.now(), // Cambiamos el ID para que sea único
      code: code,
      date: formatDate(now),
      time: formatTime(now),
      timestamp: now.getTime(),
      status: exists ? TICKET_STATUS.DUPLICADO : TICKET_STATUS.INGRESADO
    };
  }

  registerTicket(code, currentTickets) {
    // Obtener los tickets actuales del almacenamiento
    const existingTickets = this.loadTickets();
    console.log('Tickets existentes:', existingTickets);

    const newTicket = this.createTicket(code, existingTickets);
    // Agregar el nuevo ticket al inicio del array
    const updatedTickets = [newTicket, ...existingTickets];
    
    const success = storageService.saveTickets(updatedTickets);
    console.log('Tickets después de guardar:', updatedTickets);
    
    return {
      success,
      ticket: newTicket,
      tickets: updatedTickets,
      isDuplicate: newTicket.status === TICKET_STATUS.DUPLICADO
    };
  }

  loadTickets() {
    const tickets = storageService.getTickets();
    return Array.isArray(tickets) ? tickets : [];
  }

  clearAllTickets() {
    return storageService.clearTickets();
  }
}

export default new TicketService();