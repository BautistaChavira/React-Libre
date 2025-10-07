import { useState } from 'react';
import type{ NodeType, ConnectionType } from '../types/diagram';

export function useDiagramState() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [connections, setConnections] = useState<ConnectionType[]>([]);

  const addNode = () => {
    const id = crypto.randomUUID();
    setNodes(prev => [...prev, { id, x: 100, y: 100, label: 'Nuevo nodo' }]);
  };

  const updateNode = (id: string, updates: Partial<NodeType>) => {
    setNodes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  const connectNodes = (from: string, to: string) => {
    setConnections(prev => [...prev, { from, to }]);
  };

  const disconnectNodes = (a: string, b: string) => {
    setConnections(prev =>
      prev.filter(conn =>
        !(
          (conn.from === a && conn.to === b) ||
          (conn.from === b && conn.to === a)
        )
      )
    );
  };

  return { nodes, connections, addNode, updateNode, connectNodes, disconnectNodes };
}