import { useDiagramState } from './hooks/useDiagramState';
import Canvas from './components/Canvas';
import './App.css';
import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function App() {
  const {
    nodes,
    connections,
    addNode,
    updateNode,
    connectNodes,
    disconnectNodes,
  } = useDiagramState();

  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const lastSelected = selectedNodes[selectedNodes.length - 1];

  const handleSelectNode = (id: string) => {
    setSelectedNodes(prev => {
      const filtered = prev.includes(id) ? prev : [...prev, id];
      return filtered.slice(-2);
    });
  };

  useEffect(() => {
    addNode();
  }, []);

  const handleExportPDF = async () => {
    const canvasElement = document.querySelector('.canvas') as HTMLElement;
    if (!canvasElement) return;

    const canvasImage = await html2canvas(canvasElement, {
      backgroundColor: '#ffffff',
      scale: 2,
    });

    const imgData = canvasImage.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvasElement.offsetWidth, canvasElement.offsetHeight],
    });

    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      canvasElement.offsetWidth,
      canvasElement.offsetHeight
    );

    pdf.save('diagrama.pdf');
  };

  return (
    <>
      <div className="toolbar">
        <button onClick={addNode}>Agregar nodo</button>
        <button
          onClick={() => {
            if (selectedNodes.length === 2) {
              connectNodes(selectedNodes[0], selectedNodes[1]);
              setSelectedNodes([]);
            }
          }}
          disabled={selectedNodes.length < 2}
        >
          Conectar nodos seleccionados
        </button>
        <button
          onClick={() => {
            if (selectedNodes.length === 2) {
              disconnectNodes(selectedNodes[0], selectedNodes[1]);
              setSelectedNodes([]);
            }
          }}
          disabled={selectedNodes.length < 2}
        >
          Desconectar nodos seleccionados
        </button>
        <button onClick={handleExportPDF}>Exportar como PDF</button>
      </div>

      <div className="canvas">
        <Canvas
          nodes={nodes}
          connections={connections}
          updateNode={updateNode}
          selectedNodes={selectedNodes}
          onSelectNode={handleSelectNode}
          lastSelected={lastSelected}
        />
      </div>
    </>
  );
}