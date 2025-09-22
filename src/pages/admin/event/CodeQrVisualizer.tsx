import { Download, Printer } from "lucide-react";
import { useRef } from "react";
import QRCode from 'react-qr-code';

const CodeQrVisualizer: React.FC = () => {
    const qrRef = useRef<HTMLDivElement>(null);

    // Télécharger le QR code
    const downloadQRCode = () => {
        if (qrRef.current) {
            const svg = qrRef.current.querySelector('svg');
            if (svg) {
                const svgData = new XMLSerializer().serializeToString(svg);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();

                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx?.drawImage(img, 0, 0);

                    const pngFile = canvas.toDataURL('image/png');
                    const downloadLink = document.createElement('a');
                    downloadLink.download = `qr-code-event-1.png`;
                    downloadLink.href = pngFile;
                    downloadLink.click();
                };

                img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
            }
        }
    };

    // Imprimer le QR code
    const printQRCode = () => {
        const printContent = `
      <div style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #0fa985; margin-bottom: 10px;">${"Event 1"}</h1>
        <p style="margin-bottom: 20px; color: #666;">${new Date().getDate()} - ${"new Localtion"}</p>
        <img src="${document.querySelector('svg')?.outerHTML ? 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(document.querySelector('svg')!)) : ''}" 
             style="max-width: 300px; height: auto; margin: 20px auto; display: block;" />
        <p style="margin-top: 20px; color: #333;">Scannez ce QR code pour plus d'informations</p>
      </div>
    `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - Event 1</title>
          </head>
          <body>${printContent}</body>
        </html>
      `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    return (
        <div className="p-6 sm:p-8 rounded-lg shadow-sm space-y-6">
            <div className="w-full aspect-square bg-white rounded-lg p-4 flex items-center justify-center">
                <div
                    ref={qrRef}
                    className="p-6 bg-white rounded-lg shadow-md"
                    style={{ backgroundColor: "black" }}
                >
                    <QRCode
                        value={"Event 1"}
                        size={256}
                        bgColor={"#ffffff"}
                        fgColor={'#000000'}
                        level={'Q'}
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            border: `4px solid ${'#000000'}20`,
                            borderRadius: '8px'
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={downloadQRCode}
                    className="h-12 flex items-center justify-center gap-2 px-6 rounded-full bg-event-primary/10 dark:bg-event-primary/20 hover:bg-event-primary/20 dark:hover:bg-event-primary/30 text-event-primary font-bold transition-colors"
                >
                    <Download />
                    <span>Download</span>
                </button>

                <button
                    type="button"
                    onClick={printQRCode}
                    className="h-12 flex items-center justify-center gap-2 px-6 rounded-full bg-event-primary text-white font-bold hover:opacity-90 transition-opacity"
                >
                    <Printer />
                    <span>Print</span>
                </button>
            </div>
        </div>
    );
}

export default CodeQrVisualizer;