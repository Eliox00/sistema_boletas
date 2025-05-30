import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Scanner from './components/Scanner';
import Stats from './components/Stats';
import TicketsTable from './components/TicketsTable';
import Alert from './components/Alert';
import ticketService from './services/ticketService';
import { ALERT_TYPES } from './constants';
import './styles/App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Cargar tickets al iniciar la aplicación
  useEffect(() => {
    const loadedTickets = ticketService.loadTickets();
    setTickets(loadedTickets);
  }, []);

  // Actualizar estadísticas cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      // Forzar re-render para actualizar estadísticas de hora actual
      setTickets(prev => [...prev]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const showAlert = useCallback((message, type = ALERT_TYPES.SUCCESS) => {
    const alertId = Date.now();
    const newAlert = { id: alertId, message, type };
    
    setAlerts(prev => [...prev, newAlert]);
  }, []);

  const removeAlert = useCallback((alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  }, []);

  const handleScanSuccess = useCallback((code) => {
    const result = ticketService.registerTicket(code, tickets);
    
    if (result.success) {
      setTickets(result.tickets);
      
      if (result.isDuplicate) {
        showAlert(`⚠️ Boleta ${code} ya fue registrada anteriormente`, ALERT_TYPES.WARNING);
      } else {
        showAlert(`✅ Boleta ${code} registrada exitosamente`, ALERT_TYPES.SUCCESS);
      }
    } else {
      showAlert('Error al registrar la boleta', ALERT_TYPES.ERROR);
    }
  }, [tickets, showAlert]);

  const handleScanError = useCallback((error) => {
    showAlert(error, ALERT_TYPES.ERROR);
  }, [showAlert]);

  const handleClearData = useCallback(() => {
    const success = ticketService.clearAllTickets();
    
    if (success) {
      setTickets([]);
      showAlert('Todos los datos han sido eliminados', ALERT_TYPES.SUCCESS);
    } else {
      showAlert('Error al eliminar los datos', ALERT_TYPES.ERROR);
    }
  }, [showAlert]);

  return (
    <div className="container">
      <Header />
      
      {/* Contenedor de alertas */}
      <div id="alertContainer">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <Scanner 
          onScanSuccess={handleScanSuccess}
          onError={handleScanError}
        />
        
        <Stats 
          tickets={tickets}
          onClearData={handleClearData}
          onShowAlert={showAlert}
        />
      </div>

      {/* Tabla de tickets */}
      <TicketsTable tickets={tickets} />
    </div>
  );
}

export default App;