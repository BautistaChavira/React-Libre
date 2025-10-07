import type { NodeType } from '../types/diagram';
import './Connector.css';

type Props = {
  from: string;
  to: string;
  nodes: NodeType[];
};

export default function Connector({ from, to, nodes }: Props) {
  const nodeA = nodes.find(n => n.id === from);
  const nodeB = nodes.find(n => n.id === to);

  if (!nodeA || !nodeB) return null;

  const nodeWidth = 120;
  const nodeHeight = 60;

  const x1 = nodeA.x + nodeWidth / 2;
  const y1 = nodeA.y + nodeHeight / 2;
  const x2 = nodeB.x + nodeWidth / 2;
  const y2 = nodeB.y + nodeHeight / 2;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);

  const angle = Math.atan2(dy, dx);

  //Esto calcula el offset para que la flecha se aleje del nodo por los costados horizontales
  //y se acerque cuando el nodo esta arriba o abajo
  const baseOffset = 70;
  const dynamicOffset = baseOffset * (0.5 + 0.5 * Math.abs(Math.cos(angle)));
  const x2Adjusted = x2 - (dx / length) * dynamicOffset;
  const y2Adjusted = y2 - (dy / length) * dynamicOffset;

  return (
    <svg className="connector">
      <defs>
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#333" />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2Adjusted}
        y2={y2Adjusted}
        stroke="#333"
        strokeWidth={2}
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
}