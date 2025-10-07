import { useRef } from 'react';
import type { NodeType } from '../types/diagram';
import './Node.css';

type Props = {
  node: NodeType;
  updateNode: (id: string, updates: Partial<NodeType>) => void;
  isSelected: boolean;
  isLastSelected: boolean;
  onSelect: () => void;
};



export default function Node({ node, updateNode, isSelected, isLastSelected, onSelect }: Props) {

  const dragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current = true;

    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragging.current) return;

      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      updateNode(node.id, {
        x: node.x + deltaX,
        y: node.y + deltaY,
      });
    };

    const handleMouseUp = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
  className={`node ${
  isLastSelected ? 'last-selected' :
  isSelected ? 'selected' : ''
}`}

  
  style={{ left: node.x, top: node.y }}
  onMouseDown={handleMouseDown}
  onClick={onSelect}
>
      
    
      <input
        value={node.label}
        onChange={e => updateNode(node.id, { label: e.target.value })}
      />
    </div>
  );


}