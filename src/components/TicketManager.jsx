import React, { useState, useEffect } from 'react';
import Scanner from './Scanner';
import TicketsTable from './TicketsTable';
import ticketService from '../services/ticketService';

const TicketManager = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Cargar tickets al iniciar
    const savedTickets = ticketService.loadTickets();
    setTickets(savedTickets);
  }, []);

  const handleNewTicket = (code) => {
    const result = ticketService.registerTicket(code, tickets);
    if (result.success) {
      setTickets(result.tickets);
    }
  };

  return (
    <div>
      <Scanner onScan={handleNewTicket} />
      <TicketsTable tickets={tickets} />
    </div>
  );
};

export default TicketManager;