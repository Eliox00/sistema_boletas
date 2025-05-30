const TicketsTable = ({ tickets }) => {
  return (
    <div className="section">
      <h2>🎫 Registro de Boletas</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Código de Boleta</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket.id}>
                <td>{index + 1}</td>
                <td><strong>{ticket.code}</strong></td>
                <td>{ticket.date}</td>
                <td>{ticket.time}</td>
                <td className={ticket.status === 'Duplicado' ? 'status-duplicate' : 'status-active'}>
                  {ticket.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            No hay boletas registradas
          </div>
        )}
      </div>
    </div>
  );
};

const tableStyles = `
  .table-container {
    overflow-x: auto;
    max-height: 400px;
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: linear-gradient(45deg, #ff6b35, #f7931e);
    color: white;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  tr:hover {
    background-color: rgba(255, 107, 53, 0.1);
  }

  .status-active {
    color: #4caf50;
    font-weight: bold;
  }

  .status-duplicate {
    color: #ff9800;
    font-weight: bold;
  }
`;

// Inyectar estilos específicos de la tabla
if (!document.querySelector('#table-styles')) {
  const style = document.createElement('style');
  style.id = 'table-styles';
  style.textContent = tableStyles;
  document.head.appendChild(style);
}

export default TicketsTable;