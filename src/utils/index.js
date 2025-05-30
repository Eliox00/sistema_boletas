export const formatDate = (date) => {
  return date.toLocaleDateString('es-CO');
};

export const formatTime = (date) => {
  return date.toLocaleTimeString('es-CO');
};

export const exportToCSV = (tickets, filename) => {
  if (tickets.length === 0) {
    throw new Error('No hay datos para exportar');
  }

  const csvContent = [
    'ID,Código,Fecha,Hora,Estado',
    ...tickets.map(ticket => 
      `${ticket.id},"${ticket.code}","${ticket.date}","${ticket.time}","${ticket.status}"`
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || `corralejas_boletas_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};

export const getCurrentHourTickets = (tickets) => {
  const now = new Date();
  const today = formatDate(now);
  const currentHour = now.getHours();
  
  return tickets.filter(ticket => {
    const ticketDate = new Date(ticket.timestamp);
    return formatDate(ticketDate) === today && ticketDate.getHours() === currentHour;
  }).length;
};

export const getTodayTickets = (tickets) => {
  const today = formatDate(new Date());
  return tickets.filter(ticket => ticket.date === today).length;
};

export const getDuplicateTickets = (tickets) => {
  return tickets.filter(ticket => ticket.status === 'Duplicado').length;
};