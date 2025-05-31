class StorageService {
  constructor() {
    this.STORAGE_KEY = 'tickets_data';
  }

  saveTickets(tickets) {
    try {
      const ticketsString = JSON.stringify(tickets);
      localStorage.setItem(this.STORAGE_KEY, ticketsString);
      console.log('Tickets guardados:', tickets);
      return true;
    } catch (error) {
      console.error('Error al guardar tickets:', error);
      return false;
    }
  }

  getTickets() {
    try {
      const ticketsString = localStorage.getItem(this.STORAGE_KEY);
      const tickets = ticketsString ? JSON.parse(ticketsString) : [];
      console.log('Tickets recuperados:', tickets);
      return tickets;
    } catch (error) {
      console.error('Error al cargar tickets:', error);
      return [];
    }
  }

  clearTickets() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing tickets:', error);
      return false;
    }
  }
}

export default new StorageService();