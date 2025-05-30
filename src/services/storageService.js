import { STORAGE_KEY } from '../constants';

class StorageService {
  getTickets() {
    try {
      const tickets = localStorage.getItem(STORAGE_KEY);
      return tickets ? JSON.parse(tickets) : [];
    } catch (error) {
      console.error('Error al cargar tickets:', error);
      return [];
    }
  }

  saveTickets(tickets) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
      return true;
    } catch (error) {
      console.error('Error al guardar tickets:', error);
      return false;
    }
  }

  clearTickets() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error al limpiar tickets:', error);
      return false;
    }
  }
}

export default new StorageService();