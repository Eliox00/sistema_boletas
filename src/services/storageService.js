class StorageService {
  constructor() {
    this.STORAGE_KEY = 'tickets_data';
  }

  clearStorage() {
    try {
      localStorage.clear();
      console.log('Storage cleared');
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  saveTickets(tickets) {
    try {
      const ticketsString = JSON.stringify(tickets);
      localStorage.setItem(this.STORAGE_KEY, ticketsString);
      console.log('Guardando tickets en localStorage:', tickets.length, 'tickets');
      return true;
    } catch (error) {
      console.error('Error al guardar tickets:', error);
      return false;
    }
  }

  getTickets() {
    try {
      const ticketsString = localStorage.getItem(this.STORAGE_KEY);
      if (!ticketsString) return [];
      
      const tickets = JSON.parse(ticketsString);
      console.log('Recuperando tickets de localStorage:', tickets.length, 'tickets');
      return tickets;
    } catch (error) {
      console.error('Error al obtener tickets:', error);
      return [];
    }
  }
}

export default new StorageService();