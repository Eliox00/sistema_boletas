import React, { useState, useEffect } from 'react';
import Scanner from './Scanner';
import TicketsTable from './TicketsTable';
import ticketService from '../services/ticketService';

const TicketManager = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Cargar tickets existentes al iniciar
    loadExistingTickets();
  }, []);

  const loadExistingTickets = () => {
    const savedTickets = ticketService.loadTickets();
    console.log('Tickets cargados:', savedTickets);
    setTickets(savedTickets);
  };

  const handleNewTicket = (code) => {
    // Obtener tickets actualizados antes de registrar uno nuevo
    const currentTickets = ticketService.loadTickets();
    
    const result = ticketService.registerTicket(code, currentTickets);
    console.log('Resultado del registro:', result);
    
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