import { useState, useRef, useEffect } from 'react';
import ScannerService from '../services/scannerService';
import { SCANNER_STATUS } from '../constants';

const Scanner = ({ onScanSuccess, onError }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scannerStatus, setScannerStatus] = useState(SCANNER_STATUS.READY);
  const [scannerStatusClass, setScannerStatusClass] = useState('scanner-ready');
  
  const videoRef = useRef(null);
  const scannerServiceRef = useRef(new ScannerService());

  useEffect(() => {
    return () => {
      scannerServiceRef.current.destroy();
    };
  }, []);

  const handleStartScanner = async () => {
    const result = await scannerServiceRef.current.startScanner(
      videoRef.current,
      (result) => {
        if (scannerServiceRef.current.getIsScanning()) {
          onScanSuccess(result.data);
        }
      }
    );

    if (result.success) {
      setIsScanning(true);
      setScannerStatus(SCANNER_STATUS.SCANNING);
      setScannerStatusClass('scanner-ready');
    } else {
      setScannerStatus(SCANNER_STATUS.ERROR);
      setScannerStatusClass('scanner-error');
      onError(result.error);
    }
  };

  const handleStopScanner = () => {
    scannerServiceRef.current.stopScanner();
    setIsScanning(false);
    setScannerStatus(SCANNER_STATUS.READY);
    setScannerStatusClass('scanner-ready');
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScanSuccess(manualCode.trim());
      setManualCode('');
      setShowManualForm(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleManualSubmit();
    }
  };

  return (
    <div className="section">
      <h2>📱 Escáner QR</h2>
      
      <div className={`scanner-status ${scannerStatusClass}`}>
        {scannerStatus}
      </div>
      
      <video 
        ref={videoRef}
        style={{ 
          display: isScanning ? 'block' : 'none',
          width: '100%',
          maxWidth: '400px',
          height: '300px',
          borderRadius: '10px',
          border: '3px solid #ff6b35',
          marginBottom: '20px'
        }}
      />
      
      <div className="scanner-controls" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {!isScanning ? (
          <button onClick={handleStartScanner} className="btn btn-primary">
            Iniciar Escáner
          </button>
        ) : (
          <button onClick={handleStopScanner} className="btn btn-secondary">
            Detener
          </button>
        )}
        
        <button 
          onClick={() => setShowManualForm(true)} 
          className="btn btn-secondary"
        >
          Entrada Manual
        </button>
      </div>
      
      {showManualForm && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ingrese código de boleta"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '2px solid #ddd'
            }}
            autoFocus
          />
          <button onClick={handleManualSubmit} className="btn btn-primary">
            Registrar
          </button>
          <button 
            onClick={() => {
              setShowManualForm(false);
              setManualCode('');
            }}
            className="btn btn-secondary"
            style={{ marginLeft: '10px' }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

const scannerStyles = `
  .scanner-status {
    text-align: center;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 8px;
    font-weight: bold;
  }

  .scanner-ready {
    background-color: #d4edda;
    color: #155724;
  }

  .scanner-error {
    background-color: #f8d7da;
    color: #721c24;
  }
`;

// Inyectar estilos específicos del scanner
if (!document.querySelector('#scanner-styles')) {
  const style = document.createElement('style');
  style.id = 'scanner-styles';
  style.textContent = scannerStyles;
  document.head.appendChild(style);
}

export default Scanner;