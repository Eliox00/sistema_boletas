class StorageService {
  constructor() {
    this.STORAGE_KEY = 'tickets_data';
  }

  saveTickets(tickets) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tickets));
      return true;
    } catch (error) {
      console.error('Error saving tickets:', error);
      return false;
    }
  }

  getTickets() {
    try {
      const tickets = localStorage.getItem(this.STORAGE_KEY);
      return tickets ? JSON.parse(tickets) : [];
    } catch (error) {
      console.error('Error loading tickets:', error);
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