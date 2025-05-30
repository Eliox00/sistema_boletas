import { getCurrentHourTickets, getTodayTickets, getDuplicateTickets, exportToCSV } from '../utils';

const Stats = ({ tickets, onClearData, onShowAlert }) => {
  const totalTickets = tickets.length;
  const todayTickets = getTodayTickets(tickets);
  const duplicateTickets = getDuplicateTickets(tickets);
  const currentHourTickets = getCurrentHourTickets(tickets);

  const handleExport = () => {
    try {
      exportToCSV(tickets);
      onShowAlert('Datos exportados exitosamente', 'success');
    } catch (error) {
      onShowAlert(error.message, 'warning');
    }
  };

  const handleClearData = () => {
    if (window.confirm('¿Está seguro de que desea eliminar todos los registros? Esta acción no se puede deshacer.')) {
      onClearData();
    }
  };

  return (
    <div className="section">
      <h2>📊 Estadísticas</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalTickets}</div>
          <div className="stat-label">Total Registrados</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{todayTickets}</div>
          <div className="stat-label">Hoy</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{duplicateTickets}</div>
          <div className="stat-label">Duplicados</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{currentHourTickets}</div>
          <div className="stat-label">Esta Hora</div>
        </div>
      </div>
      
      <div className="export-section">
        <button onClick={handleExport} className="btn btn-primary">
          📄 Exportar Datos
        </button>
        <button 
          onClick={handleClearData} 
          className="btn btn-danger"
          style={{ marginLeft: '10px' }}
        >
          🗑️ Limpiar Datos
        </button>
      </div>
    </div>
  );
};

const statsStyles = `
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }

  .stat-card {
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 30, 0.1));
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    border: 2px solid rgba(255, 107, 53, 0.3);
  }

  .stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: #d32f2f;
    margin-bottom: 5px;
  }

  .stat-label {
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .export-section {
    text-align: center;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

// Inyectar estilos específicos de stats
if (!document.querySelector('#stats-styles')) {
  const style = document.createElement('style');
  style.id = 'stats-styles';
  style.textContent = statsStyles;
  document.head.appendChild(style);
}

export default Stats;