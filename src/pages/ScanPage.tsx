import React, { useState, useRef, useEffect } from 'react';

// Interface pour les résultats de scan
interface ScanResult {
  data: string;
  timestamp: Date;
}

const QRScannerPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  // Démarrer la caméra
  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsScanning(true);
        startQRScanning();
      }
    } catch (err) {
      setError('Impossible d\'accéder à la caméra. Vérifiez les permissions.');
      console.error('Erreur caméra:', err);
    }
  };

  // Arrêter la caméra
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsScanning(false);
  };

  // Algorithme simple de détection de code QR (simulation)
  const simulateQRDetection = (context: CanvasRenderingContext2D, width: number, height: number): string | null => {
    // Dans une vraie implémentation, vous implémenteriez un algorithme de détection QR ici
    // Pour cette démo, nous simulons la détection après un délai aléatoire
    
    // Dessiner un aperçu de ce que "voit" la caméra (pour la démo)
    context.fillStyle = '#1a1a1a';
    context.fillRect(0, 0, width, height);
    
    // Dessiner un faux code QR pour la démonstration
    context.fillStyle = '#0fa985';
    context.fillRect(width/2 - 50, height/2 - 50, 100, 100);
    
    context.fillStyle = '#000';
    context.fillRect(width/2 - 40, height/2 - 40, 80, 80);
    
    context.fillStyle = '#0fa985';
    context.fillRect(width/2 - 30, height/2 - 30, 20, 20);
    context.fillRect(width/2 + 10, height/2 - 30, 20, 20);
    context.fillRect(width/2 - 30, height/2 + 10, 20, 20);
    
    // Simuler une détection aléatoire
    if (Math.random() < 0.01) { // 1% de chance à chaque frame
      return `EVENT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }
    
    return null;
  };

  // Démarrer le processus de scan
  const startQRScanning = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    const scanFrame = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Dessiner l'image de la vidéo sur le canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Simuler la détection de QR code
        const qrData = simulateQRDetection(context, canvas.width, canvas.height);
        
        if (qrData) {
          setScanResult({
            data: qrData,
            timestamp: new Date()
          });
          stopCamera();
        } else {
          animationRef.current = requestAnimationFrame(scanFrame);
        }
      } else {
        animationRef.current = requestAnimationFrame(scanFrame);
      }
    };
    
    animationRef.current = requestAnimationFrame(scanFrame);
  };

  // Changer de caméra (avant/arrière)
  const toggleCamera = () => {
    stopCamera();
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    setTimeout(startCamera, 100);
  };

  // Réinitialiser le scanner
  const resetScanner = () => {
    setScanResult(null);
    startCamera();
  };

  // Démarrer le scan au montage du composant
  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  return (
    <div className="bg-[#111816] min-h-screen" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="relative flex flex-col min-h-screen">
        <div className="flex flex-col grow">
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283935] px-4 md:px-10 py-3">
            <div className="flex items-center gap-4 text-white">
              <div className="size-6 text-[#0fa985]">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                </svg>
              </div>
              <h1 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Eventify</h1>
            </div>
            
            <div className="flex flex-1 justify-end gap-4 items-center">
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
                <a className="hover:text-white transition-colors" href="#">
                  Événements
                </a>
                <a className="hover:text-white transition-colors" href="#">
                  Mes billets
                </a>
                <a className="text-white font-bold" href="#">
                  Scanner
                </a>
              </nav>
              
              <button className="flex items-center justify-center rounded-full size-10 bg-transparent text-gray-300 hover:text-white hover:bg-[#283935] transition-colors md:hidden">
                <span className="material-symbols-outlined">menu</span>
              </button>
              
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5vq48zenVriBVnqhsyYGFEXBiurzlmsKkTHQ3Z3B9F6S5BB6wWySXRcv4LVexahdG_ROWZlhpo_956q-FhofO2MnM6M2Q68TIxvVpLq0wCrC8z6o6csGminO23TFmA0h5fLOvsQ15we0fwj0ZPDYF6lJ5aTF27Xa5E32920065SLz98-V5WTcumwhFd_yrU12gfy4Kz_kNv_ns6G7_vNKbwcYDaPxu9iOJTaEAC54xr2GfcFhFPfdTWNxGuXip0MdI62i4uoBkDA")' }}
              ></div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-1 flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                  Scanner le code QR
                </h2>
                <p className="text-gray-400 mt-2 text-lg">
                  Placez le code QR dans le cadre pour le scanner.
                </p>
              </div>
              
              {/* Zone de scan */}
              <div className="aspect-square w-full bg-gray-900 rounded-2xl overflow-hidden relative shadow-2xl">
                {/* Élément vidéo pour la caméra */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
                
                {/* Canvas pour le traitement d'image (caché) */}
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
                
                {/* Cadre de scan animé */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border-4 border-dashed border-[#0fa985] rounded-xl animate-pulse"></div>
                </div>
                
                {/* Overlay de statut */}
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <div className="text-center p-4 bg-red-500/90 text-white rounded-lg max-w-xs">
                      <span className="material-symbols-outlined text-4xl mb-2">
                        error
                      </span>
                      <p className="font-medium">{error}</p>
                      <button
                        onClick={startCamera}
                        className="mt-3 px-4 py-2 bg-white text-red-600 rounded-md text-sm font-medium"
                      >
                        Réessayer
                      </button>
                    </div>
                  </div>
                )}
                
                {scanResult && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <div className="text-center p-6 bg-white/90 rounded-lg max-w-xs">
                      <span className="material-symbols-outlined text-4xl text-green-600 mb-2">
                        check_circle
                      </span>
                      <h3 className="font-bold text-gray-800">Scan réussi!</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Code: {scanResult.data}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {scanResult.timestamp.toLocaleTimeString()}
                      </p>
                      <button
                        onClick={resetScanner}
                        className="mt-4 px-4 py-2 bg-[#0fa985] text-white rounded-md text-sm font-medium"
                      >
                        Scanner à nouveau
                      </button>
                    </div>
                  </div>
                )}
                
                {!isScanning && !error && !scanResult && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0fa985] mx-auto"></div>
                      <p className="text-white mt-4">Initialisation de la caméra...</p>
                    </div>
                  </div>
                )}
                
                {/* Contrôles de la caméra */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <button 
                    onClick={toggleCamera}
                    className="flex size-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/75 transition-colors"
                    title="Changer de caméra"
                  >
                    <span className="material-symbols-outlined">flip_camera_ios</span>
                  </button>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="mt-6 text-center text-gray-400 text-sm">
                <p>Assurez-vous que le code QR est bien visible dans le cadre.</p>
                <p className="mt-1">La lumière ambiante doit être suffisante pour une lecture optimale.</p>
                
                {scanResult && (
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                    <p className="text-white text-sm">Données scannées:</p>
                    <p className="text-gray-300 text-xs break-all">{scanResult.data}</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default QRScannerPage;