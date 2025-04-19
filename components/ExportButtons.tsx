import { Button } from "@/components/ui/button";
import React from 'react';

interface ExportButtonsProps {
  svgRef: React.RefObject<SVGSVGElement>;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ svgRef }) => {
  const handleExportSvg = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgRef.current);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, 'maze.svg');
  };

  const handleExportPng = async () => {
    if (!svgRef.current) return;
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(svgRef.current, { cacheBust: true, backgroundColor: 'white' });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      downloadBlob(blob, 'maze.png');
    } catch (err) {
      console.error('PNG export failed', err);
    }
  };

  const handleExportPdf = async () => {
    if (!svgRef.current) return;
    try {
      const { default: jsPDF } = await import('jspdf');
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(svgRef.current, { cacheBust: true, backgroundColor: 'white' });
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [img.width, img.height] });
        pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
        pdf.save('maze.pdf');
      };
    } catch (err) {
      console.error('PDF export failed', err);
    }
  };

  const handlePrint = () => {
    if (!svgRef.current) return;
    const newWin = window.open('', '_blank');
    if (!newWin) return;
    newWin.document.write('<html><head><title>Print Maze</title></head><body>');
    newWin.document.write(svgRef.current.outerHTML);
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button variant="outline" onClick={handleExportSvg}>Export SVG</Button>
      <Button variant="outline" onClick={handleExportPng}>Export PNG</Button>
      <Button variant="outline" onClick={handleExportPdf}>Export PDF</Button>
      <Button variant="default" onClick={handlePrint}>Print</Button>
    </div>
  );
};

export default ExportButtons; 