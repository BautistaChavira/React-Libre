import Node from './Node';
import Connector from './Connector';
import type { ConnectionType, NodeType } from '../types/diagram';

type Props = {
  nodes: NodeType[];
  connections: ConnectionType[];
  updateNode: (id: string, updates: Partial<NodeType>) => void;
  selectedNodes: string[];
  onSelectNode: (id: string) => void;
  lastSelected: string | undefined;
};

export default function Canvas({
  nodes,
  connections,
  updateNode,
  selectedNodes,
  onSelectNode,
  lastSelected,
}: Props) {
  return (
    <div className="canvas">
      {nodes.map(node => (
        <Node
          key={node.id}
          node={node}
          updateNode={updateNode}
          isSelected={selectedNodes.includes(node.id)}
          isLastSelected={node.id === lastSelected}
          onSelect={() => onSelectNode(node.id)}
        />
      ))}
      {connections.map((conn, i) => (
        <Connector key={i} from={conn.from} to={conn.to} nodes={nodes} />
      ))}
    </div>
  );
}
