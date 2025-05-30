import QrScanner from 'qr-scanner';

class ScannerService {
  constructor() {
    this.scanner = null;
    this.isScanning = false;
  }

  async startScanner(videoElement, onScanSuccess) {
    try {
      if (!this.scanner) {
        this.scanner = new QrScanner(videoElement, onScanSuccess, {
          highlightScanRegion: true,
          highlightCodeOutline: true
        });
      }

      await this.scanner.start();
      this.isScanning = true;
      return { success: true };
    } catch (error) {
      console.error('Error al iniciar escáner:', error);
      return { 
        success: false, 
        error: 'Error al acceder a la cámara. Verifique los permisos.' 
      };
    }
  }

  stopScanner() {
    if (this.scanner) {
      this.scanner.stop();
      this.isScanning = false;
    }
  }

  destroy() {
    if (this.scanner) {
      this.scanner.destroy();
      this.scanner = null;
      this.isScanning = false;
    }
  }

  getIsScanning() {
    return this.isScanning;
  }
}

export default ScannerService;